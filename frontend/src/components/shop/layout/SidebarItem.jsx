import { Link } from "react-router-dom";
import { useState } from "react";
import { sidebarItems } from "../../../static/data";

const SidebarItem = () => {
  const [active, setActive] = useState();
  const [selectedItem, setSelectedItem] = useState("");

  return (
    <>
      {sidebarItems.map((item, index) => {
        const { name, icon, link } = item;

        return (
          <div className="w-full flex items-center pt-4 z-10" key={index}>
            <Link
              to={link}
              className="w-full flex items-center"
              onClick={() => {
                setActive(1);
                setSelectedItem(name);
              }}
            >
              <div
                className={`${
                  active === 1 && name === selectedItem ? "text-[green]" : ""
                } flex`}
              >
                <span className="ml-3 text-[30px]">{icon}</span>
                <h5
                  className={`pl-2 text-[18px] font-400 800px:flex hidden${
                    active === 1 && name === selectedItem
                      ? "text-[green] 800px:flex hidden"
                      : ""
                  }`}
                >
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
