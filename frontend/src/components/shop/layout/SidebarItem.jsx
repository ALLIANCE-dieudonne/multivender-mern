import { Link, useLocation } from "react-router-dom";
import { sidebarItems } from "../../../static/data";

const SidebarItem = () => {
  const location = useLocation();

  return (
    <>
      {sidebarItems.map((item, index) => {
        const { name, icon, link } = item;

        return (
          <div
            className={` w-[90%] flex items-center 800px:m-3 mt-3 z-10 ${
              link === location.pathname ? "text-[green]" : ""
            }`}
            key={index}
          >
            <Link to={link} className="w-full flex items-center">
              <div className="flex">
                <span className="ml-3 text-[30px]">{icon}</span>
                <h5 className="pl-2 text-[18px] font-400 800px:flex hidden">
                  {name}
                </h5>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default SidebarItem;
