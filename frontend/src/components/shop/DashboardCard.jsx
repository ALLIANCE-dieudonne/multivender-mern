const DashboardCard = ({title, count, subtitile, icon}) => {
  return (
    <div className="w-[30%] h-[140px] bg-white shadow-md m-2 rounded-md items-center  flex flex-col cursor-pointer">
      <div className="w-full flex items-center">
        <span className="text-[25px] m-3"> {icon}</span>

        <h3 className="text-[#504f4f] text-[17px]">{title}</h3>
      </div>
      <h4 className="text-[22px] font-[500]">{count}</h4>
      <div className="w-full">
        <h5 className="ml-3 mt-2 font-[400] text-[18px] text-blue-600">
          {subtitile}
        </h5>
      </div>
    </div>
  );
};
export default DashboardCard;
