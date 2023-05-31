import { RxCross2, RxCross1 } from "react-icons/rx";
import { AiOutlineHeart } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";
import { useState } from "react";
import { Link } from "react-router-dom";

const Wishlist = ({ setOpenWishlist }) => {
  const cartData = [
    { name: "Iphone14 Pro Max", description: "The best phone", price: 222 },
    { name: "Samsang Galaxy", description: "The best phone", price: 200 },
    { name: "Iphone14 Pro Max", description: "The best phone", price: 288 },
  ];
  return (
    <div className="w-full fixed top-0 right-0 bg-[#0000004b] h-screen  z-10 transition">
      <div className="w-[25%] bg-white fixed top-0 right-0 flex flex-col shadow-sm min-h-full ">
        <div className="w-full flex justify-end pt-3 pr-3">
          <RxCross2 size={30} onClick={() => setOpenWishlist(false)} />
        </div>

        {/* Item length */}
        <div className={`${styles.normalFlex} w-full mb-5`}>
          <AiOutlineHeart size={25} className="ml-4" />
          <p className="pl-2 text-[20px] font-[500]">3 items</p>
        </div>

        {/* Single cart item */}
        <div className="w-full border-top">
          {cartData &&
            cartData.map((item, index) => (
              <SingleCart key={index} data={item} />
            ))}
        </div>

        {/* checkout button */}

        <div className="my-auto ">
          <Link to="/checkout">
            <div className="h-[45px] rounded-md bg-[#e44343] justify-center w-[90%] flex items-center mx-auto ">
              <h1 className="text-white font-[500] text-[17px]">
                Checkout now US$ 1058
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const SingleCart = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;

  return (
    <div className="border-y p-4">
      <div className="w-full flex justify-between">
        <BsCartPlus size={20} className="cursor-pointer my-auto" />

        <div className="">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvBQPQMVNRd6TtDkGs2dCri0Y-rxKkFOiEWw&usqp=CAU"
            alt=""
            className="w-[80px] h-[80px] ml-3"
          />
        </div>

        <div className="justify-start">
          <h1 className="font-[500]">{data.name}</h1>

          <h5 className="text-[#ed4545] font-[500] text-[17px]">
            US$ {totalPrice}
          </h5>
        </div>
        <div className="my-auto">
          <RxCross2 />
        </div>
      </div>
    </div>
  );
};
export default Wishlist;
