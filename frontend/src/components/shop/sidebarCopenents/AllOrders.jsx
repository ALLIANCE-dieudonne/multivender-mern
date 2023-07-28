import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AiOutlineArrowRight, AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Loader from "../../layout/Loader";
import { DataGrid } from "@material-ui/data-grid";
import { deleteOrder, getAllShopOrders } from "../../../redux/actions/order";
import axios from "axios";
import { server } from "../../../server";
import { toast } from "react-toastify";

const AllOrders = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    if (seller) {
      dispatch(getAllShopOrders(seller._id));
    }
  }, [dispatch, seller]);

  const handleDelete = async (id) => {
    dispatch(deleteOrder(id)).then(() => {
      toast.success(`Order ${id} deleted`);
      window.location.reload();
    });
  };
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items ",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "delete",
      headerName: "Delete",
      minWidth: 150,
      flex: 0.5,
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

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart[0].qty,
        total: "US$" + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full   h-[85vh] justify-center flex mt-1 overflow-x-scroll flex-col">
          <DataGrid
            rows={row}
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

export default AllOrders;
