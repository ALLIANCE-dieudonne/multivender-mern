import { BsFacebook, BsYoutube } from "react-icons/bs";
import { AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai";
import {
  footerProductLinks,
  footerSupportLinks,
  footercompanyLinks,
} from "../../static/data";
import { Link } from "react-router-dom";
const Footer = () => {

  const date = new Date();
  const currentYear = date.getFullYear();
  return (
    <div className="bg-black text-white">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#342ac8] py-5">
        <h1 className="800px:text-[30px] font-[500] text-[20px] m-2">
          <span className="text-green-500">Subscribe</span> to stay connected{" "}
          <br />
          to more events & offers!
        </h1>

        <div className="">
          <input
            type="text"
            placeholder="Enter your email..."
            className="rounded-md py-2  px-5 sm:w-72 w-full lg:mb-0 focus:outline-none text-gray-900 font-[500]"
          />

          <button className="px-3 py-2 rounded-lg 800px:ml-2 font-[500] text-center outline-none bg-green-600 hover:bg-teal-400 mt-2 duration-300">
            Submit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-10  sm:px-8 py-16   px-4 sm:items-start items-center">
        <div className=" text-center sm:text-start ">
          <div>
            <img
              src="https://shopo.quomodothemes.website/assets/images/logo.svg"
              alt="logo"
              style={{ filter: "brightness(0) invert(1)" }}
              className="mb-2 mx-auto sm:mx-0"
            />
          </div>

          <span className="font-[500] text-[17px]">
            Satisfy all your needs
            <br /> Buy and sell in one place
          </span>

          <div className="flex text-[30px]  my-4 cursor-pointer justify-center gap-3 sm:justify-start">
            <BsFacebook size={27} className="hover:text-teal-400" />
            <AiFillTwitterCircle className="hover:text-teal-400" />
            <BsYoutube className="hover:text-teal-400" />
            <AiFillInstagram className="hover:text-teal-400" />
          </div>
        </div>
        <ul className="sm:text-start text-center ">
          <h1 className="font-semibold text-[20px] mb-2 ">Company</h1>
          {footerProductLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.link}
                className="text-gray-400 hover:text-teal-400 "
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="sm:text-start text-center ">
          <h1 className="font-semibold text-[20px] mb-2 ">Shop</h1>
          {footercompanyLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.link}
                className="text-gray-400 hover:text-teal-400 "
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="sm:text-start text-center ">
          <h1 className="font-semibold text-[20px] mb-2 ">Support</h1>
          {footerSupportLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.link}
                className="text-gray-400 hover:text-teal-400 "
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <hr style={{ color:"white" }}/>

      <div className="block sm:flex justify-between mx-10 py-8 ">
        <span className="mb-2">Copyright &copy; {currentYear}.All rights reserved</span>

        <p className="mb-2">Terms.Privacy policy</p>

        <img
          src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
          alt=""
        />
      </div>
    </div>
  );
};
export default Footer;
