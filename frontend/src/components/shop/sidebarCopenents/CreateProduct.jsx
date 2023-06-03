import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";

const ProductCreate = () => {
  const { seller } = useSelector((state) => state.seller);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [orginalPrice, setOrginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleImageChange = (e) => {
    e.preventDefault();

    const files = Array.from(e.target.files);
    setImages((previousImages) => [...previousImages, ...files]);
  };

  return (
    <div className="w-[70%] h-[85vh]  justify-center flex mt-1">
      <div className="bg-white w-[70%] h-[80vh]  shadow-sm rounded-md px-3 overflow-y-scroll">
        <h5 className="text-[26px] font-medium text-[#020202a6] text-center mb-6">
          Create Product
        </h5>

        {/* product create form  */}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name " className="text-[18px] font-[500]  ">
              Name<span className="text-[red] text-[25px]">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block border  border-gray-300 w-full rounded-md p-3 placeholder-gray-400 h-[35px] appearance-none mt-2 focus:outline-none focus:border-blue-600 shadow-sm"
              placeholder="Enter product name..."
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description " className="text-[18px] font-[500] ">
              Description<span className="text-[red] text-[25px]">*</span>
            </label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block border   border-gray-300 w-full rounded-md p-3 placeholder-gray-400 h-[35px] appearance-none mt-2 focus:outline-none focus:border-blue-600 shadow-sm"
              placeholder="Enter product description..."
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category " className="text-[18px] font-[500]  ">
              Category<span className="text-[red] text-[25px]">*</span>
            </label>

            <select
              name="category"
              className="w-full border h-[35px]  rounded-md "
              id=""
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Choose category">Choose Category</option>
              {categoriesData &&
                categoriesData.map((i) => (
                  <option value={i.title} key={i.title}>
                    {i.title}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="orginalPrice " className="text-[18px] font-[500] ">
              Orginal Price
            </label>
            <input
              type="text"
              name="orginalPrice"
              value={orginalPrice}
              onChange={(e) => setOrginalPrice(e.target.value)}
              className="block border  border-gray-300 w-full rounded-md p-3 placeholder-gray-400 h-[35px] appearance-none mt-2 focus:outline-none focus:border-blue-600 shadow-sm"
              placeholder="Enter orginal price..."
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tags " className="text-[18px] font-[500] ">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="block border  border-gray-300 w-full rounded-md p-3 placeholder-gray-400 h-[35px] appearance-none mt-2 focus:outline-none focus:border-blue-600 shadow-sm"
              placeholder="Enter product tags..."
            />
          </div>
          <div className="mb-4">
            <label htmlFor="discountprice " className="text-[18px] font-[500] ">
              Discount Price<span className="text-[red] text-[25px]">*</span>
            </label>
            <input
              type="text"
              name="discountPrice"
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              className="block border  border-gray-300 w-full rounded-md p-3 placeholder-gray-400 h-[35px] appearance-none mt-2 focus:outline-none focus:border-blue-600 shadow-sm"
              placeholder="Enter discount price..."
            />
          </div>
          <div className="mb-4">
            <label htmlFor="stock " className="text-[18px] font-[500] ">
              Product Stock<span className="text-[red] text-[25px]">*</span>
            </label>
            <input
              type="text"
              name="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="block border  border-gray-300 w-full rounded-md p-3 placeholder-gray-400 h-[35px] appearance-none mt-2 focus:outline-none focus:border-blue-600 shadow-sm"
              placeholder="Enter discount price..."
            />
          </div>
          <div>
            <label htmlFor="upload " className="text-[18px] font-[500] ">
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

            <div className="flex items-center w-full gap-2 flex-wrap ">
              <label htmlFor="upload">
                <AiOutlinePlusCircle size={25} />
              </label>
              {images &&
                images.map((i) => (
                  <img
                    src={URL.createObjectURL(i)}
                    key={i}
                    className="w-[120px] h-[150px] object-contain"
                  />
                ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ProductCreate;
