import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import Loader from "../../layout/Loader";
import { DataGrid } from "@material-ui/data-grid";
import styles from "../../../styles/styles";
import axios from "axios";
import { server } from "../../../server";
import { toast } from "react-toastify";

const CouponCodes = () => {
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [selectedProducts, setSelectedProducts] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
   
    const fetchCoupons = async (_id) => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${server}/coupon/get-all-coupons/${seller._id}`,
          {
            withCredentials: true,
          }
        );
        setIsLoading(false);
        setCoupons(response.data.coupons); 

      } catch (error) {
        setIsLoading(false);
        toast.error("Failed to fetch coupons");
      }
    };

    fetchCoupons();
  }, [seller, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          `${server}/coupon/create-coupon-code`,
          {
            name,
            minAmount,
            maxAmount,
            selectedProducts,
            value,
            shop:seller,
          },
          { withCredentials: true }
        )
        .then(() => {
          toast.success("Coupon created successfully!");
          setOpen(false);
          window.location.reload();
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "value", headerName: "Value", width: 120 },
    { field: "minAmount", headerName: "Min Amount", width: 150 },
    { field: "maxAmount", headerName: "Max Amount", width: 150 },
    { field: "products", headerName: "Products", width: 200 },
  ];

  const rows = coupons.map((coupon, index) => ({
    id: index + 1,
    name: coupon.name,
    value: coupon.value,
    minAmount: coupon.minAmount,
    maxAmount: coupon.maxAmount,
    products: coupon.selectedProducts,
  }));
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full  800px:w-[70%] h-[85vh] justify-center flex mt-1 overflow-x-scroll flex-col">
          <div className="w-full  justify-end flex ">
            <div
              className={`${styles.button} w-[180px] mr-2`}
              onClick={() => setOpen(true)}
            >
              <span className="text-white ">Create Coupon Code</span>
            </div>
          </div>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />

          {open && (
            <div className="fixed w-full bg-[#0000006b] top-0 left-0 h-screen z-30 flex items-center justify-center">
              <div className="w-[90%] 800px:w-[50%] bg-white h-[80vh] rounded-md  px-3 overflow-y-scroll">
                <div className="w-full flex justify-end">
                  <RxCross1
                    size={25}
                    className="m-3 cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <h5 className="text-[22px] font-medium text-[#020202a6] m-3">
                  Create Coupon
                </h5>
                {/* create coupon" */}
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
                    <label
                      htmlFor="value "
                      className="text-[18px] font-[500]  "
                    >
                      Discount Percentage
                      <span className="text-[red] text-[25px]">*</span>
                    </label>
                    <input
                      type="text"
                      name="value"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className="block border  border-gray-300 w-full rounded-md p-3 placeholder-gray-400 h-[35px] appearance-none mt-2 focus:outline-none focus:border-blue-600 shadow-sm"
                      placeholder="Enter discount value..."
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="minAmount "
                      className="text-[18px] font-[500]  "
                    >
                      Min Amount
                      <span className="text-[red] text-[25px]">*</span>
                    </label>
                    <input
                      type="text"
                      name="minAmount"
                      value={minAmount}
                      onChange={(e) => setMinAmount(e.target.value)}
                      className="block border  border-gray-300 w-full rounded-md p-3 placeholder-gray-400 h-[35px] appearance-none mt-2 focus:outline-none focus:border-blue-600 shadow-sm"
                      placeholder="Enter minimum amount..."
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="maxAmount "
                      className="text-[18px] font-[500]  "
                    >
                      max Amount
                      <span className="text-[red] text-[25px]">*</span>
                    </label>
                    <input
                      type="text"
                      name="maxAmount"
                      value={maxAmount}
                      onChange={(e) => setMaxAmount(e.target.value)}
                      className="block border  border-gray-300 w-full rounded-md p-3 placeholder-gray-400 h-[35px] appearance-none mt-2 focus:outline-none focus:border-blue-600 shadow-sm"
                      placeholder="Enter maxmum amoumt..."
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="selectedProducts "
                      className="text-[18px] font-[500]  "
                    >
                      Selected Products
                      <span className="text-[red] text-[25px]">*</span>
                    </label>

                    <select
                      name="selectedProducts"
                      className="w-full border h-[35px]  rounded-md "
                      id=""
                      value={selectedProducts}
                      onChange={(e) => setSelectedProducts(e.target.value)}
                    >
                      <option value="Choose category">Select Products</option>
                      {products &&
                        products.map((i) => (
                          <option value={i.title} key={i.title}>
                            {i.title}
                          </option>
                        ))}
                    </select>
                  </div>

                  <button className=" border  border-gray-300 w-[90%] flex items-center justify-center rounded-md p-3 placeholder-gray-400 h-[35px] appearance-none m-4 hover:outline-none hover:bg-blue-200 shadow-sm">
                    Create
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CouponCodes;
