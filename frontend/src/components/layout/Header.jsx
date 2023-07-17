import { useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { categoriesData, productData } from "../../static/data";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoArrowForwardOutline } from "react-icons/io5";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";
import DropDown from "./DropDown";
import NavItems from "./NavItems";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import Cart from "../cart/Cart.jsx";
import Wishlist from "../wishlist/Wishlist.jsx";
import { RxCross1 } from "react-icons/rx";


const Header = ({ activeHeading }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropdown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const allProducts  = useSelector((state) => state.product.allproducts)
  const {cart} =useSelector((state) => state.cart);
  const {wishlist} =useSelector((state) => state.wishlist);
  

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts
        .filter(
          (product) =>
            term && product.name.toLowerCase().includes(term.toLowerCase())
        )
        .sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();

          if (
            nameA.startsWith(term.toLowerCase()) &&
            !nameB.startsWith(term.toLowerCase())
          ) {
            return -1;
          }
          if (
            !nameA.startsWith(term.toLowerCase()) &&
            nameB.startsWith(term.toLowerCase())
          ) {
            return 1;
          }
          return 0;
        });

    setSearchData(filteredProducts);
  };

  const handleBlur = () => {
    // e.preventDefault();
    setSearchData(null);
    setSearchTerm("");
    // setOpen(false)
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-5 800px:flex  justify-between items-center">
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt="logo"
              />
            </Link>
          </div>

          {/* search bar */}
          <div className="w-[50%] relative ">
            <input
              type="text"
              placeholder="Search Products..."
              className="w-full py-1.5 rounded-xl px-2 border-2 border-[#3967db] "
              value={searchTerm}
              onChange={handleSearch}
            />
            <AiOutlineSearch
              size={20}
              className="absolute right-4 top-2.5 cursor-pointer"
            />

            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((item, index) => {
                    const d = item.name;
                    const product_name = d.replace(/\s+/g, "-");

                    return (
                      <Link
                        to={`/product/${item._id}`}
                        key={index}
                        onClick={handleBlur}
                      >
                        <div className="w-full flex items-start py-3 ">
                          <img
                            crossOrigin="anonymous"
                            src={`${backend_url}${
                              item.images && item.images[0]
                            }`}
                            alt="product-mage"
                            className="w-10 h-10 mr-2.5 rounded-md"
                          />
                          <h1>{item.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          {/* become a seller */}
          <div className={`${styles.button}`}>
            <Link to="/shop-create">
              <h1 className="text-[#fff] flex  items-center">
                Become Seller <IoArrowForwardOutline className="ml-1.5" />
              </h1>
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 z-50" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[60px]`}
      >
        <div
          className={`${styles.section} relative ${styles.normalFlex} justify-between`}
        >
          {/* categories */}

          <div
            onClick={() => {
              setDropdown((prev) => !prev);
            }}
          >
            <div className="relative h-[50px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-3" />

              <button className="h-full w-full items-center justify-between bg-white rounded-t-md font-[500] text-lg pr-12 select-none">
                All categories
              </button>
              {dropDown ? (
                <IoIosArrowUp
                  size={25}
                  className="absolute top-3.5 right-4 cursor-pointer"
                />
              ) : (
                <IoIosArrowDown
                  size={25}
                  className="absolute top-3.5 right-4 cursor-pointer"
                  // onClick={() => setDropdown((prev) => !prev)}
                />
              )}
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropdown={setDropdown}
                />
              ) : null}
            </div>
          </div>

          {/* navigation items*/}
          <div className={`${styles.normalFlex}`}>
            <NavItems active={activeHeading} />
          </div>

          <div className={`${styles.normalFlex}`}>
            <div
              className="relative cursor-pointer mr-[15px]"
              onClick={() => setOpenWishlist(true)}
            >
              <AiOutlineHeart size={30} color="#fff" />
              <span className="absolute rounded-full right-0 top-0 bg-[#3bc177] w-4 h-4 p-0 m-0 text-white text-[12px] text-center leading-tight font-medium  ">
                {wishlist && wishlist.length}
              </span>
            </div>
            <div
              className="relative cursor-pointer mr-[15px] "
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} color="#fff" />
              <span className="absolute rounded-full right-0 top-0 bg-[#3bc177] w-4 h-4 p-0 m-0 text-white text-[12px] text-center leading-tight font-medium  ">
                {cart && cart.length}
              </span>
            </div>

            <div className="relative cursor-pointer ">
              {isAuthenticated ? (
                <Link to="/profile">
                  <img
                    crossorigin="anonymous"
                    src={`${backend_url}${user?.avatar}`}
                    alt="profile"
                    className="w-[30px] h-[30px] rounded-full"
                  />
                </Link>
              ) : (
                <Link to="/login-user">
                  <VscAccount size={25} color="#fff" />
                </Link>
              )}
            </div>

            {/* ShoppingCart popup */}

            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {/* wishlist popup */}

            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>

      {/* mobile header */}

      <div className="w-full h-[50px] fixed z-50 bg-[#fff] top-0 left-0 shadow-sm 800px:hidden ">
        <div className="w-full items-center justify-between flex">
          <div className="">
            <BiMenuAltLeft
              size={35}
              className="ml-4 mt-2"
              onClick={() => setOpen(true)}
            />
          </div>

          <div className="mt-2">
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt="logo"
              />
            </Link>
          </div>

          <div className="mr-5 flex">
            <AiOutlineShoppingCart size={30} />
            <span className="absolute rounded-full right-4 top-1.5 bg-[#3bc177] w-4 h-4 p-0 m-0 text-white text-[12px] text-center leading-tight font-medium  ">
              {cart && cart.length}
            </span>
          </div>
        </div>

        <div className="w-full bg-white pt-2 "></div>

        {/* mobile sidebar */}
        {open && (
          <div className="w-full bg-[#0000005f]  h-screen top-0 left-0 transition duration-300 ease-in-out">
            <div className="w-[70%] bg-white fixed top-0 left-0  h-screen ">
              <div className="w-full justify-between flex ">
                <div className="relative p-3 ">
                  <AiOutlineHeart size={30} />
                  <span className="absolute rounded-full  top-3 right-2 bg-[#3bc177] w-4 h-4 p-0 m-0 text-white text-[12px] text-center leading-tight font-medium  ">
                    0
                  </span>
                </div>
                <div className="relative p-3">
                  <RxCross1 size={25} onClick={() => setOpen(false)} />
                </div>
              </div>

              <hr />
              <div className="w-[90%] relative mx-auto mt-5">
                <input
                  type="search"
                  placeholder="Search Products..."
                  className="w-full py-1.5 rounded-xl px-2 border-2 border-[#3967db] "
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <AiOutlineSearch
                  size={20}
                  className="absolute right-4 top-2.5 cursor-pointer"
                />

                {searchData && searchData.length !== 0 ? (
                  <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                    {searchData &&
                      searchData.map((item, index) => {
                        const d = item.name;
                        const product_name = d.replace(/\s+/g, "-");

                        return (
                          <Link
                            to={`/product/${item._id}`}
                            key={index}
                            onClick={() => handleBlur()}
                          >
                            <div className="w-full flex items-start py-3">
                              <img
                                crossOrigin="anonymous"
                                src={`${backend_url}${
                                  item.images && item.images[0]
                                }`}
                                alt="product-mage"
                                className="w-10 h-10 mr-2.5 pt-4 rounded-md"
                              />
                              <h1>{item.name}</h1>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                ) : null}
              </div>

              <NavItems active={activeHeading} />
              <div className={`${styles.button} ml-5`}>
                <Link to="/shop-create">
                  <h1 className="text-[#fff] flex  items-center">
                    Become Seller <IoArrowForwardOutline className="ml-1.5" />
                  </h1>
                </Link>
              </div>

              {isAuthenticated ? (
                <Link to="/profile">
                  <img
                    crossorigin="anonymous"
                    src={`${backend_url}${user?.avatar}`}
                    alt="profile"
                    className="w-[50px] h-[50px] rounded-full mx-auto mt-20"
                  />
                </Link>
              ) : (
                <div className="flex items-center justify-center mt-10 font-[500] text-[18px] text-[#000000b7]">
                  <Link to="/login-user">Login</Link>
                  <Link to="/sign-up">/SignUp</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Header;
