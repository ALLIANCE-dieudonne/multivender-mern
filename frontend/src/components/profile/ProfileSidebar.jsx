import { useNavigate } from "react-router-dom";
import { RxPerson } from "react-icons/rx";
import { HiOutlineShoppingCart, HiOutlineReceiptRefund } from "react-icons/hi";
import { AiOutlineMessage, AiOutlineLogout } from "react-icons/ai";
import { MdOutlineTrackChanges } from "react-icons/md";
import { BsCreditCard } from "react-icons/bs";
import { TbAddressBook } from "react-icons/tb";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../server";
const ProfileSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/login-user");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="w-full bg-white shadow-sm rounded-lg p-4 mt-10">
      <div
        className="flex items-center cursor-pointer w-full 800px:p-0 pb-3"
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "green" : ""} />
        <span
          className={`pl-3 ${
            active === 1 ? "text-[green]" : ""
          } font-medium text-[17px] 800px:block hidden`}
        >
          Person
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full 800px:p-0 pb-3"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingCart size={20} color={active === 2 ? "Green" : ""} />
        <span
          className={`p-3 ${
            active === 2 ? "text-[green]" : ""
          } font-medium text-[17px] 800px:block hidden`}
        >
          Orders
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full 800px:p-0 pb-3"
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund size={20} color={active === 3 ? "Green" : ""} />
        <span
          className={`p-3 ${
            active === 3 ? "text-[Green]" : ""
          } font-medium text-[17px] 800px:block hidden`}
        >
          Refunds
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full 800px:p-0 pb-3"
        onClick={() => setActive(4)}
      >
        <AiOutlineMessage size={20} color={active === 4 ? "Green" : ""} />
        <span
          className={`p-3 ${
            active === 4 ? "text-[Green]" : ""
          } font-medium text-[17px] 800px:block hidden`}
        >
          Inbox
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full 800px:p-0 pb-3"
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges size={20} color={active === 5 ? "Green" : ""} />
        <span
          className={`p-3 ${
            active === 5 ? "text-[Green]" : ""
          } font-medium text-[17px] 800px:block hidden`}
        >
          Track Order
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full 800px:p-0 pb-3"
        onClick={() => setActive(6)}
      >
        <BsCreditCard size={20} color={active === 6 ? "Green" : ""} />
        <span
          className={`p-3 ${
            active === 6 ? "text-[Green]" : ""
          } font-medium text-[17px] 800px:block hidden`}
        >
          Payment Methods
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full 800px:p-0 pb-3"
        onClick={() => setActive(7)}
      >
        <TbAddressBook size={20} color={active === 7 ? "Green" : ""} />
        <span
          className={`p-3 ${
            active === 7 ? "text-[Green]" : ""
          } font-medium text-[17px] 800px:block hidden`}
        >
          Adress
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full 800px:p-0 pb-3"
        onClick={() => {
          setActive(8);
          logoutHandler();
        }}
      >
        <AiOutlineLogout size={20} color={active === 8 ? "Green" : ""} />
        <span
          className={`p-3 ${
            active === 8 ? "text-[Green]" : ""
          } font-medium text-[17px] 800px:block hidden `}
        >
          Log Out
        </span>
      </div>
    </div>
  );
};
export default ProfileSidebar;
