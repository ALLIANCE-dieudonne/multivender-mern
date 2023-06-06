
import SingleProfileItem from "./SingleProfileItem";
const ProfileSidebar = ({ active, setActive }) => {
  return (
    <div className="w-full bg-white shadow-sm rounded-lg p-4 mt-8">
      <SingleProfileItem />
    </div>
  );
};

export default ProfileSidebar;
