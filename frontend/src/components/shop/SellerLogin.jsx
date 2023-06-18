import { useReducer, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(
        `${server}/shop/login-seller`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Logged in successfully");
        navigate("/dashboard");
        window.location.reload(true);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-3 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm: w-full sm:max-w-md px-3">
        <h2 className="mb-6 text-center text-4xl font-bold text-gray-900">
          {" "}
          Login to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 mx-5">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-[18px] font-medium text-gray-700"
              >
                Email address
              </label>

              <div className="my-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-50 focus:border-blue-500 sm: text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-[18px] font-medium text-gray-700"
              >
                Password
              </label>

              <div className="my-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-50 focus:border-blue-500 sm: text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 "
                    size={20}
                    cursor="pointer"
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 "
                    size={20}
                    cursor="pointer"
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>

            <div className={`${styles.normalFlex} justify-between`}>
              <div className={`${styles.normalFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me "
                  id="remember-me"
                  className="h-4 w-4 focus: ring-blue-600 rounded text-blue-600"
                />

                <label
                  htmlFor="remember-me"
                  className="text-[16px] font-medium ml-2 block text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className=" group relative w-full h-10 flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
            </div>

            <div className={`${styles.normalFlex} w-full`}>
              <h4 className="text-md font-medium text-gray-800">
                Dont have an account ?
              </h4>
              <Link to="/shop-create" className="font-medium text-blue-500 ml-2">
                {" "}
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
