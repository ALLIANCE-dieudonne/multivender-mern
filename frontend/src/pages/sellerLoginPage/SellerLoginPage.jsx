
import { useSelector } from "react-redux";
import SellerLogin from "../../components/shop/SellerLogin";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { isSeller, isLoading } = useSelector((state) => state.seller);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSeller) {
      navigate(`/dashboard`);
    }
  },[isSeller, isLoading]);
  return (
    <div>
      <SellerLogin />
    </div>
  );
};
export default LoginPage;
