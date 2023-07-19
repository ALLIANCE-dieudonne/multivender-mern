import { BsBagFill } from "react-icons/bs";
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllShopOrders } from "../../redux/actions/order";
import { backend_url, server } from "../../server";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const OrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (seller) {
      dispatch(getAllShopOrders(seller._id));
    }
  }, [dispatch, seller]);

  const data = orders && orders.find((item) => item._id === id);

  const orderUpdateHundler = async (e) => {
    e.preventDefault();
    axios
      .put(
        `${server}/order/update-order-status/${id}`,
        { status },
        { withCredentials: true }
      )
      .then(() => {
        toast.success(`Order updated successfully`);
        navigate("/dashboard/orders");
      })
      .catch((err) => {
        toast.error("Order has been updated or something went wrong!");
      });
  };

  const refundUpdateHandler = async (e) => {
    e.preventDefault();

    axios
      .put(
        `${server}/order/order-refund-sucess/${id}`,
        { status },
        { withCredentials: true }
      )
      .then(() => {
        toast.success(`Refund Success`);
        navigate("/dashboard/orders");
      })
      .catch((err) => {
        toast.error("Order has been updated or something went wrong!");
      });
  };

  const availableOptions = [
    "Proccessing",
    "Transffered to delivery person",
    "Shipping",
    "Received",
    "On the way",
    "Delivered",
  ].slice();
  const selectedIndex = availableOptions.indexOf(data?.status);
  if (selectedIndex !== -1) {
    availableOptions.splice(selectedIndex, 1);
  }
  return (
    <div className={`${styles.section} 800px:min-h-screen w-[98%]  mx-5`}>
      <div className="w-full flex justify-between p-3 items-center">
        <div className="p-2 flex gap-2 items-center justify-center">
          <BsBagFill size={35} color="green" />
          <span className="text-[25px] font-[500]">Order Details</span>
        </div>
        <div className="">
          <Link
            to="/dashboard/orders"
            className="flex items-center justify-center text-[20px] font-[600] px-3 w-[150px] py-2 text-green-900 bg-green-200 rounded-md"
          >
            Order List
          </Link>
        </div>
      </div>

      <div className="w-full block 800px:flex justify-between px-5  800px:px-10 py-3 items-center">
        <h5 className="text-[17px] text-[#00000084]">Order Id:#{data?._id}</h5>
        <h5 className="text-[17px] text-[#00000084]">
          Placed On:#{data?.createdAt?.slice(0, 10)}
        </h5>
      </div>

      {/* ordered items */}
      <div className="border-b-2 pb-2 border-[#00000]">
        {data &&
          data.cart.map((item) => (
            <div className="w-full flex justify-start px-5 ">
              <img
                src={`${backend_url}/${item.images[0]}`}
                alt="image"
                crossOrigin="anonymous"
                className="w-[80px] "
              />

              <div className="ml-2">
                <h4 className="text-[20px] font-[500] ">{item.name}</h4>
                <h4 className="text-[17px] font-[400]">
                  US$ {item.discountPrice} * {item.qty}
                </h4>
              </div>
            </div>
          ))}
      </div>

      <div className="flex 800px:justify-end pl-3">
        <h4 className="text-[20px] p-2 font-[500]">
          Total Price: <strong>{data?.totalPrice}</strong> USD
        </h4>
      </div>
      <div className="w-full 800px:flex justify-between 800px:w-[40%] pl-5">
        <div className="pt-2">
          <h4 className="font-[600] text-[22px] pb-2">Shipping Address:</h4>
          <div className="flex flex-col gap-2 text-[#4D4D4D] ">
            <h5 className="text-[17px] font-[500] ">
              Name:{data?.shippingAddress?.name}
            </h5>
            <h5 className="text-[17px] font-[500] ">
              Email:{data?.shippingAddress?.email}
            </h5>
            <h5 className="text-[17px] font-[500] ">
              State:{data?.shippingAddress?.state}
            </h5>
            <h5 className="text-[17px] font-[500] ">
              Country:{data?.shippingAddress?.country}
            </h5>
          </div>
        </div>
        <div className="">
          <h4 className="800px:pt-2 pt-3 font-[600] text-[22px]">
            Payment Info:
          </h4>
          <h5 className="text-[17px] font-[500] text-[#4D4D4D]">
            Type: {data?.paymentInfo.type}
          </h5>
        </div>
      </div>
      <h4 className="text-[22px] pl-5 pt-2 font-[500]">
        Status:{" "}
        <span className="text-[18px] text-[#4D4D4D]">{data?.status}</span>
      </h4>
      <h3 className="text-[20px] font-[500] pt-2 pl-5">Order Status:</h3>
      {data?.status !== "Processing Refund" &&
      data?.status !== "Refund Success" ? (
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-[220px] mt-2 border h-[35px] rounded-md ml-5"
        >
          {availableOptions.map((option, index) => (
            <option value={option} key={index}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-[220px] mt-2 border h-[35px] rounded-md ml-5"
        >
          <option value="Processing Refund">Processing Refund</option>
          <option value="Refund Success">Refund Success</option>
        </select>
      )}
      <div
        className={`${styles.button} text-white ml-5 `}
        onClick={
          status === 
          "Refund Success"
            ? refundUpdateHandler
            : orderUpdateHundler
        }
      >
        <span className="">Update Status</span>
      </div>
    </div>
  );
};
export default OrderDetails;
