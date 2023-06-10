import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import {
  AiFillStar,
  AiOutlineHeart,
  AiOutlineEye,
  AiOutlineShoppingCart,
  AiFillHeart,
} from "react-icons/ai";
import ProductDetailsCard from "../productDetailsCard/ProductDetailsCard";
import { backend_url } from "../../../server";

const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  const d = data.name;
  const product_name = d.replace(/\s+/g, "-");
  return (
    <div className="w-full h-[370px] p-4 bg-white rounded-lg cursor-pointer relative shadow-sm">
      <div className="flex justify-end">
        {click ? (
          <AiFillHeart
            size={25}
            className="mb-2 cursor-pointer absolute right-1 "
            onClick={() => setClick((prev) => !prev)}
            color={click ? "red" : "#333"}
            title="remove from white list"
          />
        ) : (
          <AiOutlineHeart
            size={25}
            className="mb-2 cursor-pointer absolute right-1"
            onClick={() => setClick((prev) => !prev)}
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
          onClick={() => setOpen((prev) => !prev)}
          title="add to cart"
          color="#333"
          className="absolute top-20 right-1"
        />
        {open ? (
          <ProductDetailsCard open={open} setOpen={setOpen} data={data} />
        ) : null}
      </div>

      <Link to={`/product/${data._id}`}>
        <img
          crossorigin="anonymous"
          src={`${backend_url}/${data.images && data.images[0]}`}
          alt="product image"
          className="w-[90%] h-[250px] object-cover mb-2 rounded-lg"
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

      <div className="flex">
        <AiFillStar size={25} className="m-2 cursor-pointer text-yellow-500" />
        <AiFillStar size={25} className="m-2 cursor-pointer text-yellow-500" />
        <AiFillStar size={25} className="m-2 cursor-pointer text-yellow-500" />
        <AiFillStar size={25} className="m-2 cursor-pointer text-yellow-500" />
        <AiFillStar size={25} className="m-2 cursor-pointer text-yellow-500" />
      </div>

      <div className="py-2 flex items-center justify-between">
        <div className="flex">
          <h5 className={`${styles.productDiscountPrice}`}>
            {data.price === 0 ? data.price : data.discountPrice} $
          </h5>

          <h4 className={`${styles.price}`}>
            {data.orginalPrice ? data.orginalPrice + "$" : null}
          </h4>
        </div>

        <span className="font-[500] text-[17px] text-[#68d284]">
          {data.total_sell ? data.total_sell : null} sold
        </span>
      </div>
    </div>
  );
};
export default ProductCard;
