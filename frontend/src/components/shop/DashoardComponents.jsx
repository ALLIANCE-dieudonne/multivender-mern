import ProductCreate from "./sidebarCopenents/CreateProduct";
import AllProducts from "./sidebarCopenents/AllProducts";
import EventCreate from "./sidebarCopenents/EventCreate";
import AllProductsEvents from "./sidebarCopenents/AllProductsEvents.jsx";
import CouponCodes from "./sidebarCopenents/CouponCodes.jsx";
import AllOrders from "./sidebarCopenents/AllOrders.jsx";
const Products = () => {
  return <AllProducts />;
};
const DashboardOrders = () => {
  return <AllOrders />;
};
const CreateProduct = () => {
  return <ProductCreate />;
};
const CreateEvent = () => {
  return <EventCreate />;
};
const DashboardEvents = () => {
  return <AllProductsEvents />;
};
const WithdrawMoney = () => {
  return <div className=""></div>;
};
const Cupouns = () => {
  return <CouponCodes />;
};
const Refunds = () => {
  return <div className=""></div>;
};
const Settings = () => {
  return <div className=""></div>;
};
const DashboardInbox = () => {
  return <div className=""></div>;
};
const Dashboard = () => {
  return <div className="">dashboard</div>;
};

export {
  Products,
  DashboardEvents,
  DashboardInbox,
  DashboardOrders,
  Settings,
  Refunds,
  Cupouns,
  WithdrawMoney,
  CreateEvent,
  CreateProduct,
  Dashboard,
};
