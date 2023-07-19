import { useEffect, useState } from "react";
import ProductCard from "../Route/ProductCard/ProductCard";
import styles from "../../styles/styles";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllShopProducts } from "../../redux/actions/product";
import { getAllShopEvents } from "../../redux/actions/event";
import { backend_url } from "../../server";
import { all } from "axios";
import Rating from "../products/Rating";
const ShopProfileData = ({ isOwner }) => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.product);
  const { events } = useSelector((state) => state.events);

  const { id } = useParams();
  useEffect(() => {
    dispatch(getAllShopProducts(id));
    dispatch(getAllShopProducts(id));
    dispatch(getAllShopEvents(id));
  }, [dispatch, id]);
  const [active, setActive] = useState(1);

  const allReviews = products?.map((product) => product.reviews).flat().slice(0,10) || [];

  return (
    <>
      <div className="w-full items-center justify-between 800px:flex p-3 grid grid-cols-2 ">
        <div className="flex items-center" onClick={() => setActive(1)}>
          <h5
            className={`font-[500] text-[18px] cursor-pointer ${
              active === 1 ? "text-[green]" : "#000000a6"
            }`}
          >
            Shop Products
          </h5>
        </div>
        <div className="flex items-center" onClick={() => setActive(2)}>
          <h5
            className={`font-[500] text-[18px] cursor-pointer ${
              active === 2 ? "text-[green]" : "#000000a6"
            }`}
          >
            Running Events{" "}
          </h5>
        </div>
        <div className="flex items-center" onClick={() => setActive(3)}>
          <h5
            className={`font-[500] text-[18px] cursor-pointer ${
              active === 3 ? "text-[green]" : "#000000a6"
            }`}
          >
            Shop Reviews
          </h5>
        </div>

        {isOwner && (
          <Link to="/dashboard">
            <div className={`${styles.button}`}>
              <span className="text-white text-[17px]">Go Dashboard</span>
            </div>
          </Link>
        )}
      </div>
      <hr />
      {active === 1 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4  mb-12 mx-3 mt-4 ">
          {products &&
            products.map((item) => (
              <ProductCard key={item._id} data={item} isShop={true} />
            ))}
        </div>
      )}

      {active === 2 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4  mb-12 mx-3 mt-4 ">
          {events &&
            events.map((item) => (
              <ProductCard key={item._id} data={item} isShop={true} isEvent={true}/>
            ))}
        </div>
      )}
      {active === 3 && (
        <div className=" ">
          {allReviews &&
            allReviews.map((item, index) => (
              <div className="w-full" key={index}>
                <div className="flex m-2">
                  <img
                    src={`${backend_url}/${item.user.avatar}`}
                    alt="user image"
                    className="w-[60px] h-[60px] rounded-full object-contain"
                    crossOrigin="anonymous"
                  />
                  <div className="ml-2">
                    <div className="flex">
                      <h4 className="text-[17px] font-[500] mr-2">
                        {item.user.name}
                      </h4>
                      <Rating rating={item?.rating} />
                    </div>
                    <p className="text-[#4d4d4d]">{item?.comment}</p>
                    <span className="text-[#4d4d4d] font-[500]">2 Days ago</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
};
export default ShopProfileData;
