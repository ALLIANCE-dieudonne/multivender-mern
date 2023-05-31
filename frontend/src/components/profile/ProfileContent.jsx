import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import { AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import styles from "../../styles/styles";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { AiOutlineArrowRight } from "react-icons/ai";
import { MdOutlineTrackChanges } from "react-icons/md";

const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState();
  const [zipCode, setZipCode] = useState();
  const [adress1, setAdress1] = useState("");
  const [adress2, setAdress2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-full ml-4">
       {/* profile  */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                crossorigin="anonymous"
                src={`${backend_url}${user?.avatar}`}
                alt="profile"
                className="800px:mt-0 mt-5 w-[80px] h-[80px] 800px:w-[100px] 800px:h-[100px] rounded-full object-cover border border-[green]"
              />

              <div className="bg-[#e3e9ee] rounded-full w-[25px] h-[25px] absolute bottom-1 right-1 flex items-center justify-center cursor-pointer">
                <AiOutlineCamera />
              </div>
            </div>
          </div>

          <br />

        <div className="w-full px-5 ">
            <form onClick={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex pb-3">
               <div className=" 800px:w-[50%] ">
                 <label htmlFor="names" className="font-medium">
                   Full Names
                 </label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mt-2`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <label htmlFor="email" className="font-medium">
                    Email
                  </label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mt-2`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

              <label htmlFor="phone" className="font-medium">
                  Phone Number
              </label>
              <input
                type="number"
                className={`${styles.input} !w-[95%] mt-2`}                 required                 value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="800px:w-[50%]">
                  <label htmlFor="zip code" className="font-medium">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mt-2`}
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                  <label htmlFor="adress" className="font-medium">
                    Adress1
                  </label>
                  <input
                    type="adress"
                    className={`${styles.input} !w-[95%] mt-2`}
                    required
                    value={adress1}
                    onChange={(e) => setAdress1(e.target.value)}
                  />
                  <label htmlFor="adress 2" className="font-medium">
                    Adress2
                  </label>
                  <input
                    type="adress"
                    className={`${styles.input} !w-[95%] mt-2`}
                    required
                    value={adress2}
                    onChange={(e) => setAdress2(e.target.value)}
                  />
                </div>
              </div>

              <input
                type="submit"
                className="w-40 rounded-md h-10 border border-blue-500 cursor-pointer flex text-center justify-center font-medium text-[#3a24db] text-4 hover:bg-blue-100 hover:text-black"
                value="Update"
              />
            </form>
          </div>
        </>
      )}

     {/* Order  */}
       {active === 2 && (
        <div className="">
          <AllOrders />
        </div>
      )}
      {/* Refund  */}
      {active === 3 && (
        <div className="">
          <AllRefundOrders />
        </div>
      )}
      {/* track orders  */}
      {active === 5 && (
        <div className="">
          <TrackOrders />
        </div>
      )}
      {/* payment methods  */}
      {active === 6 && (
        <div className="">
          <PaymentMethod />
        </div>
      )}
      {/* adress  */}
       {active === 7 && (
        <div className="">
          <Address />
        </div>
      )}

    </div>
   
  );
};
export default ProfileContent;


const AllOrders = () => {
  const orders = [
    {
      _id: "45",
      orderItems: [
        {
          name: "Iphone14 prom max",
        },
      ],
      totalPrice: 120,
      orderStatus: "processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$" + item.totalPrice,
        status: item.orderStatus,
      });
    });
  return (
    <div className="mt-10">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};
const AllRefundOrders = () => {
  const orders = [
    {
      _id: "45",
      orderItems: [
        {
          name: "Iphone14 prom max",
        },
      ],
      totalPrice: 120,
      orderStatus: "processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$" + item.totalPrice,
        status: item.orderStatus,
      });
    });
  return (
    <div className="mt-10">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const TrackOrders = () => {
  const orders = [
    {
      _id: "45",
      orderItems: [
        {
          name: "Iphone14 prom max",
        },
      ],
      totalPrice: 120,
      orderStatus: "processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 130,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <MdOutlineTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$" + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="mt-10">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const PaymentMethod = () => {
  return (
    <div className="w-full p-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] "> Payment Methods</h1>

        <div className={`${styles.button}`}>
          <span className="text-white font-medium text-[17px]">Add New</span>
        </div>
      </div>

      <div className="w-full bg-white h-[60px] rounded-md mt-4 shadow-md items-center flex justify-between">
        <div className="flex items-center">
          <img src="" alt="" />

          <h5 className="font-[500] text-[18px] px-2 ">silver seeker</h5>
        </div>

        <div className="flex items-center pr-2 ">
          <h6 className="text-[16px] font-[500] ">123***** **</h6>
          <h5 className="font-[500] px-3">03/06</h5>
        </div>

        <div className="pr-8 items-center">
          <AiOutlineDelete
            size={25}
            className="cursor-pointer hover:text-red-500"
          />
        </div>
      </div>
    </div>
  );
};
const Address = () => {
  return (
    <div className="w-full p-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] "> My Adress</h1>

        <div className={`${styles.button}`}>
          <span className="text-white font-medium text-[17px]">Add New</span>
        </div>
      </div>

      <div className="w-full bg-white h-[60px] rounded-md mt-4 shadow-md items-center flex justify-between">
        <div className="flex items-center">
          <h5 className="font-[500] text-[18px] px-2 ">Default</h5>
        </div>

        <div className="flex items-center pr-2 ">
          <h6 className="text-[16px] font-[500] ">
            456 kigali rwanda, Gogos road
          </h6>
        </div>

        <div className="flex items-center pr-2 ">
          <h6 className="text-[16px] font-[500] ">(234) 568-67</h6>
        </div>

        <div className="pr-8 items-center">
          <AiOutlineDelete
            size={25}
            className="cursor-pointer hover:text-red-500"
          />
        </div>
      </div>
    </div>
  );
};



