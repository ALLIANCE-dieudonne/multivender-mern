import Lottie from "react-lottie";
import animationData from "../../Assets/animations/success.json";
const SuccessAnim = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="w-full h-[50vh] items-center justify-center">
      {" "}
      <Lottie options={defaultOptions} height={250} width={300} />
    </div>
  );
};
export default SuccessAnim;
