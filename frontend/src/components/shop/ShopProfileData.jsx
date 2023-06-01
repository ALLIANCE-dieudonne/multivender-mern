import { useState } from "react";

const ShopProfileData = ({ isOwner }) => {
  const [active, setActive] = useState(1);
  return (
    <>
      <div className="w-full items-center justify-between flex p-4 ">
        <div className="flex items-center" onClick={() => setActive(1)}>
          <h5
            className={`font-[500] text-[18px] cursor-pointer ${
              active === 1 ? "text-[green]" : "#000000a6"
            }`}
          >
            Shop Products
          </h5>
        </div>
        <div className="flex items-center" onClick={() => setActive(2)}>
          <h5
            className={`font-[500] text-[18px] cursor-pointer ${
              active === 2 ? "text-[green]" : "#000000a6"
            }`}
          >
            Running Events{" "}
          </h5>
        </div>
        <div className="flex items-center" onClick={() => setActive(3)}>
          <h5
            className={`font-[500] text-[18px] cursor-pointer ${
              active === 3 ? "text-[green]" : "#000000a6"
            }`}
          >
            Shop Reviews
          </h5>
        </div>
      </div>
      <hr/>
      
    </>
  );
};
export default ShopProfileData;
