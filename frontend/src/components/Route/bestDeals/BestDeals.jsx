import { useEffect, useState } from "react";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";

const BestDeals = () => {
  const { allproducts } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    const sortedProducts = [...allproducts]?.sort(
      (a, b) => a.sold_out - b.sold_out
    ).slice(0, 5);
    const firstFive = sortedProducts;

    setData(firstFive);
  }, [allproducts]);



  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5 xl:gap-7 mb-12">
          {data &&
            data.map((item, index) => (
              <ProductCard key={item.id} data={item} />
            ))}
        </div>
      </div>
    </div>
  );
};
export default BestDeals;
