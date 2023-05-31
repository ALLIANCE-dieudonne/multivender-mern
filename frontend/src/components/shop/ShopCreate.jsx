import { useReducer, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";

const ShopCreate = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNummber, setPhoneNumber] = useState();
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState();
  const [avatar, setAvatar] = useState();
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const newForm = new FormData();
    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);
    newForm.append("address", address);
    newForm.append("zipCode", zipCode);
    newForm.append("phoneNumber", phoneNummber);

    axios
      .post(`${server}/shop/shop-create`, newForm, config)
      .then((res) => {
        toast.success(res.data.message);
        if (res.data.success === true) {
          navigate("/");
        }
      })
      .catch((err) => {
        toast.error(err.res.data.message);
        setAddress("");
        setAvatar();
        setEmail("");
        setName("");
        setPassword("");
        setPhoneNumber();
        setZipCode();
      });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-3 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mb-6 text-center text-4xl font-bold text-gray-900 mt-5">
          {" "}
          Register as a new seller
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[35rem]">
        <div className="mx-5 rounded-md my-2 800px:my-0 800px:mx-0 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-[18px] font-medium text-gray-700"
              >
                Shop Name
              </label>

              <div className="my-1">
                <input
                  type="name"
                  name="name"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-50 focus:border-blue-500 sm: text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-[18px] font-medium text-gray-700"
              >
                Phone Number
              </label>

              <div className="my-1">
                <input
                  type="phone"
                  name="phone-number"
                  autoComplete="phone"
                  required
                  value={phoneNummber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-50 focus:border-blue-500 sm: text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-[18px] font-medium text-gray-700"
              >
                Address
              </label>

              <div className="my-1">
                <input
                  type="address"
                  name="address"
                  autoComplete="address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-50 focus:border-blue-500 sm: text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="zipCode"
                className="block text-[18px] font-medium text-gray-700"
              >
                Zip Code
              </label>

              <div className="my-1">
                <input
                  type="number"
                  name="zip-code"
                  autoComplete="zip-code"
                  required
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-50 focus:border-blue-500 sm: text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-[18px] font-medium text-gray-700"
              >
                Email adress
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
                htmlFor="password"
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
              <div className="mt-2 flex items-center ">
                <span className=" h-8 w-8 everflow-hidden ">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="avatar"
                      className="w-8 h-8 object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8" />
                  )}
                </span>
                <div>
                  <label
                    htmlFor="file-input"
                    className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 relative"
                  >
                    <span>Upload a photo</span>
                  </label>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </div>
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
                Already have an account ?
              </h4>
              <Link
                to="/login-seller"
                className="font-medium text-blue-500 ml-2"
              >
                {" "}
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ShopCreate;
