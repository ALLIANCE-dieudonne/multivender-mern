import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineMessage,
} from "react-icons/ai";
import styles from "../../styles/styles";
import { backend_url } from "../../server";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cart";
import { addToWishlist } from "../../redux/actions/wishlist";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import Rating from "./Rating";
import { getAllShopProducts } from "../../redux/actions/product";

const ProductDetails = ({ data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { products } = useSelector((state) => state.product);
  const [count, setCount] = useState(1);

  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalReviews =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const averageRating = totalRatings / totalReviews || 0;

  const handleMessageSend = () => {
    navigate("/inbox?conversation=567890oihjbvbn");
  };

  const totalProducts = products && products.length;

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const incrementCount = () => {
    setCount(count + 1);
  };

  const handleAddToCart = (id) => {
    const existItem = cart && cart.find((i) => i._id === id);
    if (existItem) {
      toast.error("cart already exists!");
    } else {
      if (data.stock < count) {
        toast.error("Exceed stock limit!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addToCart(cartData));
        toast.success("cart added successfully!");
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const existItem = wishlist && wishlist.find((i) => i._id === data._id);
    if (existItem) {
      setClick(true);
    }
  });

  useEffect(() => {
    dispatch(getAllShopProducts(data.shop._id));
  }, [dispatch, data]);

  const handleRemoveFromWishlist = (data) => {
    setClick((prev) => !prev);
    dispatch(removeFromWishlist(data));
  };

  const handleAddToWishlist = (data) => {
    setClick((prev) => !prev);
    dispatch(addToWishlist(data));
  };

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%] h-[100%]`}>
          <div className="w-full py-5">
            <div className="block 800px:flex w-full ">
              <div className="w-full 800px:w-[50%]  ">
                <img
                  crossOrigin="anonymous"
                  src={`${backend_url}${
                    data?.images && data?.images[select ? select : 0]
                  }`}
                  alt=""
                  className="800px:w-[70%] mt-10 rounded-md w-[90%] h-[400px]"
                />
                <div className="w-full flex my-4">
                  <div
                    className={`${
                      select === 0 ? "border" : ""
                    } cursor-pointer  mr-2`}
                  >
                    <img
                      crossOrigin="anonymous"
                      src={`${backend_url}${data?.images && data?.images[0]}`}
                      alt="image"
                      className="h-[200px] rounded-md w-[200px]"
                      onClick={() => setSelect(0)}
                    />
                  </div>
                  <div
                    className={`${select === 1 ? "border" : ""} cursor-pointer`}
                  >
                    <img
                      crossOrigin="anonymous"
                      src={`${backend_url}${data?.images && data?.images[1]}`}
                      alt="image"
                      className="h-[200px] rounded-md w-[200px]"
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
                    {data.discountPrice}$
                  </h4>

                  <h3 className={styles.price}>
                    {data.orginalPrice ? data.orginalPrice + "$" : ""}
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
                        onClick={() => handleRemoveFromWishlist(data)}
                        color={click ? "red" : "#333"}
                        title="add to  from whishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className=" cursor-pointer "
                        onClick={() => handleAddToWishlist(data)}
                        color={click ? "red" : "#333"}
                        title="remove from whishlist"
                      />
                    )}
                  </div>
                </div>
                <div>
                  <span
                    className={`${styles.button} text-white font-[500] `}
                    onClick={() => handleAddToCart(data._id)}
                  >
                    Add to cart{" "}
                    <AiOutlineShoppingCart size={20} className="ml-1" />
                  </span>
                </div>

                <div className="flex items-center mt-8">
                  <Link to={`/shop/${data?.shop._id}`}>
                    <img
                      crossOrigin="anonymous"
                      src={`${backend_url}${data?.shop?.avatar}`}
                      alt="shop image"
                      className="w-[50px] h-[50px] rounded-full mr-3"
                    />
                  </Link>

                  <Link to={`/shop/${data?.shop._id}`}>
                    <div className="mr-7">
                      <h3 className={`${styles.shop_name}pb-1`}>
                        {data.shop.name}
                      </h3>
                      <h4 className="text-[15px] font-medium">
                        {" "}
                        {averageRating} /5 <t />
                        {averageRating === 1 ? "Rating" : "Ratings"}
                      </h4>
                    </div>
                  </Link>

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
          <ProductDetailsInfo
            data={data}
            totalReviews={totalReviews}
            averageRating={averageRating}
            totalProducts={totalProducts}
          />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({
  data,
  totalReviews,
  averageRating,
  totalProducts,
}) => {
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
          {data.description}
        </div>
      ) : (
        " "
      )}

      {active === 2 ? (
        <>
          <p className="w-full  text-[17px] min-h-[20vh] ">
            {data && data.reviews.length !== 0 ? (
              data.reviews.map((item, index) => (
                <div className=" w-full p-2" key={index}>
                  <div className="flex">
                    <img
                      src={`${backend_url}/${item?.user?.avatar}`}
                      alt="reviewer profile"
                      crossOrigin="anonymous"
                      className="w-[60px] h-[60px] rounded-full"
                    />
                    <div className="ml-2">
                      <h4 className="font-[500] text-[17px]">
                        {item.user.name}
                      </h4>
                      <span className="p-2">
                        <Rating rating={item?.rating} />
                      </span>
                    </div>
                    <p className="pl-2">{item.comment}</p>
                  </div>
                </div>
              ))
            ) : (
              <h3 className="text-[20px] font-[500]">No reviews yet!</h3>
            )}
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
                crossOrigin="anonymous"
                src={`${backend_url}${data?.shop?.avatar}`}
                alt=""
                className="w-[50px] h-[50px] rounded-full mr-3"
              />

              <div className="">
                <h3 className={`${styles.shop_name} `}>{data.shop.name}</h3>
                <h4 className="text-[15px] font-medium">
                  {" "}
                  {averageRating}/5 Ratings{" "}
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
                Joined On:{" "}
                <span className="font-[400]">
                  {data.shop.createdAt.slice(0, 10)}
                </span>
              </h5>
              <h5 className="font-[600] py-1">
                Total Products:{" "}
                <span className="font-[400]">
                  {totalProducts} {totalProducts === 1 ? "Product" : "Products"}
                </span>
              </h5>
              <h5 className="font-[600]">
                Total Reviews:{" "}
                <span className="font-[400]">
                  {" "}
                  {totalReviews} {totalReviews === 1 ? "Review" : "Reviews"}
                </span>
              </h5>
              <Link to={`/shop/${data.shop._id}`}>
                <div className={`${styles.button} text-white font-[500]`}>
                  Visit Shop
                </div>
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
