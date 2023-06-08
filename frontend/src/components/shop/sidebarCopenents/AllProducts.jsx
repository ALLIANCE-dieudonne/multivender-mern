import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllShopProducts,
} from "../../../redux/actions/product";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Loader from "../../layout/Loader";
import { DataGrid } from "@material-ui/data-grid";

const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.product);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();


  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    window.location.reload();
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
         
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />

         
        </div>
      )}
    </>
  );
};

export default AllProducts;
