import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineMessage,
} from "react-icons/ai";
import styles from "../../styles/styles";

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(1);
  const navigate = useNavigate();

  const handleMessageSend = () => {
    navigate("/inbox?conversation=567890oihjbvbn");
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const incrementCount = () => {
    setCount(count + 1);
  };
  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w:[90%] 800px:[80%] h-[100%]`}>
          <div className="w-full py-5">
            <div className="block 800px:flex w-full ">
              <div className="w-full 800px:w-[50%] ">
                <img
                  src={data.image_Url[select].url}
                  alt=""
                  className="w-[80%] mt-10 800px:mt-0"
                />
                <div className="w-full flex my-4">
                  <div
                    className={`${select === 0 ? "border" : ""} cursor-pointer`}
                  >
                    <img
                      src={data?.image_Url[0].url}
                      alt="image"
                      className="h-[200px] "
                      onClick={() => setSelect(0)}
                    />
                  </div>
                  <div
                    className={`${select === 1 ? "border" : ""} cursor-pointer`}
                  >
                    <img
                      src={data?.image_Url[1].url}
                      alt="image"
                      className="h-[200px] "
                      onClick={() => setSelect(1)}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full 800px:w-[50%]">
                <h1 className={`${styles.productTitle} pt-5`}>{data.name}</h1>
                <p className="mt-2 text-[17px]">{data.description}</p>
                <div className="mt-3 flex">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discount_price}$
                  </h4>

                  <h3 className={styles.price}>
                    {data.price ? data.price + "$" : ""}
                  </h3>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2  hover:opacity-75 shadow-lg transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>

                    <span className="bg-gray-200 text-gray-900 px-4 py-[9.2px]  font-medium ">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2  hover:opacity-75 shadow-lg transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      {" "}
                      -
                    </button>
                  </div>

                  <div className="m-2 ">
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => setClick((prev) => !prev)}
                        color={click ? "red" : "#333"}
                        title="remove from white list"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className=" cursor-pointer "
                        onClick={() => setClick((prev) => !prev)}
                        color={click ? "red" : "#333"}
                        title="remove from white list"
                      />
                    )}
                  </div>
                </div>
                <div>
                  <span className={`${styles.button} text-white font-[500] `}>
                    Add to cart{" "}
                    <AiOutlineShoppingCart size={20} className="ml-1" />
                  </span>
                </div>

                <div className="flex items-center mt-8">
                  <img
                    src={data.shop.shop_avatar.url}
                    alt="shop image"
                    className="w-[50px] h-[50px] rounded-full mr-3"
                  />
                  <div className="mr-7">
                    <h3 className={`${styles.shop_name}pb-1`}>
                      {data.shop.name}
                    </h3>
                    <h4 className="text-[15px] font-medium">
                      {" "}
                      ({data.shop.ratings}) Ratings
                    </h4>
                  </div>

                  <div className="">
                    <span
                      className={`${styles.button} bg-blue-600 font-medium text-white`}
                      onClick={handleMessageSend}
                    >
                      Send Message{" "}
                      <AiOutlineMessage className="ml-1" size={20} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo data={data} />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);
  return (
    <div className="bg-[#ebedf5]  h-full rounded px-3 800px:px-10 py-5 ">
      <div className="w-full flex justify-between border-b-[2px] py-3 mb-5">
        <div className="relative">
          <h5
            className="font-[500] text-black text-[18px] cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? <div className={`${styles.active_indicator}`} /> : ""}
        </div>
        <div className="relative">
          <h5
            className="font-[500] text-black text-[18px] cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? <div className={`${styles.active_indicator}`} /> : ""}
        </div>
        <div className="relative">
          <h5
            className="font-[500] text-black text-[18px] cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? <div className={`${styles.active_indicator}`} /> : ""}
        </div>
      </div>
      {active === 1 ? (
        <div className="block 800px:flex flex-col gap-3 ">
          <p className=" whitespace-pre-line leading-7">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            laudantium autem ipsa blanditiis quo fuga culpa? Inventore dolore
            accusamus laboriosam iure, amet blanditiis animi? Rerum, pariatur
            commodi. Nesciunt, aliquid itaque.
          </p>

          <p className="whitespace-pre-line leading-7">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora
            doloribus explicabo illum provident quia magni, facere sunt quis
            obcaecati veritatis ducimus sapiente ullam amet minima eveniet et
            aliquam nam tempore!
          </p>
          <p className="whitespace-pre-line leading-7">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora
            doloribus explicabo illum provident quia magni, facere sunt quis
            obcaecati veritatis ducimus sapiente ullam amet minima eveniet et
            aliquam nam tempore!
          </p>
        </div>
      ) : (
        " "
      )}

      {active === 2 ? (
        <>
          <p className="w-full justify-center flex items-center font-[500] text-[17px] min-h-[20vh]">
            No reviews yet!
          </p>
        </>
      ) : (
        ""
      )}

      {active === 3 ? (
        <div className="block 800px:flex w-full">
          <div className=" w-full 800px:w-[50%]">
            <div className="flex items-center">
              <img
                src={data.shop.shop_avatar.url}
                alt=""
                className="w-[50px] h-[50px] rounded-full mr-3"
              />

              <div className="">
                <h3 className={`${styles.shop_name} `}>{data.shop.name}</h3>
                <h4 className="text-[15px] font-medium">
                  ({data.shop.ratings}) Ratings
                </h4>
              </div>
            </div>
            <p className="mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quia
              similique adipisci cum nostrum tenetur ipsa possimus, voluptate
              quam animi nisi ex, a hic, voluptatibus nam repellendus
              consequatur amet itaque?
            </p>
          </div>

          <div className="w-full 800px:w-[50%] 800px:items-end flex flex-col pt-3 lg:pt-0">
            <div className="text-left text-[16px]">
              <h5 className="font-[600]">
                Joined On: <span className="font-[400]">29 04 2023</span>
              </h5>
              <h5 className="font-[600] py-1">
                Total Products: <span className="font-[400]">999</span>
              </h5>
              <h5 className="font-[600]">
                Total Reviews: <span className="font-[400]">29 </span>
              </h5>
              <Link to="/">
            <div className={`${styles.button} text-white font-[500]`}>Visit Shop</div>
              </Link>
            </div>

          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default ProductDetails;
