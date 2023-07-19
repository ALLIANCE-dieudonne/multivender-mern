import { BsBagFill } from "react-icons/bs";
import styles from "../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllOrders } from "../redux/actions/order";
import { backend_url, server } from "../server";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    if (user) {
      dispatch(getAllOrders(user._id));
    }
  }, [dispatch, user]);

  const data = orders && orders.find((item) => item._id === id);

  const handleReview = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `${server}/product/create-review`,
        {
          user,
          rating,
          comment,
          productId: selectedItem?._id,
          orderId: id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setComment("");
        setRating(1);
        setOpen(false);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const handleRefund = async() => {
    await axios
      .put(`${server}/order/order-refund/${id}`, {
        status: "Processing Refund",
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <div
      className={`${styles.section} min-h-screen w-[98%]  mx-5 mt-12 800px:mt-0`}
    >
      <div className="w-full flex justify-between p-3 items-center">
        <div className="p-2 flex gap-2 items-center justify-center">
          <BsBagFill size={35} color="green" />
          <span className="text-[25px] font-[500]">Order Details</span>
        </div>
        <div className="">
          <Link
            to="/profile/all-orders"
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
            <div className="w-full flex justify-between px-5 ">
              <div className=" flex ">
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

              {/* review */}

              {data?.status !== "succeeded" || item.isReviewed ? null : (
                <div
                  className={`${styles.button} text-white`}
                  onClick={() => {
                    setOpen(true);
                    setSelectedItem(item);
                  }}
                >
                  Give a Review
                </div>
              )}
            </div>
          ))}
      </div>

      {/* review popup */}
      {open && (
        <div className="w-full h-min bg-[#00000032] fixed top-0 right-0 flex justify-center items-center z-50">
          <div className="w-[90%] h-min 800px:w-[40%] 800px:h-[95%] bg-white shadow-sm rounded-md">
            <div className="w-full flex justify-end p-3 cursor-pointer ">
              <RxCross1
                size={30}
                fontSize="bold"
                onClick={() => setOpen(false)}
              />
            </div>
            <div className="w-full flex justify-center flex-col items-center">
              <h3 className="text-[25px] font-[500]">Give a Review</h3>
              <div className="w-full pt-2 pl-5 flex">
                <img
                  src={`${backend_url}/${selectedItem?.images[0]}`}
                  alt="image"
                  className="w-[80px] h-[80px]"
                  crossOrigin="anonymous"
                />
                <div className="ml-2">
                  <h4 className="text-[20px] font-[500] ">
                    {selectedItem.name}
                  </h4>
                  <h4 className="text-[17px] font-[400]">
                    US$ {selectedItem.discountPrice} * {selectedItem.qty}
                  </h4>
                </div>{" "}
              </div>

              <div className="w-full">
                <h3 className="text-[20px] font-[500] pt-3 pl-5">
                  Give a Rating <span className="text-red-500">*</span>{" "}
                </h3>
                <div className="w-full  flex ml-4">
                  {[1, 2, 3, 4, 5].map((i) =>
                    rating >= i ? (
                      <AiFillStar
                        key={i}
                        className="ml-1 cursor-pointer"
                        color="rgba(246,186,0)"
                        size={25}
                        onClick={() => setRating(i)}
                      />
                    ) : (
                      <AiOutlineStar
                        key={i}
                        className="ml-1 cursor-pointer"
                        color="rgba(246,186,0)"
                        size={25}
                        onClick={() => setRating(i)}
                      />
                    )
                  )}
                </div>
              </div>
              <div className="w-full pl-5 flex flex-col">
                <form action="">
                  <label
                    htmlFor="comment"
                    className="text-[20px] font-[500] pt-2"
                  >
                    Write a comment <span>(optional)</span>
                  </label>

                  <textarea
                    name="comment"
                    id=""
                    cols="20"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="outline-none w-[95%] border p-2"
                    rows="8"
                    placeholder="How was your product? Tell us about it!"
                  ></textarea>
                </form>

                <div
                  className={`${styles.button} text-white`}
                  onClick={rating > 1 ? handleReview : null}
                >
                  Submit
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
            Type:{" "}
            {data?.paymentInfo?.type ? data?.paymentInfo?.type : "Not Paid"}
          </h5>
        </div>
      </div>
      <h4 className="text-[22px] pl-5 pt-2 font-[500]">
        Status:{" "}
        <span className="text-[18px] text-[#4D4D4D]">{data?.status}</span>
      </h4>
      <div className="w-full flex">
        <Link to="/" className={`${styles.button} text-white text-[17px] ml-3`}>
          Contact Seller
        </Link>
        {data?.status == "succeeded" && (
          <div
            className={`${styles.button} text-white text-[17px] ml-20`}
            onClick={handleRefund}
          >
            Give Refund
          </div>
        )}
      </div>
    </div>
  );
};
export default OrderDetails;
