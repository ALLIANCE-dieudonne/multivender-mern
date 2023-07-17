import React, { useEffect, useState } from "react";
import "./checkout.css";
import styles from "../../styles/styles";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { RxCross1 } from "react-icons/rx";

const PaymentPage = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    window.scrollTo(0, 0);
    const orderData = JSON.parse(localStorage.getItem("orderData"));
    setOrderData(orderData);
  }, []);

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.totalPrice,
  };

  const handleCashOnDelivery = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.paymentInfo = {
      type: "Cash On Delivery",
    };

    if (orderData.length === 0) {
      return;
    }
    await axios
      .post(`${server}/order/create-order`, order, config, {
        withCredentials: true,
      })
      .then(() => {
        navigate("/success");
        window.location.reload();
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("orderData", JSON.stringify([]));
        toast.success("Order created successfully!");
      });
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "currency",
            amount: {
              currency_code: "USD",
              value: orderData?.totalPrice,
            },
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderId) => {
        return orderId;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      const { payer } = details;
      let paymentInfo = payer;
      if (paymentInfo !== undefined) {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        order.paymentInfo = {
          id: paymentInfo.payer_id,
          status: "succeeded",
          type: "Paypal",
        };

        return axios
          .post(`${server}/order/create-order`, order, config)
          .then((res) => {
            // navigate("/order/success");
            window.location.reload();
            localStorage.setItem("cartItem", JSON.stringify([]));
            localStorage.setItem("orderData", JSON.stringify([]));
          });
      }
    });
  };

  const steps = ["Shipping", "Payment", "Success"];
  const progressBarWidth = `${(completedSteps.length / steps.length) * 100}%`;

  return (
    <>
      <div className="flex flex-col gap-2">
        <Header />
        <div className="800px:flex justify-between w-[50%] items-center 800px:mx-auto mt-5 hidden">
          <section className="step-wizard">
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: progressBarWidth }}
              ></div>
            </div>
            <ul className="step-wizard-list">
              {steps.map((step, index) => (
                <li
                  key={index}
                  className={`step-wizard-item ${
                    completedSteps.includes(index + 1) ? "completed-item" : ""
                  } ${currentStep === index + 1 ? "current-item" : ""}`}
                >
                  <span className="progress-count">{index + 1}</span>
                  <span className="progress-label">{step}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="800px:hidden mt-10 flex items-end justify-center">
          <h1 className="p-3 font-[500] text-[20px]">Shipping Information</h1>
        </div>
        <div className="w-[95%] 800px:mt-3 mx-4">
          <div className="w-full items-center justify-center flex mt-5">
            <button
              className="w-[250px] h-[50px]  text-white rounded-md bg-green-500 text-[20px] font-[500] hover:bg-green-700"
              onClick={() => setOpen(true)}
            >
              Pay now
            </button>
            {open && (
              <div className="w-full h-full bg-[#00000039] fixed top-0 right-0 z-[100] flex justify-center items-center">
                <div className="800px:w-[35%]  800px:h-[85%] bg-white w-[90%] h-[90%] m-4 rounded-md  justify-center ">
                  <div className="w-full justify-end flex p-3">
                    <RxCross1 size={25} onClick={() => setOpen(false)} />
                  </div>
                  <div className="w-[90%] mt-[90px] mx-3">
                    <PayPalScriptProvider
                      options={{
                        "client-id":
                          "AT3TkEhiCtbB0iBfm-KqBajeLboV-I8ch5wpFr6AVF3sc_YEdeRX4_XfSZR_d5bWVYXZg3LxiQzrr-wU",
                      }}
                    >
                      <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={createOrder}
                        onApprove={onApprove}
                      />
                    </PayPalScriptProvider>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-full flex justify-center p-5">
            <form action="" onSubmit={handleCashOnDelivery}>
              <input
                type="submit"
                className="w-60 rounded-md h-12 border border-blue-500 cursor-pointer flex text-center justify-center font-medium text-[#3a24db] text-5 bg-blue-100 hover:text-black"
                value="Cash On Delivery"
              />
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentPage;
