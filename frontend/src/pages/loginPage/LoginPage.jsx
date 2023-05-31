import { useSelector } from "react-redux";
import Login from "../../components/login/Login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  });
  return (
    <div>
      <Login />
    </div>
  );
};
export default LoginPage;
