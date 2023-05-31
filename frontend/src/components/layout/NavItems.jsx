import { Link } from "react-router-dom"
import { navItems } from "../../static/data"
import styles from "../../styles/styles"

const NavItems = ({active}) => {
  return (
    <div className={`block 800px:${styles.normalFlex} `}>
      {navItems &&
        navItems.map((item, index) => (
          <div className="flex" key={index}>
            <Link
              to={item.url}
              className={`${
                active === index + 1 ? "text-[#17dd17]" : "text-black 800px:text-[#fff]"
              } font-[500] cursor-pointer pt-4 ml-5  800px:p-6 text-lg`}
            >
              {item.title}
            </Link>
          </div>
        ))}
    </div>
  );
}
export default NavItems