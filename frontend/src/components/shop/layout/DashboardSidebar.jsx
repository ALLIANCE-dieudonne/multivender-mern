import SidebarItem from "./SidebarItem";
const DashboardSidebar = ({ active }) => {
  return (
    <div className="w-full shadow-sm bg-white h-[89vh] overflow-y-scroll sticky  top-0 left-0  z-10 ">
      {/* single item */}

      <SidebarItem />
    </div>
  );
};
export default DashboardSidebar;
