import { Outlet } from "react-router-dom";
import DashboardHeader from "../../components/shop/layout/DashboardHeader";
import DashboardSidebar from "../../components/shop/layout/DashboardSidebar.jsx";
const shopDashboard = () => {
  return (
    <>
      <div>
        <DashboardHeader />
      </div>
       
      <div className="w-full flex justify-between items-center">
        <div className="800px:w-[330px] w-16">
          <DashboardSidebar active={1} />
        </div>
      </div>

      <Outlet/>
    </>
  );
};
export default shopDashboard;
