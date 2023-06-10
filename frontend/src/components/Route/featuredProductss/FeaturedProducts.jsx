import { useSelector } from "react-redux";
// import { productData } from "../../../static/data";
import styles from "../../../styles/styles"
import ProductCard from "../ProductCard/ProductCard";


const FeaturedProducts = () => {
  const {allproducts} = useSelector((state) => state.product)
  return (
    <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1>Featured Products</h1>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5 xl:gap-7 mb-12">
        {allproducts && allproducts.map((item, index) =><ProductCard data={item} key={index}/>)}
      </div>
    </div>
  );
}
export default FeaturedProducts