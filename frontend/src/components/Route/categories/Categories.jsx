import { brandingData, categoriesData } from "../../../static/data";
import styles from "../../../styles/styles";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate()

  const handleSubmit = (item) =>{
    navigate(`/products?category=${item.title}`)
  }
  return (
    <>
      <div className={`${styles.section} hidden  sm:block `}>
        <div className=" my-12 bg-[#fff]  rounded-md p-5 justify-between w-full shadow-sm sm:flex">
          {brandingData &&
            brandingData.map((item, index) => (
              <div key={index} className="flex flex-start">
                {item.icon}

                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">
                    {item.title}
                  </h3>
                  <small className="text-xs md:text-sm">
                    {item.Description}
                  </small>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className={`${styles.section} bg-white p-6 rounded-lg mb-12 `}>
        <div className="grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-2 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5 xl:gap-8">
          {categoriesData &&
            categoriesData.map((item) => (
              <div
                className="w-full h-25 flex items-center justify-between overflow-hidden cursor-pointer"
                key={item.id}
                onClick={() => handleSubmit(item)}
              >
                <h5 className="text-[18px] leading-[1.3] ">{item.title}</h5>
                <img
                  src={item.image_Url}
                  alt="image"
                  className="w-[100px]  object-cover"
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
export default Categories;
