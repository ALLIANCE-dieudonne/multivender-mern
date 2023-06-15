import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import styles from "../../../styles/styles";
import {
  AiOutlineHeart,
  AiOutlineMessage,
  AiFillHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { backend_url } from "../../../server";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/actions/cart";

const ProductDetailsCard = ({
  setOpen,
  data,
  handleAddToWishlist,
  handleRemoveFromWishlist,
  click,
}) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);

  const handleMessageSend = () => {};

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const incrementCount = () => {
    setCount(count + 1);
  };

  const handleAddToCart = (id) => {
    const existItem = cart && cart.find((i) => i._id === id);
    if (existItem) {
      toast.error("cart already exists!");
    } else {
      if (data.stock < count) {
        toast.error("Exceed stock limit!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addToCart(cartData));
        toast.success("cart added successfully!");
      }
    }
  };

  return (
    <div className="bg-white">
      {data ? (
        <div className="fixed top-12 left-0 w-full h-scree z-40 flex justify-center items-center ">
          <div className="w-[90%] 800px:w-[60%] h-[82vh] overflow-y-scroll 800px:h-[75vh] rounded-md bg-white shadow-sm relative pr-7">
            <RxCross2
              size={25}
              onClick={() => setOpen((prev) => !prev)}
              className="absolute top-5 right-5"
            />

            <div className="block 800px:flex w-full">
              <div className="w-full 800px:w-[50%] pt-10 pb-2">
                <img
                  crossorigin="anonymous"
                  src={`${backend_url}${data.images && data.images[0]}`}
                  alt="image"
                  className="w-[90%] mx-auto rounded-md  "
                />

                <div className="flex ml-2.5 mb-4 mt-5">
                  <img
                    crossorigin="anonymous"
                    src={`${backend_url}${data?.shop?.avatar}`}
                    alt="shop image"
                    className="w-[50px] h-[50px] rounded-full "
                  />

                  <div className="ml-2">
                    <h1 className={`${styles.shop_name}`}>{data.name}</h1>
                    <h5 className="pb-2 text-[17px]">( 4.5 )Ratings</h5>
                  </div>
                </div>

                <div
                  className={`${styles.button} text-white ml-2.5`}
                  onClick={handleMessageSend}
                >
                  <span className="font-[500] flex items-center">
                    Send message <AiOutlineMessage size={20} className="ml-1" />
                  </span>
                </div>

                <h5 className="font-[500] text-[red] mt-2 ml-3">
                  ({data.sold_out}) Sold out
                </h5>
              </div>

              <div className="w-full 800px:w-[50%] mt-[50px] px-[10px]">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>

                <p className="pt-3">{data.description}</p>

                <div className="flex pt-3">
                  <h3 className={styles.productDiscountPrice}>
                    {data.discountPrice}$
                  </h3>

                  <h4 className={`${styles.price}`}>
                    {data.orginalPrice ? data.orginalPrice + "$" : null}
                  </h4>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2  hover:opacity-75 shadow-lg transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>

                    <span className="bg-gray-200 text-gray-900 px-4 py-[9.2px]  font-medium ">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2  hover:opacity-75 shadow-lg transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      {" "}
                      -
                    </button>
                  </div>

                  <div className="m-2 ">
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => handleRemoveFromWishlist(data)}
                        color={click ? "red" : "#333"}
                        title="remove from white list"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className=" cursor-pointer "
                        onClick={() => handleAddToWishlist(data)}
                        color={click ? "red" : "#333"}
                        title="remove from white list"
                      />
                    )}
                  </div>
                </div>

                <div
                  className={`${styles.button} text-white font-[500]`}
                  onClick={() => handleAddToCart(data._id)}
                >
                  Add to cart{" "}
                  <AiOutlineShoppingCart size={25} className="ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default ProductDetailsCard;
