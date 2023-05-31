import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/layout/Loader";

const SellerProtectedRoute = ({ children }) => {
  const { isSeller, isLoading } = useSelector((state) => state.seller);
  if (isLoading === true) {
    return <Loader />;
  } else {
    if (!isSeller) {
      return <Navigate to={`/login-seller`} replace />;
    }

    return children;
  }
};

export default SellerProtectedRoute;
