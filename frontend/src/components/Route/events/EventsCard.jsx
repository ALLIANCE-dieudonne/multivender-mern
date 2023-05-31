import styles from "../../../styles/styles";
import CountDown from "./CountDown";
const EventsCard = ({active}) => {
  return (
    <div
      className={`w-full block rounded-md bg-white lg:flex p-2 ${
        active ? "unset" : "mb-12"
      }`}
    >
      <div className=" w-full lg:w-[50%]">
        <img src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" alt="" />
      </div>
      <div className="w-full lg:w-[50%] justify-center flex flex-col mr-5">
        <div className={`${styles.productTitle} mb-3`}>
          Iphone 14pro max 8/256g
        </div>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem, cum
          aut! Harum, quos assumenda dicta autem incidunt tempora quidem fugiat,
          expedita voluptate saepe temporibus sequi quam impedit explicabo
          mollitia vitae quaerat quia porro fugit sunt id neque laudantium
          officiis pariatur! Cumque voluptas at eveniet ipsam obcaecati quidem,
          ipsa, ratione repellendus repudiandae tenetur iure alias odit dolor
          vitae, placeat ad aperiam! Vero necessitatibus voluptatibus quod
          nostrum dolorum incidunt enim officia qui debitis maxime maiores
          fugiat harum unde, doloribus blanditiis quam nesciunt.{" "}
        </p>
        <div className="flex justify-between py-3">
          <div className="flex  gap-5 ">
            <h1 className="font-[500] text-[#f14a4a] line-through text-[18px]">
              1099$
            </h1>

            <h1 className="text-[20px] font-bold font-Roboto  text-[#333]">
              999$
            </h1>
          </div>

          <span className="font-[500] text-[20px] text-green-400 mr-3">
            120 Sold
          </span>
        </div>
        <CountDown />.
        <div className={`${styles.button} text-white`}>
          <h4>Buy now</h4>
        </div>
      </div>
    </div>
  );
};
export default EventsCard;
