import { useEffect, useState } from "react";
import ProductCard from "../Route/ProductCard/ProductCard";
import styles from "../../styles/styles";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllShopProducts } from "../../redux/actions/product";
const ShopProfileData = ({ isOwner }) => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.product);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getAllShopProducts(id));
  }, [dispatch, id]);
  const [active, setActive] = useState(1);

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
    </>
  );
};
export default ShopProfileData;
