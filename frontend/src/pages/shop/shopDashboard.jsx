import DashboardHeader from "../../components/shop/layout/DashboardHeader";
import DashboardSidebar from "../../components/shop/layout/DashboardSidebar.jsx";
const shopDashboard = () => {
  return (
    <>
      <div>
        <DashboardHeader />
      </div>
       
      <div className="w-full flex justify-between items-center">
        <div className="w-[330px]">
          <DashboardSidebar active={1} />
        </div>
      </div>
    </>
  );
};
export default shopDashboard;
