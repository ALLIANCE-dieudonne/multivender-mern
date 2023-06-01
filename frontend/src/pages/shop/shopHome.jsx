import styles from "../../styles/styles";
import ShopInfo from "../../components/shop/ShopInfo";
import ShopProfileData from "../../components/shop/ShopProfileData";

const ShopHomePage = () => {
  return (
    <div className={`${styles.section} bg-[#f5f5f5] `}>
      <div className="w-full justify-between 800px:flex py-10 block">
        <div className="w-full 800px:w-[25%] bg-white rounded-md shadow-sm overflow-y-scroll sticky top-0 left-0 z-10 h-[90vh]">
          <ShopInfo isOwner={true} />
        </div>
        <div className="w-[72%] rounded-md shadow-sm ">
          <ShopProfileData isOwner={true} />
        </div>
      </div>
    </div>
  );
};
export default ShopHomePage;
