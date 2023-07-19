import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
const WithdrawMoneyPage = () => {
  const { orders } = useSelector((state) => state.order);

  const amount =
    orders && orders.reduce((acc, order) => acc + order.totalPrice, 0);

  const serviceCharge = amount * 0.1;
  const totalAmount = (amount - serviceCharge).toFixed(2);
  console.log(orders);
  return (
    <div className="w-full flex justify-center items-center bg-white m-3">
      <div className="w-full justify-center items-center flex flex-col">
        <h5 className="m-2 text-[18px] font-[400]">
          Available Balance: {totalAmount}$
        </h5>
        <span className={`${styles.button} text-white text-[17px] font-[500]`}>
          Withdraw
        </span>
      </div>
    </div>
  );
};
export default WithdrawMoneyPage;
