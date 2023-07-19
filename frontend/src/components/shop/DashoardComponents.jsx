import ProductCreate from "./sidebarCopenents/CreateProduct";
import AllProducts from "./sidebarCopenents/AllProducts";
import EventCreate from "./sidebarCopenents/EventCreate";
import AllProductsEvents from "./sidebarCopenents/AllProductsEvents";
import CouponCodes from "./sidebarCopenents/CouponCodes";
import AllOrders from "./sidebarCopenents/AllOrders";
import ShopRefunds from "./sidebarCopenents/ShopRefunds";
import DashboardHome from "./sidebarCopenents/DashboardHome";
import ShopSettings from "./sidebarCopenents/ShopSettings";
import WithdrawMoneyPage from "./sidebarCopenents/WithdrawMoneyPage.jsx";
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
  return <WithdrawMoneyPage/>;
};
const Cupouns = () => {
  return <CouponCodes />;
};
const Refunds = () => {
  return <ShopRefunds />;
};
const Settings = () => {
  return <ShopSettings />;
};
const DashboardInbox = () => {
  return <div className=""></div>;
};
const Dashboard = () => {
  return <DashboardHome />;
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
