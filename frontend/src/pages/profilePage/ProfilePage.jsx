import Header from "../../components/layout/Header";
import styles from "../../styles/styles";
import ProfileSidebar from "../../components/profile/ProfileSidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/layout/Footer";



const ProfilePage = () => {
  const [active, setActive] = useState(1);
  return (
    <div>
      <Header />
      <div className={`${styles.section} flex bg-[#f5f5f5] pb-5`}>
        <div className=" w-[50px] 800px:w-[300px] items-center justify-center flex">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>
        <Outlet/>
      </div>
      <Footer/>
    </div>
  );
};
export default ProfilePage;
