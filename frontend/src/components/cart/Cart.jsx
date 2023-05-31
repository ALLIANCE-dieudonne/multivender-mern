import { RxCross2, RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiPlus, HiOutlineMinus } from "react-icons/hi";
import styles from "../../styles/styles";
import { useState } from "react";
import {Link} from "react-router-dom"

const Cart = ({ setOpenCart }) => {
  const cartData = [
    { name: "Iphone14 Pro Max", description: "The best phone", price: 222 },
    { name: "Samsang Galaxy", description: "The best phone", price: 200 },
    { name: "Iphone14 Pro Max", description: "The best phone", price: 288 },
  ];
  return (
    <div className="w-full fixed top-0 right-0 bg-[#0000004b] h-screen  z-10 transition">
      <div className="w-[25%] bg-white fixed top-0 right-0 flex flex-col shadow-sm min-h-full ">
        <div className="w-full flex justify-end pt-3 pr-3">
          <RxCross2 size={30} onClick={() => setOpenCart(false)} />
        </div>

        {/* Item length */}
        <div className={`${styles.normalFlex} w-full mb-5`}>
          <IoBagHandleOutline size={25} className="ml-4" />
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
        <Link to="/checkout" >
            <div className="h-[45px] rounded-md bg-[#e44343] justify-center w-[90%] flex items-center mx-auto ">
                <h1 className="text-white font-[500] text-[17px]">Checkout now US$ 1058</h1>
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
        <div>
          <div
            className={`bg-[#e44343] border rounded-full w-[25px] h-[25px]  justify-center ${styles.normalFlex} cursor-pointer`}
            onClick={() => setValue(value + 1)}
          >
            <HiPlus size={20} color="white" />
          </div>

          <span className="ml-2 font-[500]">{value}</span>

          <div
            className="bg-[#a7abb14f] rounded-full h-[25px] w-[25px] justify-center flex items-center"
            onClick={() => setValue(value <= 1 ? 1 : value - 1)}
          >
            <HiOutlineMinus size={20} color="#7d879c" />
          </div>
        </div>

        <div className="">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvBQPQMVNRd6TtDkGs2dCri0Y-rxKkFOiEWw&usqp=CAU"
            alt=""
            className="w-[80px] h-[80px] ml-3"
          />
        </div>

        <div className="justify-start">
          <h1 className="font-[500]">{data.name}</h1>
          <h4 className="font-[400] text-[15px]">
            {data.price} * {value}
          </h4>
          <h5 className="text-[#ed4545] font-[500] text-[17px]">
            US$ {totalPrice}
          </h5>
        </div>

        <RxCross1 size={10}  className="cursor-pointer my-auto"/>
      </div>
    </div>
  );
};
export default Cart;
