// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { server } from "../../server";
// import SingleProfileItem from "./SingleProfileItem";
// const ProfileSidebar = ({ active, setActive }) => {
//   const navigate = useNavigate();


//   return (
//     <div className="w-full bg-white shadow-sm rounded-lg p-4 my-auto">
//       <SingleProfileItem />

//     </div>
//   );
// };
// export default ProfileSidebar;


import React from "react";
import { AiOutlineCreditCard, AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {

  MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ProfileSidebar = ({ setActive, active }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/login-user");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8 mt-12 800px:mt-0">
      <div
        className="flex items-center cursor-pointer w-full mb-5"
        onClick={() => setActive(1)}
      >
        <RxPerson size={25} color={active === 1 ? "green" : ""} />
        <span
          className={`pl-3  font-[500] text-[20px] ${
            active === 1 ? "text-[green]" : ""
          } 800px:block hidden`}
        >
          Profile
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={25} color={active === 2 ? "green" : ""} />
        <span
          className={`pl-3 font-[500] text-[20px] ${
            active === 2 ? "text-[green]" : ""
          } 800px:block hidden`}
        >
          Orders
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund size={20} color={active === 3 ? "green" : ""} />
        <span
          className={`pl-3 font-[500] text-[20px] ${
            active === 3 ? "text-[green]" : ""
          } 800px:block hidden`}
        >
          Refunds
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(4) || navigate("/inbox")}
      >
        <AiOutlineMessage size={20} color={active === 4 ? "green" : ""} />
        <span
          className={`pl-3 font-[500] text-[20px] ${
            active === 4 ? "text-[green]" : ""
          } 800px:block hidden`}
        >
          Inbox
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges size={20} color={active === 5 ? "green" : ""} />
        <span
          className={`pl-3 font-[500] text-[20px] ${
            active === 5 ? "text-[green]" : ""
          } 800px:block hidden`}
        >
          Track Order
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(6)}
      >
        <AiOutlineCreditCard size={20} color={active === 6 ? "green" : ""} />
        <span
          className={`pl-3 font-[500] text-[20px] ${
            active === 6 ? "text-[green]" : ""
          } 800px:block hidden`}
        >
          Payment Methods 
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(7)}
      >
        <TbAddressBook size={20} color={active === 7 ? "green" : ""} />
        <span
          className={`pl-3 font-[500] text-[20px] ${
            active === 7 ? "text-[green]" : ""
          } 800px:block hidden`}
        >
          Address
        </span>
      </div>

      <div
        className="single_item flex items-center cursor-pointer w-full mb-8"
        onClick={logoutHandler}
      >
        <AiOutlineLogin size={20} color={active === 8 ? "green" : ""} />
        <span
          className={`pl-3 font-[500] text-[20px]${
            active === 8 ? "text-[green]" : ""
          } 800px:block hidden`}
        >
          Log out
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
