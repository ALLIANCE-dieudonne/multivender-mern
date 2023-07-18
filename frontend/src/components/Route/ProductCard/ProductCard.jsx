import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import {
  AiFillStar,
  AiOutlineHeart,
  AiOutlineEye,
  AiOutlineShoppingCart,
  AiFillHeart,
  AiOutlineStar,
} from "react-icons/ai";
import ProductDetailsCard from "../productDetailsCard/ProductDetailsCard";
import { backend_url } from "../../../server";
import {
  removeFromWishlist,
  addToWishlist,
} from "../../../redux/actions/wishlist";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/actions/cart";
import Rating from "../../products/Rating";

const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);

  const handleAddToCart = (data) => {
    const existItem = cart && cart.find((i) => i._id === data._id);
    if (existItem) {
      toast.error("Cart Exists!");
    } else {
      const cartData = { ...data, qty: 1 };
      dispatch(addToCart(cartData)).then(() =>
        toast.success("Cart Added successfully!")
      );
    }
  };

  const handleRemoveFromWishlist = (data) => {
    setClick((prev) => !prev);
    dispatch(removeFromWishlist(data));
  };

  const handleAddToWishlist = (data) => {
    setClick((prev) => !prev);
    dispatch(addToWishlist(data));
  };
  useEffect(() => {
    const existItem = wishlist && wishlist.find((i) => i._id === data._id);
    if (existItem) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const d = data.name;
  const product_name = d.replace(/\s+/g, "-");
  return (
    <div className="w-full 800px:h-[320px] h-[400px] p-4 bg-white rounded-lg cursor-pointer relative shadow-sm object-contain">
      <div className="flex justify-end">
        {click ? (
          <AiFillHeart
            size={25}
            className="mb-2 cursor-pointer absolute right-1 "
            onClick={() => handleRemoveFromWishlist(data)}
            color={click ? "red" : "#333"}
            title="remove from white list"
          />
        ) : (
          <AiOutlineHeart
            size={25}
            className="mb-2 cursor-pointer absolute right-1"
            onClick={() => handleAddToWishlist(data)}
            color={click ? "red" : "#333"}
            title="remove from white list"
          />
        )}

        <AiOutlineEye
          size={25}
          className=" absolute top-12 right-1"
          onClick={() => setOpen((prev) => !prev)}
          title="Quick view"
          color="#333"
        />
        <AiOutlineShoppingCart
          size={25}
          onClick={() => handleAddToCart(data)}
          title="add to cart"
          color="#333"
          className="absolute top-20 right-1"
        />
        {open ? (
          <ProductDetailsCard
            open={open}
            setOpen={setOpen}
            data={data}
            handleAddToWishlist={handleAddToWishlist}
            handleRemoveFromWishlist={handleRemoveFromWishlist}
            click={click}
            setClick={setClick}
          />
        ) : null}
      </div>

      <Link to={`/product/${data._id}`}>
        <img
          crossorigin="anonymous"
          src={`${backend_url}/${data.images && data.images[0]}`}
          alt="product image"
          className="w-[85%] 800px:h-[150px] h-[200px] object-contain mb-2 rounded-lg"
        />
      </Link>

      <Link to="/">
        <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
      </Link>

      <Link to={`/product/${product_name}`}>
        <h4 className=" font-[500]">
          {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
        </h4>
      </Link>

      <div className="w-full">
        <Rating rating={data?.ratings} />
      </div>

      <div className="py-2 flex items-center justify-between">
        <div className="flex">
          <h5 className={`${styles.productDiscountPrice}`}>
            {data.orginalPrice === 0 ? data.orginalPrice : data.discountPrice} $
          </h5>

          <h4 className={`${styles.price}`}>
            {data.orginalPrice ? data.orginalPrice + "$" : null}
          </h4>
        </div>

        <span className="font-[500] text-[17px] text-[#68d284]">
          {data.sold_out ? data.sold_out : null} sold
        </span>
      </div>
    </div>
  );
};
export default ProductCard;
