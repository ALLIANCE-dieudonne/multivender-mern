import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import {
  deleteProduct,
  getAllShopProducts,
} from "../../../redux/actions/product";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Loader from "../../layout/Loader";
import { DataGrid } from "@material-ui/data-grid";
import styles from "../../../styles/styles";
import axios from "axios";
import { server } from "../../../server";
import { toast } from "react-toastify";

const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.product);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState(null);
  const [value, setValue] = useState(null);
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    window.location.reload();
  };

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
            shop:seller
          },
          { withCredentials: true }
        )
        .then(async (res) => {
          console.log(res.data);
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (seller) {
      dispatch(getAllShopProducts(seller._id));
    }
  }, [dispatch, seller]);

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 150, flex: 0.8 },
    { field: "price", headerName: "Price", minWidth: 150, flex: 0.3 },
    { field: "stock", headerName: "Stock", minWidth: 120, flex: 0.3 },
    { field: "sold", headerName: "Sold Out", minWidth: 140, flex: 0.3 },

    {
      field: "preview",
      headerName: "",
      minWidth: 100,
      flex: 0.4,
      sortable: false,
      renderCell: (params) => {
        const productName = params.row.name.replace(/\s+/g, "_");

        return (
          <>
            <Link to={`/product/${productName}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "delete",
      headerName: "",
      minWidth: 100,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const rows =
    products.length !== 0
      ? products.map((product) => ({
          id: product._id,
          name: product.name,
          price: "US$" + product.discountPrice,
          stock: product.stock,
          sold: 10,
        }))
      : [];

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

export default AllProducts;
