import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { backend_url } from "../../../server";
import { useState } from "react";
const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);
  const [active, setActive] = useState(false);

   window.addEventListener("scroll", () => {
     if (window.scrollY > 60) {
       setActive(true);
     } else {
       setActive(false);
     }
   });

  return (
    <div className="w-full h-[80px] shadow-md top-0 left-0  flex items-center justify-between p-4 bg-white z-30">
      <div>
        <Link to="/dashboard">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt="logo"
            
          />{" "}
        </Link>
      </div>

      <div className="flex items-center ">
        <div className="hidden items-center mr-4 800px:flex">
          <Link to="/dashboard/cupouns">
            <AiOutlineGift
              color="#555"
              size={30}
              className="cursor-pointer mx-4"
            />
          </Link>
          <Link to="/dashboard/events">
            <MdOutlineLocalOffer
              color="#555"
              size={30}
              className="cursor-pointer mx-4"
            />
          </Link>
          <Link to="/dashboard/products">
            <FiShoppingBag
              color="#555"
              size={30}
              className="cursor-pointer mx-4"
            />
          </Link>
          <Link to="/dashboard/orders">
            <FiPackage color="#555" size={30} className="cursor-pointer mx-4" />
          </Link>
        
        </div>

        <Link to={`/shop/${seller?._id}`}>
          <img
            crossorigin="anonymous"
            src={seller?.avatar[0]}
            alt="shop"
            className="w-[40px] h-[40px] rounded-full object-cover"
          />
        </Link>
      </div>
    </div>
  );
};
export default DashboardHeader;
