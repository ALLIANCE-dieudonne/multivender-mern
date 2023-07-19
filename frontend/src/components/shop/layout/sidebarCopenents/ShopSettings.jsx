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

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    await axios
      .put(`${server}/shop/update-shop-avatar`, formData, {
        headers: { "Content-Type": "multipart/form-data" },

        withCredentials: true,
      })
      .then(() => {
        // window.location.reload();
        dispatch(loadSeller(seller._id));
      })
      .catch((error) => {
        toast.error(error);
      });
  };

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
    <div className="mt-7 w-[80%]">
      <div className="flex justify-center w-full">
        <div className="relative">
          <img
            crossOrigin="anonymous"
            src={`${backend_url}${seller?.avatar}`}
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

      <div className="w-full px-5 ">
        <form onSubmit={handleSubmit} aria-required>
          <div className="w-full 800px:flex pb-3">
            <div className=" 800px:w-[50%] ">
              <label htmlFor="names" className="font-medium">
                Shop Name
              </label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mt-2 mb-3`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label htmlFor="phone" className="font-medium">
                Phone Number
              </label>
              <input
                type="number"
                className={`${styles.input} !w-[95%] mt-2 mb-3`}
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <label htmlFor="address" className="font-medium">
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
            className="w-40 rounded-md h-10 border border-blue-500 cursor-pointer flex text-center justify-center font-medium text-[#3a24db] text-4 hover:bg-blue-100 hover:text-black"
            value="Update"
          />
        </form>
      </div>
    </div>
  );
};

export default ShopSettings;
