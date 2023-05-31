import { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import styles from "../../styles/styles";
import { useSearchParams } from "react-router-dom";
import { productData } from "../../static/data";
import ProductCard from "../../components/Route/ProductCard/ProductCard";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();

  const categoryData = searchParams.get("category");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (categoryData === null) {
      const d =
        productData && productData.sort((a, b) => a.total_sell - b.total_sell);
      setData(d);
    } else {
      const d =
        productData &&
        productData.filter((item) => item.category === categoryData);
      setData(d);
    }
  }, [categoryData]);

  return (
    <div>
      <Header activeHeading={3} />

      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5 xl:gap-7 800px:my-12 mt-20 mb-12 ">
          {data &&
            data.map((item, index) => <ProductCard data={item} key={index} />)}
        </div>
        {data && data.length === 0 ? (
          <h1 className="text-center font-[500] text-[30px] w-full">
            No Products Found !
          </h1>
        ) : null}
      </div>
    </div>
  );
};
export default ProductsPage;
