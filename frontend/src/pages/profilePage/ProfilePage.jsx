import Header from "../../components/layout/Header";
import styles from "../../styles/styles";
import ProfileSidebar from "../../components/profile/ProfileSidebar";
import ProfileContent from "../../components/profile/ProfileContent";
import { useState } from "react";
import { Outlet } from "react-router-dom";



const ProfilePage = () => {
  const [active, setActive] = useState(1);
  return (
    <div>
      <Header />
      <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
        <div className=" w-[50px] 800px:w-[300px] items-center justify-center flex">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>

        {/* <ProfileContent active={active} setActive={setActive} /> */}
        <Outlet/>
      </div>
    </div>
  );
};
export default ProfilePage;