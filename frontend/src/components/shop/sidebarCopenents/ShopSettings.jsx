import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../../server";
import { toast } from "react-toastify";
import { backend_url } from "../../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../../styles/styles";
import { loadSeller } from "../../../redux/actions/seller";
const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [name, setName] = useState(seller ? seller.name : "");
  const [address, setAddress] = useState(seller ? seller.address : "");
  const [phoneNumber, setPhoneNumber] = useState(
    seller ? seller.phoneNumber : ""
  );
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  const compressImage = (imageBase64, maxWidth, maxHeight, quality) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imageBase64;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Calculate the new dimensions to maintain the aspect ratio
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Convert the compressed image back to base64 with the specified quality
        const compressedBase64 = canvas.toDataURL("image/jpeg", quality / 100);
        resolve(compressedBase64);
      };
    });
  };

  const convertTo64 = async (file) => {
    try {
      const fileReader = new FileReader();
      const base64 = await new Promise((resolve, reject) => {
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.onerror = (error) => reject(error);
        fileReader.readAsDataURL(file);
      });

      // Compress the image to approximately 1 MB with 80% quality
      const compressedBase64 = await compressImage(base64, 800, 800, 80);

      return compressedBase64;
    } catch (error) {
      throw new Error("Failed to convert the image to base64.");
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertTo64(file);
    setAvatar(base64);
  };

  useEffect(() => {
    if (avatar !== null) {
      const formData = new FormData();
      formData.append("image", avatar);

      const updateAvatar = async () => {
        try {
          await axios.put(`${server}/shop/update-shop-avatar`, formData, {
            headers: { "Content-Type": "multipart/form-data" },

            withCredentials: true,
          });
        } catch (error) {
          toast.error("Failed to update avatar!");
        }
      };

      updateAvatar();
    }
  }, [avatar]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/shop/update-shop-info`,
        {
          shopId: seller._id,
          address,
          name,
          phoneNumber,
        },
        { withCredentials: true }
      )
      .then(() => {
        // window.location.reload();
        toast.success("Shop updated successfully!");
        // setAddress("");
        // setPhoneNumber("");
        dispatch(loadSeller(seller._id));

        // setName("");
      })
      .catch((err) => {
        toast.error("Error updating shop");
      });
  };
  return (
    <div className="mt-7 w-[90%]">
      <div className="flex justify-center w-full">
        <div className="relative">
          <img
            crossOrigin="anonymous"
            src={avatar || seller?.avatar[0]}
            alt="profile"
            className="800px:mt-0 mt-5 w-[80px] h-[80px] 800px:w-[100px] 800px:h-[100px] rounded-full object-contain border border-[green]"
          />

          <div className="bg-[#e3e9ee] rounded-full w-[25px] h-[25px] absolute bottom-1 right-1 flex items-center justify-center cursor-pointer">
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="hidden"
            />
            <label htmlFor="image" className="cursor-pointer">
              <AiOutlineCamera />
            </label>
          </div>
        </div>
      </div>

      <br />

      <div className="w-full px-5">
        <form onSubmit={handleSubmit} className="flex items-center flex-col">
          <div className="w-full 800px:flex pb-3 flex justify-center ">
            <div className=" 800px:w-[50%] ">
              <label htmlFor="names" className="font-medium ml-2">
                Shop Name
              </label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mt-2 mb-3`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label htmlFor="phone" className="font-medium ml-2">
                Phone Number
              </label>
              <input
                type="number"
                className={`${styles.input} !w-[95%] mt-2 mb-3`}
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <label htmlFor="address" className="font-medium ml-2">
                Address
              </label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mt-2 mb-3`}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          <input
            type="submit"
            className="w-40 rounded-md h-10 border border-blue-500  cursor-pointer  font-medium text-[#3a24db] text-4 hover:bg-blue-100 hover:text-black"
            value="Update"
          />
        </form>
      </div>
    </div>
  );
};

export default ShopSettings;
