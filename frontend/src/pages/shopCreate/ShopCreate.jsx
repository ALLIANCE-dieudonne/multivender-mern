import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ShopCreate from "../../components/shop/ShopCreate.jsx";
const Shop = () => {
  const { isSeller, seller } = useSelector((state) => state.seller);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSeller) {
      navigate(`/shop/${seller._id}`);
    }
  });
  return (
    <div>
      <ShopCreate />
    </div>
  );
};
export default Shop;
