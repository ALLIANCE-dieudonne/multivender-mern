import { useEffect, useState } from "react"
import { productData } from "../../../static/data";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";

const BestDeals = () => {

    const [data, setData] = useState();

    useEffect(()=>{
        const d= productData &&productData.sort((a,b)=> a.total_sell - b.total_sell);
        const firstFive = d.slice(0,5);

        setData(firstFive);
    },[])
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5 xl:gap-7 mb-12">
            {data && data.map((item, index) => (
                <ProductCard key={index} data={item}/>
            ))}
        </div>
      </div>
    </div>
  );
}
export default BestDeals