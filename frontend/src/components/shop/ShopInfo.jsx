import { useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import styles from "../../styles/styles";


const ShopInfo = ({ isOwner }) => {
  const { isSeller, seller } = useSelector((state) => state.seller);

  const handleLogout = () => {
    axios.get(`${server}/shop/logout`)
  };

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


      <Info />

      {isOwner && (
        <div className="">
          <div className={`  ${styles.button} !w-[90%] !h-[42px] mx-auto`}>
            <h4 className="text-white font-[400] text-[17px]">Edit Shop</h4>
          </div>
          <div
            className={`  ${styles.button} !w-[90%] !h-[42px] mx-auto`}
            onClick={() => handleLogout}
          >
            <h4 className="text-white font-[400] text-[17px]">Log Out</h4>
          </div>
        </div>
      )}
    </div>
  );
};
export default ShopInfo;

const Info = ({ name, info }) => {
  const { isSeller, seller } = useSelector((state) => state.seller);

  const data = [
    {
      name: "Adress",
      info: seller.address,
    },
    {
      name: " Phone Number",
      info: seller.phoneNumber,
    },
    {
      name: "Adress",
      info: seller.address,
    },
    {
      name: "  Total Products",
      info: 20,
    },
    {
      name: "   Shop Ratings",
      info: 4.5,
    },
    {
      name: "  Joined On",
      info: seller.createdAt.slice(0, 10),
    },
  ];

  return (
    <>
      {data &&
        data.map((item, index) => {
          const name = item.name;
          const info = item.info;

          return (
            <div className="pl-5 pb-3">
              <h4 className="font-[500] text-[#000000a6] text-[17px]">
                {name}
              </h4>
              <h5>{info} </h5>
            </div>
          );
        })}
    </>
  );
};
