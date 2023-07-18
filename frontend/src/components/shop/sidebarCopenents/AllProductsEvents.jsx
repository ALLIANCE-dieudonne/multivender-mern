import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEvents,
  getAllShopEvents,
} from "../../../redux/actions/event";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Loader from "../../layout/Loader";
import { DataGrid } from "@material-ui/data-grid";

const AllProductsEvents = () => {
  const { events, isLoading } = useSelector((state) => state.events);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteEvents(id));
    window.location.reload();
  };

  useEffect(() => {
    if (seller) {
      dispatch(getAllShopEvents(seller._id));
    }
  }, [dispatch, seller]);

  const columns = [
    { field: "id", headerName: "Events Id", minWidth: 150, flex: 0.5 },
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
        const eventId = params.row.id;

        return (
          <>
            <Link to={`/product/${eventId}?isEvent=true`}>
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
     events && events.length !== 0
       ? events.map((event) => ({
           id: event._id,
           name: event.name,
           price: "US$" + event.discountPrice,
           stock: event.stock,
           sold: 10,
         }))
       : [];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full  800px:w-[70%] h-[85vh] justify-center flex mt-1 overflow-x-scroll ">
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

export default AllProductsEvents;
