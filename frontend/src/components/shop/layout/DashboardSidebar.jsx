import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { VscNewFile } from "react-icons/vsc";

import SidebarItem from "./SidebarItem";
const DashboardSidebar = ({ active }) => {
  return (
    <div className="w-full shadow-sm bg-white h-[85vh] overflow-y-scroll sticky  z-10 mt-1 ">
      <SidebarItem />
    </div>
  );
};
export default DashboardSidebar;
