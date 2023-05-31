import styles from "../../styles/styles"
import ShopInfo from "../../components/shop/ShopInfo.jsx"

const ShopHomePage = () => {
  return <div className={`${styles.section} bg-[#f5f5f5]`}>
    <div className="w-full justify-between flex py-10">
      <div className="w-[25%] bg-white rounded-md shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
        <ShopInfo/>
      </div>
    </div>
  </div>;
};
export default ShopHomePage;