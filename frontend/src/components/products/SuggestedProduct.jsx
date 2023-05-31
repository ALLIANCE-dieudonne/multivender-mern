import { useEffect, useState } from "react"
import { productData } from "../../static/data";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";

const SuggestedProduct = ({data}) => {

    const [products, setProducts ] = useState();

    useEffect(()=>{
        const d= productData && productData.filter((item)=>item.category === data.category)
        setProducts(d);
    },[data])
  return (
    <div>
      {data ? (
        <div className={`${styles.section} p-4`}>
          <h2 className={`${styles.heading}`}>Related Products</h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5 xl:gap-7 mb-12 ">
            {products &&
              products.map((item, index) => (
                <ProductCard key={index} data={item} />
              ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default SuggestedProduct