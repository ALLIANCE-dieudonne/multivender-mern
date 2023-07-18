import Footer from "../../components/layout/Footer"
import DashboardHeader from "../../components/shop/layout/DashboardHeader"
import OrderDetailsComponent from "../../components/shop/OrderDetailsComponent.jsx"
const ShopOrderDetails = () => {
  return (
    <div>
        <DashboardHeader/>
        <OrderDetailsComponent/>
        <Footer/>
    </div>
  )
}
export default ShopOrderDetails;