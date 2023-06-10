import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";

const SuggestedProduct = ({ data }) => {
  const allProducts = useSelector((state) => state.product.allproducts);
  const [productData, setProductData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const filteredProducts =
      allProducts &&
      allProducts.filter((item) => item.category === data.category);
    setProductData(filteredProducts);
  }, [allProducts, data.category]);


  return (
    <div>
      {data ? (
        <div className={`p-4 ${styles.section}`}>
          <h2
            className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
          >
            Related Product
          </h2>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {productData &&
              productData.map((item, index) => (
                <ProductCard key={index} data={item} />
              ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProduct;
