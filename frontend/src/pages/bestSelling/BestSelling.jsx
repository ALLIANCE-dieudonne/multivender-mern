import { useEffect, useMemo } from "react";
import Header from "../../components/layout/Header";
import styles from "../../styles/styles";
import ProductCard from "../../components/Route/ProductCard/ProductCard";
import { useSelector } from "react-redux";
import Loader from "../../components/layout/Loader";

const BestSelling = () => {
  const { allproducts, isLoading } = useSelector((state) => state.product);
  console.log(allproducts);

    useEffect(()=>{
      window.scrollTo(0, 0);
    })
  const data = useMemo(() => {
    if (allproducts) {
      return [...allproducts].sort((a, b) => b.sold_out - a.sold_out);
    }
    return [];
  }, [allproducts]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={2} />

          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5 xl:gap-7 800px:my-12 mt-20 mb-12">
              {data.map((item, index) => (
                <ProductCard data={item} key={index} />
              ))}
            </div>
            {data.length === 0 && (
              <h1 className="text-center font-[500] text-[30px] w-full">
                No Products Found!
              </h1>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BestSelling;
