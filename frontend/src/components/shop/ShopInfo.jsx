import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import styles from "../../styles/styles";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllShopProducts } from "../../redux/actions/product";
import Loader from "../../components/layout/Loader";

const ShopInfo = ({ isOwner }) => {
  const [data, setData] = useState({});
  const [loading, setIsLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${server}/shop/getshop-info/${id}`)
      .then((res) => {
        setData(res.data.shop);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
    dispatch(getAllShopProducts(id));
  }, []);

  const handleLogout = () => {
    axios.get(`${server}/shop/logout`, { withCredentials: true });
    window.location.reload();
  };

  const Info = [
    {
      name: "Adress",
      info: data.address,
    },
    {
      name: " Phone Number",
      info: data.phoneNumber,
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
      info: data.createdAt?.slice(0, 10),
    },
  ];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full py-5">
          <div className="w-full flex items-center justify-center ">
            <img
              crossorigin="anonymous"
              src={`${backend_url}${data?.avatar}`}
              alt="shop"
              className="w-[150px] h-[150px] rounded-full object-cover"
            />
          </div>
          <h3 className="text-center pt-3 font-medium text-[18px] text-[#000000a6]">
            {data.name}
          </h3>
          <p className="flex items-center p-2 text-center">
            {data.description}
          </p>

          {Info &&
            Info.map((item, index) => {
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
          {isOwner && (
            <div className="">
              <div className={`  ${styles.button} !w-[90%] !h-[42px] mx-auto`}>
                <h4 className="text-white font-[400] text-[17px]">Edit Shop</h4>
              </div>
              <div
                className={`  ${styles.button} !w-[90%] !h-[42px] mx-auto`}
                onClick={handleLogout}
              >
                <h4 className="text-white font-[400] text-[17px]">Log Out</h4>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default ShopInfo;
