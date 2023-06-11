import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

const DropDown = ({ categoriesData, setDropdown }) => {
  const navigate = useNavigate();
  const handleSubmit = (item) => {
    setDropdown(false);
    navigate(`/products?category=${item.title}`);
    window.location.reload();
  };
  return (
    <div className="pb-4 absolute rounded-b-md bg-[#fff] shadow-sm w-full z-30">
      {categoriesData &&
        categoriesData.map((item, index) => (
          <div
            key={index}
            className={`${styles.normalFlex} `}
            onClick={() => handleSubmit(item)}
          >
            <img
              src={item.image_Url}
              alt="category image"
              style={{
                width: "25px",
                height: "25px",
                objectFit: "contain",
                userSelect: "none",
                marginLeft: "1rem",
                cursor: "pointer",
              }}
            />
            <h3 className="m-3 cursor-pointer">{item.title}</h3>
          </div>
        ))}
        
    </div>
  );
};
export default DropDown;
