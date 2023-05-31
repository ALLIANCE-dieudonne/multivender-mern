import Lottie from "react-lottie";
import animationData from "../../Assets/animations/24151-ecommerce-animation (1).json";
const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="w-full h-screen items-center justify-center">
      {" "}
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};
export default Loader;
