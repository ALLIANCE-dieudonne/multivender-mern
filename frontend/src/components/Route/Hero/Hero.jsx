import styles from "../../../styles/styles";
import {Link} from "react-router-dom"

const Hero = () => {
  return (
    <div
      className={` ${styles.normalFlex}  relative min-h-[70vh] 800px:min-h-[100vh] w-full bg-no-repeat`}
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div className={`ml-10  w-[90%] 800px:w-[60%]`}>
        <h1 className="text-[30px] 800px:text-[60px] font-[600] leading-[1.2] capitalize text-[#3d3a3a]">
          Best collection for <br /> your hone decoration
        </h1>

        <p className="p-5 text-[16px] font-[400] font-[poppins] leading-[1.5] ">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita
          sunt ab debitis aspernatur fugit officia, atque eum neque quis
          corrupti qui tenetur tempore vero nisi cum, harum quasi. Explicabo
          reiciendis ipsa impedit voluptates eaque exercitationem accusamus
          esse. Eius, nisi deleniti?
        </p>

        <div className="w-3">
          <Link to="/products">
            <div
              className={`${styles.button} items-center text-center justify-center mt-5`}
            >
              <span className="text-[#fff] text-[18px] font-[500]">
                Buy now
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Hero