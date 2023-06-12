import { useMemo } from "react";
import Header from "../../components/layout/Header";
import styles from "../../styles/styles";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/Route/ProductCard/ProductCard";
import { useSelector } from "react-redux";
import Loader from "../../components/layout/Loader";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { allproducts, isLoading } = useSelector((state) => state.product);

  const data = useMemo(() => {
    if (categoryData === null) {
      return (
        allproducts &&
        [...allproducts].sort((a, b) => a.total_sell - b.total_sell)
      );
    } else {
      return (
        allproducts &&
        allproducts.filter((item) => item.category === categoryData)
      );
    }
  }, [categoryData, allproducts]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={3} />

          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5 xl:gap-7 800px:my-12 mt-20 mb-12 ">
              {data.map((item, index) => (
                <ProductCard data={item} key={index} />
              ))}
            </div>
            {data.length === 0 && (
              <h1 className="text-center font-[500] text-[30px] w-full">
                No Products Found !
              </h1>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsPage;
