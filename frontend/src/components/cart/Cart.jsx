import { RxCross2, RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiPlus, HiOutlineMinus } from "react-icons/hi";
import styles from "../../styles/styles";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { backend_url } from "../../server";
import { addToCart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (data) => {
    dispatch(removeFromCart(data));
  };
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addToCart(data));
  };

  return (
    <div className="w-full fixed top-0 right-0 bg-[#0000004b] h-screen  z-10 transition">
      <div className="w-[25%] bg-white fixed top-0 right-0 flex flex-col shadow-sm min-h-full justify-between ">
        <div>
          <div className="w-full flex justify-end pt-3 pr-3">
            <RxCross2 size={30} onClick={() => setOpenCart(false)} />
          </div>
          {cart && cart.length === 0 ? (
            <div className="flex h-[500px] text-center justify-center items-center font-medium text-[25px] ">
              Empty cart!
            </div>
          ) : (
            <>
              {/* Item length */}
              <div className={`${styles.normalFlex} w-full mb-5`}>
                <IoBagHandleOutline size={25} className="ml-4" />
                <p className="pl-2 text-[20px] font-[500]">
                  {cart && cart.length} items
                </p>
              </div>

              {/* Single cart item */}
              <div className="w-full border-top">
                {cart &&
                  cart.map((item, index) => (
                    <SingleCart
                      key={index}
                      data={item}
                      quantityChangeHandler={quantityChangeHandler}
                      handleRemoveFromCart={handleRemoveFromCart}
                    />
                  ))}
              </div>
            </>
          )}
        </div>

        {/* checkout button */}

        <div className="mb-3">
          <Link to="/checkout">
            <div className="h-[45px] bg-[#e44343] justify-center w-full flex items-center mx-auto ">
              <h1 className="text-white font-[500] text-[17px]">
                Checkout now US${totalPrice}
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const SingleCart = ({ data, quantityChangeHandler, handleRemoveFromCart }) => {
  const [value, setValue] = useState(data.qty);

  const increment = () => {
    setValue(value + 1);
    if (data.stock < value) {
      toast.error("Exceeded quantity limit!");
    } else {
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = () => {
    setValue(value <= 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value <= 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  const totalPrice = data.discountPrice * value;

  return (
    <div className="border-y p-4">
      <div className="w-full flex justify-between">
        <div>
          <div
            className={`bg-[#e44343] border rounded-full w-[25px] h-[25px]  justify-center ${styles.normalFlex} cursor-pointer`}
            onClick={() => increment(data)}
          >
            <HiPlus size={20} color="white" />
          </div>

          <span className="ml-2 font-[500]">{value}</span>

          <div
            className="bg-[#a7abb14f] rounded-full h-[25px] w-[25px] justify-center flex items-center"
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={20} color="#7d879c" />
          </div>
        </div>

        <div className="">
          <img
            crossOrigin="anonymous"
            src={`${backend_url}${data?.images[0]}`}
            alt=""
            className="w-[80px] h-[70px] ml-3 rounded-sm"
          />
        </div>

        <div className="justify-start">
          <h1 className="font-[500]">{data.name}</h1>
          <h4 className="font-[400] text-[15px]">
            {data.discountPrice} * {value}
          </h4>
          <h5 className="text-[#ed4545] font-[500] text-[17px]">
            US$ {totalPrice}
          </h5>
        </div>

        <RxCross1
          size={10}
          className="cursor-pointer my-auto"
          onClick={() => handleRemoveFromCart(data)}
        />
      </div>
    </div>
  );
};
export default Cart;
