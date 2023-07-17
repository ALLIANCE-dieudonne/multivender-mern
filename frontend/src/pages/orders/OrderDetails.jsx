import Footer from "../../components/layout/Footer"
import DashboardHeader from "../../components/shop/layout/DashboardHeader"
import OrderDetailsComponent from "../../components/shop/OrderDetailsComponent.jsx"
const OrderDetails = () => {
  return (
    <div>
        <DashboardHeader/>
        <OrderDetailsComponent/>
        <Footer/>
    </div>
  )
}
export default OrderDetails