import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const newForm = new FormData();
    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);

    axios
      .post(`${server}/user/create-user`, newForm, config)
      .then((res) => {
        toast.success(res.data.message);
        setAvatar(null);
        setEmail("");
        setName("");
        setPassword("");
        if (res.data.success === true) {
          navigate("/");
        }
      })
      .catch((err) => {
        toast.error(err.res.data.message);
      });
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-3 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm: w-full sm:max-w-md">
        <h2 className="my-5 text-center text-4xl font-bold text-gray-900">
          {" "}
          Register as a new user
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-[18px] font-medium text-gray-700"
              >
                Full Names
              </label>

              <div className="my-1">
                <input
                  type="text"
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
                className=" group relative w-full h-10 flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 outline-none"
              >
                Submit
              </button>
            </div>

            <div className={`${styles.normalFlex} w-full`}>
              <h4 className="text-md font-medium text-gray-800">
                Already have an account ?
              </h4>
              <Link to="/login-user" className="font-medium text-blue-500 ml-2">
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
export default SignUp;
