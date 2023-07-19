import { useDispatch, useSelector } from "react-redux";
import DashboardCard from "../DashboardCard.jsx";
import { useEffect } from "react";
import { getAllShopProducts } from "../../../redux/actions/product.js";
import { getAllShopOrders } from "../../../redux/actions/order.js";
import {
  AiOutlineAccountBook,
  AiOutlineBorderBottom,
  AiOutlineArrowRight,
} from "react-icons/ai";
import Loader from "../../layout/Loader";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";

const DashboardHome = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    if (seller) {
      dispatch(getAllShopProducts(seller._id));
      dispatch(getAllShopOrders(seller._id));
    }
  }, [dispatch, seller]);

  const allProducts = products && products.length;
  const allOrders = orders && orders.length;
  const data = orders && orders.filter((order) => order.status === 'Delivered');
  const amount =
    data && data.reduce((acc, order) => acc + order.totalPrice, 0);

  const serviceCharge = amount * 0.1;
  const totalAmount = (amount - serviceCharge).toFixed(2);

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
        itemsQty: item.cart.length,
        total: "US$" + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="w-full">
      <h1 className="text-[25px] font-[500] mt-2 mx-3 ">Overview</h1>
      <div className="w-full 800px:flex justify-center items-center">
        <DashboardCard
          title="Account Balance(with 10% of service)"
          count={totalAmount + "$"}
          subtitile={<Link to="/dashboard/withdraw-money">Withdraw money</Link>}
          icon={<AiOutlineAccountBook />}
        />
        <DashboardCard
          title="All Orders"
          count={allOrders}
          subtitile={<Link to="/dashboard/orders">View all orders</Link>}
          icon={<AiOutlineBorderBottom />}
        />
        <DashboardCard
          title="All Products"
          count={allProducts}
          subtitile={<Link to="/dashboard/products">View all products</Link>}
          icon={<AiOutlineAccountBook />}
        />
      </div>
      <h2 className="text-[25px] font-[500] mt-2 mx-3 ">Latest Orders</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full  justify-center flex mt-1 overflow-y-scroll flex-col">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
