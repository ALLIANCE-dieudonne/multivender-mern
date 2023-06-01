import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../server";
import SingleProfileItem from "./SingleProfileItem";
const ProfileSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();


  return (
    <div className="w-full bg-white shadow-sm rounded-lg p-4 mt-8">
      <SingleProfileItem />

    </div>
  );
};

export default ProfileSidebar;


