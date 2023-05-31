import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SellerProtectedRoute = ({ children }) => {
  const { seller, isSeller, isLoading } = useSelector((state) => state.seller);
  if (isLoading === false) {
    if (!isSeller) {
      return <Navigate to={`/login-seller`} replace />;
    }
  }

  return children;
};

export default SellerProtectedRoute;
