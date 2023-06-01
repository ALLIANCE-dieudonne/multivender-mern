import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import styles from "../../styles/styles";

const ShopInfo = ({isOwner}) => {
  const { isSeller, seller } = useSelector((state) => state.seller);

  const handleLogout = () =>{

  }

  return (
    <div className="w-full py-5">
      <div className="w-full flex items-center justify-center ">
        <img
          crossorigin="anonymous"
          src={`${backend_url}${seller?.avatar}`}
          alt="shop"
          className="w-[150px] h-[150px] rounded-full object-cover"
        />
      </div>
      <h3 className="text-center pt-3 font-medium text-[18px] text-[#000000a6]">
        {seller.name}
      </h3>

      <p className="flex items-center p-2 text-center">{seller.description}</p>

      <div className="pl-5 pb-3">
        <h4 className="font-[500] text-[#000000a6] text-[17px]">Adress</h4>
        <h5>{seller.address}</h5>
      </div>
      <div className="pl-5 pb-3">
        <h4 className="font-[500] text-[#000000a6] text-[17px]">
          Phone Number
        </h4>
        <h5>{seller.phoneNumber}</h5>
      </div>
      <div className="pl-5 pb-3">
        <h4 className="font-[500] text-[#000000a6] text-[17px]">
          Total Products
        </h4>
        <h5>120 </h5>
      </div>
      <div className="pl-5 pb-3">
        <h4 className="font-[500] text-[#000000a6] text-[17px]">
          Shop Ratings
        </h4>
        <h5>4.5 </h5>
      </div>
      <div className="pl-5 pb-3">
        <h4 className="font-[500] text-[#000000a6] text-[17px]">Joined On</h4>
        <h5>{seller.createdAt.slice(0,10)} </h5>
      </div>

      {isOwner && (
        <div className="">
          <div className={`  ${styles.button} !w-[90%] !h-[42px] mx-auto`}>
            <h4 className="text-white font-[400] text-[17px]">Edit Shop</h4>
          </div>
          <div className={`  ${styles.button} !w-[90%] !h-[42px] mx-auto`} onClick={()=> handleLogout}>
            <h4 className="text-white font-[400] text-[17px]">Log Out</h4>
          </div>
        </div>
      )}
    </div>
  );
};
export default ShopInfo;
