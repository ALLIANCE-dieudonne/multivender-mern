import { useState } from "react";
import { profileLinks } from "../../static/data";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const SingleProfileItem = () => {
  const [active, setActive] = useState();
  const [selected, setSelected] = useState("");
  const logout = profileLinks[profileLinks.length - 1];
  const navigate = useNavigate();
  const location = useLocation();

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/");
      })
      .catch((err) => toast.error(err.message));
  };
  return (
    <>
      {profileLinks &&
        profileLinks.map((item, index) => {
          const link = item.link;
          const icon = item.icon;
          const name = item.name;

          return (
            <Link
              key={index}
              to={link}
              className={`flex items-center cursor-pointer w-full mb-8 ${
                link === location.pathname ? "text-[green]" : ""
              }`}
              onClick={() => {
                setActive(1);
                setSelected(name);
                if (item.name == "LogOut") {
                  logoutHandler();
                }
              }}
            >
              <div className="flex">
                <span className="text-[25px]">{icon}</span>
                <span
                  className={`pl-3 font-[500] text-[18px]
                   800px:block hidden`}
                >
                  {name}
                </span>
              </div>
            </Link>
          );
        })}{" "}
    </>
  );
};
export default SingleProfileItem;
