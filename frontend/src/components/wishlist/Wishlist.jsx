import { RxCross2, RxCross1 } from "react-icons/rx";
import { AiOutlineHeart } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url } from "../../server";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { addToCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);

  return (
    <div className="w-full fixed top-0 right-0 bg-[#0000004b] h-screen  z-10 transition">
      <div className="w-[25%] bg-white fixed top-0 right-0 flex flex-col shadow-sm min-h-full ">
        <div className="w-full flex justify-end pt-3 pr-3">
          <RxCross2 size={30} onClick={() => setOpenWishlist(false)} />
        </div>

        {wishlist.length === 0 ? (
          <div className="font-[500] text-[22px] flex  items-center justify-center h-[500px]">
            <h2>Empty Wishlist!</h2>
          </div>
        ) : (
          <>
            {/* Item length */}
            <div className={`${styles.normalFlex} w-full mb-5`}>
              <AiOutlineHeart size={25} className="ml-4" />
              <p className="pl-2 text-[20px] font-[500]">
                {wishlist.length} items
              </p>
            </div>

            <div className="w-full border-top">
              {/* Single wishlist item */}
              {wishlist &&
                wishlist.map((item, index) => (
                  <SingleWishlist key={index} data={item} />
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const SingleWishlist = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.discountPrice * value;
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const handleAddToCart = (data) => {
    dispatch(addToCart(data)).then(() => {
      const existItem = cart && cart.find((i) => i._id === data._id);
      if (existItem) {
        toast.error("Cart already exists!");
      } else {
        toast.success("Carxt added successfully!");
      }
    });
  };

  return (
    <div className="border-y p-4">
      <div className="w-full flex justify-between">
        <BsCartPlus
          size={20}
          className="cursor-pointer my-auto"
          onClick={() => handleAddToCart(data)}
        />

        <div className="">
          <img
            crossOrigin="anonymous"
            src={`${backend_url}${data.images[0]}`}
            alt=""
            className="w-[70px] h-[60px] ml-3 rounded-md"
          />
        </div>

        <div className="justify-start">
          <h1 className="font-[500]">{data.name}</h1>

          <h5 className="text-[#ed4545] font-[500] text-[17px]">
            US$ {totalPrice}
          </h5>
        </div>
        <div className="my-auto" onClick={() => handleRemoveFromWishlist(data)}>
          <RxCross2 />
        </div>
      </div>
    </div>
  );
};
export default Wishlist;
