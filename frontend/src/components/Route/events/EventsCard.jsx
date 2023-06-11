import { backend_url } from "../../../server";
import styles from "../../../styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";

const EventsCard = ({ active, data }) => {
  console.log(data)

  return (
    <div
      className={`w-full block rounded-md bg-white lg:flex p-2 ${
        active ? "unset" : "mb-12"
      }`}
    >
      <div className=" w-full lg:w-[50%] m-5">
        <img
          crossorigin="anonymous"
          src={`${backend_url}${data.images && data.images[0]}`}
          alt=""
          className="w-[50%] rounded-md "
        />
      </div>
      <div className="w-full lg:w-[50%] justify-center flex flex-col mr-5">
        <div className={`${styles.productTitle} mb-3`}>{data.name}</div>
        <p>{data.description}</p>
        <div className="flex justify-between py-3">
          <div className="flex  gap-5 ">
            <h1 className="font-[500] text-[#f14a4a] line-through text-[18px]">
              {data.orginalPrice}
            </h1>

            <h1 className="text-[20px] font-bold font-Roboto  text-[#333]">
              {data.discountPrice}
            </h1>
          </div>

          <span className="font-[500] text-[20px] text-green-400 mr-3">
            120 Sold
          </span>
        </div>
        <CountDown />.
        <div className={`${styles.button} text-white`}>
          <Link to={`/shop/${data.shopId}`}>
            <h4>Buy now</h4>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default EventsCard;
