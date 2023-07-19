import { Outlet } from "react-router-dom";
import DashboardHeader from "../../components/shop/layout/DashboardHeader";
import DashboardSidebar from "../../components/shop/layout/DashboardSidebar.jsx";
const shopDashboard = () => {
  return (
    <>
      <div>
        <DashboardHeader />
      </div>

      <div className="w-full flex justify-between  h-[85vh] ">
        <div className="800px:w-[330px] w-20 ">
          <DashboardSidebar />
        </div>

        <Outlet />
      </div>
    </>
  );
};
export default shopDashboard;
