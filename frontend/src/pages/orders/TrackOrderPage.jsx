import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllOrders } from "../../redux/actions/order";

const TrackOrderPage = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    if (user) {
      dispatch(getAllOrders(user._id));
    }
  }, [dispatch, user]);
  const data = orders && orders.find((i) => i._id === id);

  return (
    <div>
      <Header />
      {data && (
        <div className="h-[80vh] flex items-center justify-center text-[22px] font-[500] text-[#4D4D4D]">
          {data.status === "Proccessing" ? (
            <h4>Your order is still being processed!</h4>
          ) : data.status === "Transffered to delivery person" ? (
            <h4>Your order has been transferred to the delivery person!</h4>
          ) : data.status === "Shipping" ? (
            <h4>Your order is being shipped!</h4>
          ) : data.status === "Received" ? (
            <h4>Your order has been received!</h4>
          ) : (
            <h4>Your order is still being processed!</h4>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
};
export default TrackOrderPage;
