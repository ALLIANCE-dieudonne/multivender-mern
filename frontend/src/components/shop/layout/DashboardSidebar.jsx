import {
  AiOutlineFolderAdd,
  AiOutlineGift,

} from "react-icons/ai";
import {  RxDashboard } from "react-icons/rx";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { MdOutlineLocalOffer } from "react-icons/md";

import { Link } from "react-router-dom";
import SidebarItem from "./SidebarItem";
const DashboardSidebar = ({ active }) => {
  return (
    <div className="w-full shadow-sm bg-white h-[89vh] overflow-y-scroll sticky  top-0 left-0  z-10 ">
      {/* single item */}
      {/* <div className="w-full items-center pt-4 z-10">
        <div className="w-full flex items-center mb-5">
          <Link
            to="/dashboard"
            className={`${active === 1 ? "text-[green]" : ""} flex`}
          >
            <RxDashboard className="ml-3 " size={30} />

            <h5 className={`pl-2 text-[20px] font-400 800px:flex hidden`}>
              Dashboard
            </h5>
          </Link>
        </div>

        <div className="w-full flex items-center mb-5">
          <Link
            to="/dashboard/orders"
            className={`${active === 2 ? "text-[green]" : ""} flex`}
          >
            <FiPackage className="ml-3 " size={30} />

            <h5 className={`pl-2 text-[20px] font-400 800px:flex hidden`}>
              All Orders
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center mb-5">
          <Link
            to="/dashboard/products"
            className={`${active === 3 ? "text-[green]" : ""} flex`}
          >
            <FiShoppingBag className="ml-3 " size={30} />

            <h5 className={`pl-2 text-[20px] font-400 800px:flex hidden`}>
              All Products
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center mb-5">
          <Link
            to="/dashboard/create-product"
            className={`${active === 4 ? "text-[green]" : ""} flex`}
          >
            <AiOutlineFolderAdd className="ml-3 " size={30} />

            <h5 className={`pl-2 text-[20px] font-400 800px:flex hidden`}>
              Create Product
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center mb-5">
          <Link
            to="/dashboard/events"
            className={`${active === 5 ? "text-[green]" : ""} flex`}
          >
            <MdOutlineLocalOffer className="ml-3 " size={30} />

            <h5 className={`pl-2 text-[20px] font-400 800px:flex hidden`}>
              All Events
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center mb-5">
          <Link
            to="/dashboard/create-event"
            className={`${active === 6 ? "text-[green]" : ""} flex`}
          >
            <VscNewFile className="ml-3 " size={30} />

            <h5 className={`pl-2 text-[20px] font-400 800px:flex hidden`}>
              Create Event
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center mb-5">
          <Link
            to="/dashboard/withdraw-money"
            className={`${active === 7 ? "text-[green]" : ""} flex`}
          >
            <CiMoneyBill className="ml-3 " size={30} />

            <h5 className={`pl-2 text-[20px] font-400 800px:flex hidden`}>
              Payment Methods
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center mb-5">
          <Link
            to="/dashboard/inbox"
            className={`${active === 8 ? "text-[green]" : ""} flex`}
          >
            <BiMessageSquareDetail className="ml-3 " size={30} />

            <h5 className={`pl-2 text-[20px] font-400 800px:flex hidden`}>
              Shop Inbox
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center mb-5">
          <Link
            to="/dashboard/cupouns"
            className={`${active === 9 ? "text-[green]" : ""} flex`}
          >
            <AiOutlineGift className="ml-3 " size={30} />

            <h5 className={`pl-2 text-[20px] font-400 800px:flex hidden`}>
              Cupoun Codes
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center mb-5">
          <Link
            to="/dashboard/refunds"
            className={`${active === 10 ? "text-[green]" : ""} flex`}
          >
            <HiOutlineReceiptRefund className="ml-3 " size={30} />

            <h5 className={`pl-2 text-[20px] font-400 800px:flex hidden`}>
              Refunds
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center mb-5">
          <Link
            to="/dashboard/settings"
            className={`${active === 11 ? "text-[green]" : ""} flex`}
          >
            <CiSettings className="ml-3 " size={30} />

            <h5 className={`pl-2 text-[20px] font-400 800px:flex hidden`}>
              Settings
            </h5>
          </Link>
        </div>
      </div> */}
      <SidebarItem/>
    </div>
  );
};
export default DashboardSidebar;
