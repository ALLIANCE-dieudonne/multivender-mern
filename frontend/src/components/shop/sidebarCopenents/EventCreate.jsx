import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import { createEvent } from "../../../redux/actions/event";

const EventCreate = () => {
  const { seller } = useSelector((state) => state.seller);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [orginalPrice, setOrginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (e) => {
    const startDate = new Date(e.target.value);
    const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    setStartDate(startDate);
    setEndDate(null);
    document.getElementById("end-date").min = minEndDate
      .toISOString()
      .slice(0, 10);
  };

  const handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
  };

  const today = new Date().toISOString().slice(0, 10);
  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : today;

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });


    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("tags", tags);
    formData.append("orginalPrice", orginalPrice);
    formData.append("discountPrice", discountPrice);
    formData.append("stock", stock);
    formData.append("shopId", seller._id);
    formData.append("startDate", startDate.toISOString());
    formData.append("endDate", endDate.toISOString());

    dispatch(createEvent(formData))
      .then(() => {
        toast.success("event created successfully");
        navigate("/dashboard");
      })
      .catch((err) => {
        toast.error("create event fail");
      });
  };

  const handleImageChange = async (e) => {
    e.preventDefault();

    const files = Array.from(e.target.files);

    convertTo64Array(files)
      .then((base64Array) => {
        setImages((previousImages) => [...previousImages, ...base64Array]);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const compressImage = (imageBase64, maxWidth, maxHeight, quality) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imageBase64;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

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

        const compressedBase64 = canvas.toDataURL("image/png", quality / 100);
        resolve(compressedBase64);
      };
    });
  };

  const convertTo64Array = async (files) => {
    const filePromises = files.map((file) => {
      return new Promise(async (resolve, reject) => {
        try {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);

          fileReader.onload = async () => {
            const base64 = fileReader.result;
            const compressedBase64 = await compressImage(base64, 800, 800, 80);
            resolve(compressedBase64);
          };

          fileReader.onerror = (error) => reject(error);
        } catch (error) {
          reject(new Error("Failed to convert the image to base64."));
        }
      });
    });

    return Promise.all(filePromises);
  };

  console.log(images);

  return (
    <div className="w-full  justify-center flex mt-1">
      <div className="bg-white w-[90%] 800px:w-[70%] h-[80vh] shadow-sm rounded-md px-3 overflow-y-scroll">
        <h5 className="text-[26px] font-medium text-[#020202a6] text-center mb-6">
          Create Event
        </h5>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="text-[18px] font-[500]">
              Name
              <span className="text-[red] text-[25px]">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block border border-gray-300 w-full rounded-md p-3 placeholder-gray-400 h-[35px] appearance-none mt-2 focus:outline-none focus:border-blue-600 shadow-sm"
              placeholder="Enter event product name..."
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="text-[18px] font-[500]">
              Description
              <span className="text-[red] text-[25px]">*</span>
            </label>
            <textarea
              cols={30}
              rows={6}
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block border border-gray-300 w-full rounded-md p-3 placeholder-gray-400 appearance-none mt-2 focus:outline-none focus:border-blue-600 shadow-sm"
              placeholder="Enter event product description..."
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="text-[18px] font-[500]">
              Category
              <span className="text-[red] text-[25px]">*</span>
            </label>

            <select
              name="category"
              className="w-full border h-[35px] rounded-md"
              id=""
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Choose category">Choose Category</option>
              {categoriesData.map((category) => (
                <option value={category.title} key={category.title}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="orginalPrice" className="text-[18px] font-[500]">
              Original Price
            </label>
            <input
              type="text"
              name="orginalPrice"
              value={orginalPrice}
              onChange={(e) => setOrginalPrice(e.target.value)}
              className="block border border-gray-300 w-full rounded-md p-3 placeholder-gray-400 h-[35px] appearance-none mt-2 focus:outline-none focus:border-blue-600 shadow-sm"
              placeholder="Enter event original price..."
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tags" className="text-[18px] font-[500]">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="block border border-gray-300 w-full rounded-md p-3 placeholder-gray-400 h-[35px] appearance-none mt-2 focus:outline-none focus:border-blue-600 shadow-sm"
              placeholder="Enter event product tags..."
            />
          </div>
          <div className="mb-4">
            <label htmlFor="discountPrice" className="text-[18px] font-[500]">
              Discount Price
              <span className="text-[red] text-[25px]">*</span>
            </label>
            <input
              type="text"
              name="discountPrice"
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              className="block border border-gray-300 w-full rounded-md p-3 placeholder-gray-400 h-[35px] appearance-none mt-2 focus:outline-none focus:border-blue-600 shadow-sm"
              placeholder="Enter event discount price..."
            />
          </div>
          <div className="mb-4">
            <label htmlFor="stock" className="text-[18px] font-[500]">
              Product Stock
              <span className="text-[red] text-[25px]">*</span>
            </label>
            <input
              type="text"
              name="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="block border border-gray-300 w-full rounded-md p-3 placeholder-gray-400 h-[35px] appearance-none mt-2 focus:outline-none focus:border-blue-600 shadow-sm"
              placeholder="Enter event product stock..."
            />
          </div>
          <div className="mb-4">
            <label htmlFor="startDate" className="text-[18px] font-[500]">
              Event Start Date
              <span className="text-[red] text-[25px]">*</span>
            </label>
            <input
              type="date"
              name="startDate"
              id="start-date"
              value={startDate ? startDate.toISOString().slice(0, 10) : ""}
              onChange={handleStartDateChange}
              min={today}
              className="block border border-gray-300 w-full rounded-md p-3 placeholder-gray-400 h-[35px] appearance-none mt-2 focus:outline-none focus:border-blue-600 shadow-sm"
              placeholder="Enter event start date..."
            />
          </div>
          <div className="mb-4">
            <label htmlFor="endDate" className="text-[18px] font-[500]">
              Event End Date
              <span className="text-[red] text-[25px]">*</span>
            </label>
            <input
              type="date"
              name="endDate"
              id="end-date"
              value={endDate ? endDate.toISOString().slice(0, 10) : ""}
              onChange={handleEndDateChange}
              min={minEndDate}
              className="block border border-gray-300 w-full rounded-md p-3 placeholder-gray-400 h-[35px] appearance-none mt-2 focus:outline-none focus:border-blue-600 shadow-sm"
              placeholder="Enter event end date..."
            />
          </div>
          <div>
            <label htmlFor="upload" className="text-[18px] font-[500]">
              Upload Images
            </label>
            <input
              type="file"
              name="upload"
              id="upload"
              className="hidden"
              multiple
              onChange={handleImageChange}
            />

            <div className="flex items-center w-full gap-2 flex-wrap">
              <label htmlFor="upload">
                <AiOutlinePlusCircle size={25} />
              </label>
              {images.map((image, index) => (
                <img
                  src={image}
                  key={index}
                  alt="uploaded"
                  className="w-[120px] h-[150px] object-contain"
                />
              ))}
            </div>
          </div>

          <button className="border border-gray-300 w-[90%] flex items-center justify-center rounded-md p-3 placeholder-gray-400 h-[35px] appearance-none m-4 hover:outline-none hover:bg-blue-200 shadow-sm">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventCreate;
