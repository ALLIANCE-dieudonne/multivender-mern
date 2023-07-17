import React, { useEffect, useState } from "react";
import "./checkout.css";
import styles from "../../styles/styles";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [state, setState] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState("");
  const [discountPrice, setDiscountPrice] = useState();
  const [userInfo, setUserInfo] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Navigation steps
  const steps = ["Shipping", "Payment", "Success"];

  const handleStepCompletion = () => {
    if (name === "" || email === "" || address1 === "" || address2 === "") {
      return;
    }

    setCompletedSteps((prevCompletedSteps) => [
      ...prevCompletedSteps,
      currentStep,
    ]);
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const progressBarWidth = `${(completedSteps.length / steps.length) * 100}%`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${server}/checkOut/checkout-info`, {
      name,
      email,
      phoneNumber,
      country,
      state,
      address1,
      address2,
      zipCode,
    });
  };

  const handleCoupon = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${server}/coupon/get-coupon-code/${couponCode}`
      );
      if (
        response.data.couponCode === undefined ||
        response.data.couponCode === ""
      ) {
        return toast.error("Coupon code does not exist!");
      } else {
        const shopId = response.data.couponCode.shop._id;
        const isCouponCodeValid =
          cart && cart.filter((item) => item.shopId === shopId);
        if (isCouponCodeValid.length === 0) {
          toast.error("Invalid coupon code for this shop!");
          setCouponCode("");
        } else {
          const couponCodeValue = response.data.couponCode.value;
          const eligiblePrice = isCouponCodeValid.reduce(
            (acc, item) => acc + item.qty * item.discountPrice,
            0
          );
          const discountPrice = (eligiblePrice * couponCodeValue) / 100;
          setDiscountPrice(discountPrice);
          setCouponCodeData(response.data.couponCode);
          setCouponCode("");
        }
      }
    } catch (err) {
      toast.error(err.message);
      setCouponCode("");
    }
  };

  const handlePayment = () => {
    if (name === "" || email === "" || address1 === "" || address2 === "") {
      toast.error("Please enter your delivery address!");
    } else {
      const shippingAddress = {
        name,
        email,
        address1,
        address2,
        country,
        state,
        zipCode,
        phoneNumber,
      };
      const orderData = {
        cart,
        totalPrice,
        subTotal,
        shipping,
        discountPercentage,
        shippingAddress,
        user,
      };
      // Update local storage with order data
      localStorage.setItem("orderData", JSON.stringify(orderData));
      navigate("/payment");
    }
  };

  // Subtotal price
  const subTotal = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  // Shipping cost calculation
  const shipping = (subTotal * 0.1).toFixed(2);

  // Discount percentage
  const discountPercentage = couponCodeData ? discountPrice : "";
  const totalPrice = couponCodeData
    ? (subTotal + parseFloat(shipping) - discountPercentage).toFixed(2)
    : (subTotal + parseFloat(shipping)).toFixed(2);

  return (
    <>
      <div className="flex flex-col gap-2">
        <Header />
        <div className="800px:flex justify-between w-[50%] items-center 800px:mx-auto mt-5 hidden ">
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
        <div className="w-[95%] 800px:mt-3 mx-4 ">
          <div className="w-full items-center 800px:flex gap-[5%] justify-center block ">
            {/*  shipping information*/}
            <div className="800px:w-[50%] bg-white  shadow-lg rounded-md mb-3 ">
              <div className="w-full p-3">
                <h1 className="text-[22px] font-[500] p-3">Shipping Address</h1>
                <div className="w-full">
                  <div className="w-full px-5 mt-3">
                    <form onSubmit={handleSubmit} aria-required>
                      <div className="w-full 800px:flex pb-3">
                        <div className="800px:w-[50%] ">
                          <label htmlFor="names" className="font-medium">
                            Full Names
                          </label>
                          <input
                            type="text"
                            className={`${styles.input} !w-[95%] mt-2 mb-3 a:border-blue-500`}
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />

                          <label htmlFor="phone" className="font-medium">
                            Phone Number
                          </label>
                          <input
                            type="number"
                            className={`${styles.input} !w-[95%] mt-2 mb-3`}
                            required
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />

                          <label htmlFor="country" className="font-medium">
                            Country
                          </label>
                          <select
                            name="country"
                            id="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="!w-[95%] border h-[35px] rounded-md mt-2 mb-3"
                          >
                            <option value="" className="block p-2 ">
                              Choose your country
                            </option>
                            {Country &&
                              Country.getAllCountries().map((country) => (
                                <option
                                  className="block p-2 "
                                  key={country.isoCode}
                                  value={country.isoCode}
                                >
                                  {country.name}
                                </option>
                              ))}
                          </select>

                          <label htmlFor="address1" className="font-medium">
                            Address 1
                          </label>
                          <input
                            type="text"
                            className={`${styles.input} !w-[95%] mt-2 mb-3 a:border-blue-500`}
                            required
                            value={address1}
                            onChange={(e) => setAddress1(e.target.value)}
                          />
                        </div>

                        <div className="800px:w-[50%]">
                          <label htmlFor="email" className="font-medium">
                            Email
                          </label>
                          <input
                            type="text"
                            className={`${styles.input} !w-[95%] mt-2 mb-3`}
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />

                          <label htmlFor="zipCode" className="font-medium">
                            Zip Code
                          </label>
                          <input
                            type="text"
                            className={`${styles.input} !w-[95%] mt-2 mb-3`}
                            required
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                          />
                          <label htmlFor="state" className="font-medium">
                            State
                          </label>
                          <select
                            name="state"
                            id="state"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className="!w-[95%] border h-[35px] rounded-md mt-2 mb-3"
                          >
                            <option value="" className="block p-2 ">
                              Choose your state
                            </option>
                            {State &&
                              State.getStatesOfCountry(country).map((state) => (
                                <option
                                  className="block p-2 "
                                  key={state.isoCode}
                                  value={state.isoCode}
                                >
                                  {state.name}
                                </option>
                              ))}
                          </select>

                          <label htmlFor="address2" className="font-medium">
                            Address 2
                          </label>
                          <input
                            type="text"
                            className={`${styles.input} !w-[95%] mt-2 mb-3 a:border-blue-500`}
                            required
                            value={address2}
                            onChange={(e) => setAddress2(e.target.value)}
                          />
                        </div>
                      </div>

                      <h5
                        className="text-[17px] font-[400]"
                        onClick={() => setUserInfo(!userInfo)}
                      >
                        Choose From Saved Address
                      </h5>
                      {userInfo && (
                        <div className="">
                          {user &&
                            user.addresses.map((item) => (
                              <div className="w-full flex">
                                <input
                                  type="checkbox"
                                  className="mt-1"
                                  value={item.addressType}
                                  onClick={() => {
                                    setCountry(item.country);
                                    setAddress1(item.address1);
                                    setAddress2(item.address2);
                                    setState(item.state);
                                    setZipCode(item.zipCode);
                                  }}
                                />
                                <h2 className="m-2">{item.addressType}</h2>
                              </div>
                            ))}
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Cart data */}
            <div className="800px:w-[25%] bg-white h-[400px] rounded-md shadow-lg">
              <div className="p-5">
                <div className="w-full flex  justify-between pb-2">
                  <h3 className="font-[500]">Subtotal:</h3>
                  <span>${subTotal}</span>
                </div>
                <div className="w-full flex  justify-between py-2">
                  <h3 className="font-[500]">Shipping:</h3>
                  <span>${shipping}</span>
                </div>
                <div className="w-full flex  justify-between py-2 border-b-2">
                  <h3 className="font-[500]">Discount:</h3>
                  <span>
                    -{discountPercentage ? `$${discountPercentage}` : null}
                  </span>
                </div>
                <div className="w-full flex  justify-between py-2">
                  <h3 className="font-[500]">Total:</h3>
                  <span>${totalPrice}</span>
                </div>

                <form>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mt-2 mb-3`}
                    placeholder="Coupon code..."
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    autoFill={true}
                  />
                  <div className="w-full flex justify-center p-2">
                    <input
                      onClick={handleCoupon}
                      type="submit"
                      className="w-60 rounded-sm h-9 border border-blue-500 cursor-pointer flex text-center justify-center font-medium text-[#3a24db] text-5 bg-blue-100 hover:text-black"
                      value="Apply Code"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center p-5">
            <input
              onClick={() => {
                handleStepCompletion();
                handlePayment();
              }}
              type="submit"
              className="w-60 rounded-md h-10 border border-blue-500 cursor-pointer flex text-center justify-center font-medium text-[#3a24db] text-5 bg-blue-100 hover:text-black"
              value="Go Payment"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
