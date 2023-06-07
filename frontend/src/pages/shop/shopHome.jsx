import styles from "../../styles/styles";
import ShopInfo from "../../components/shop/ShopInfo";
import ShopProfileData from "../../components/shop/ShopProfileData";

const ShopHomePage = () => {
  return (
    <div className={`${styles.section} bg-[#f5f5f5] `}>
      <div className="w-full justify-between 800px:flex py-10 block">
        <div className="w-full 800px:w-[25%] bg-white rounded-md shadow-sm 800px:overflow-y-scroll 800px:sticky top-0 left-0 z-10 800px:h-[90vh] h-full">
          <ShopInfo isOwner={true} />
        </div>
        <div className="800px:w-[72%] w-full rounded-md shadow-sm ">
          <ShopProfileData isOwner={true} />
        </div>
      </div>
    </div>
  );
};
export default ShopHomePage;
