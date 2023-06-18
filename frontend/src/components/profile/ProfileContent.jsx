import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import styles from "../../styles/styles";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { AiOutlineArrowRight } from "react-icons/ai";
import { MdOutlineTrackChanges } from "react-icons/md";
import {
  updateUserAddress,
  updateUserInfo,
  deleteUserAddress,
} from "../../redux/actions/user";
import { Country, State } from "country-state-city";
import { toast } from "react-toastify";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
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
    <div className="mt-8 w-[75%] ml-5">
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
    <div className="mt-8 w-[75%] ml-5">
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
    <div className="mt-8 w-[75%] ml-5">
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
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState();
  const [state, setState] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const addressTypeData = [
    { name: "Default" },
    { name: "Home" },
    { name: "Office" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      country === "" ||
      state === "" ||
      addressType === "" ||
      zipCode === ""
    ) {
      toast.error("Please fill all the fields!");
    }

    dispatch(
      updateUserAddress(
        country,
        state,
        address1,
        address2,
        zipCode,
        addressType
      )
    ).then(() => {
      toast.success("Adress added successfully!");
      setOpen(false);
      window.location.reload();
    });
  };
  const handleDelete = (item) => {
    dispatch(deleteUserAddress(item._id))
      .then(() => {
        toast.success("Address deleted successfully!");
        setOpen(false);
        // window.location.reload();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };


  return (
    <div className="w-full p-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] "> My Address</h1>

        <div
          className={`${styles.button} 800px:w-[150px] w-[90px] 800px:h-[44px] `}
          onClick={() => setOpen(true)}
        >
          <span className="text-white font-medium text-[17px]">Add New</span>
        </div>
      </div>

      {user &&
        user.addresses &&
        user.addresses.map((address, index) => (
          <div
            className="w-full bg-white h-[60px] rounded-md mt-4 shadow-md items-center flex justify-between"
            key={index}
          >
            <div className="flex items-center">
              <h5 className="font-[500] text-[18px] px-2 ">
                {address.addressType}
              </h5>
            </div>

            <div className="flex items-center pr-2 ">
              <h6 className="text-[16px] font-[500] ">
                {address.address1 + " " + address.address2}{" "}
              </h6>
            </div>

            <div className="flex items-center pr-2 ">
              <h6 className="text-[16px] font-[500] ">{address.zipCode}</h6>
            </div>

            <div className="pr-2 800px:pr-8 items-center">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer hover:text-red-500"
                onClick={() => handleDelete(address)}
              />
            </div>
          </div>
        ))}

      {open && (
        <div className="fixed w-full flex bg-[#0000006a]  h-screen top-0 left-0 items-center justify-center">
          <div className=" w-[80%] 800px:w-[35%] bg-white h-[50%] 800px:h-[80%]  flex   overflow-y-scroll shadow-sm relative rounded-md mt-2 flex-col">
            <div className="justify-end flex w-full p-3">
              <RxCross1
                className=" "
                size={25}
                onClick={() => setOpen(false)}
              />
            </div>
            <div className="flex items-center justify-center">
              <h1 className="text-[22px]  font-[500]">Create Address</h1>
            </div>

            <div className="w-full">
              <form aria-required="true" onSubmit={handleSubmit}>
                <div className="block w-full p-4">
                  <label htmlFor="" className="text-[18px] font-[500] block">
                    Country
                  </label>

                  <select
                    name="country"
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full border h-[30px] rounded-md"
                  >
                    <option value="" className="block p-2 ">
                      Choose your country
                    </option>
                    {Country &&
                      Country.getAllCountries().map((country) => (
                        <option
                          className="block p-2 "
                          key={country.isoCode}
                          value={country.isoCode}
                        >
                          {country.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="block w-full px-4">
                  <label htmlFor="" className="text-[18px] font-[500] block">
                    State
                  </label>

                  <select
                    name="state"
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full border h-[30px] rounded-md"
                  >
                    <option value="" className="block p-2 ">
                      Choose your state
                    </option>
                    {State &&
                      State.getStatesOfCountry(country).map((state) => (
                        <option
                          className="block p-2 "
                          key={state.isoCode}
                          value={state.isoCode}
                        >
                          {state.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="block w-full p-4">
                  <label
                    htmlFor="address1"
                    className="text-[18px] font-[500] block"
                  >
                    Address1
                  </label>
                  <input
                    type="text"
                    className={`${styles.input} h-[30px]`}
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>
                <div className="block w-full px-4">
                  <label
                    htmlFor="address2"
                    className="text-[18px] font-[500] block"
                  >
                    Address2
                  </label>
                  <input
                    type="text"
                    className={`${styles.input} h-[30px]`}
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>
                <div className="block w-full p-4">
                  <label
                    htmlFor="zipCode"
                    className="text-[18px] font-[500] block"
                  >
                    zipCode
                  </label>
                  <input
                    type="text"
                    className={`${styles.input} h-[30px]`}
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>

                <div className="block w-full p-4">
                  <label htmlFor="" className="text-[18px] font-[500] block">
                    AddressType
                  </label>

                  <select
                    name="addressType"
                    id="addressType"
                    value={addressType}
                    onChange={(e) => setAddressType(e.target.value)}
                    className="w-full border h-[30px] rounded-md"
                  >
                    <option value="" className="block p-2 ">
                      Choose your address type
                    </option>
                    {addressTypeData &&
                      addressTypeData.map((item) => (
                        <option
                          className="block p-2 "
                          key={item.name}
                          value={item.name}
                        >
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <button className=" border  border-gray-300 w-[90%] flex items-center justify-center rounded-md p-3 placeholder-gray-400 h-[35px] appearance-none m-4 hover:outline-none hover:bg-blue-200 shadow-sm">
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [phoneNumber, setPhoneNumber] = useState(user ? user.phoneNumber : "");
  const [password, setPassword] = useState(user ? user.password : "");
  const [avatar, setAvatar] = useState(null);

  const dispatch = useDispatch();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    await axios
      .put(`${server}/user/update-avatar`, formData, {
        headers: { "Content-Type": "multipart/form-data" },

        withCredentials: true,
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserInfo(name, phoneNumber, email, password));
      toast.success("User updated successfully!");
    } catch (error) {
      toast.error("User update failed!");
    }
  };
  return (
    <div className="mt-7 w-[80%]">
      <div className="flex justify-center w-full">
        <div className="relative">
          <img
            crossOrigin="anonymous"
            src={`${backend_url}${user?.avatar}`}
            alt="profile"
            className="800px:mt-0 mt-5 w-[80px] h-[80px] 800px:w-[100px] 800px:h-[100px] rounded-full object-cover border border-[green]"
          />

          <div className="bg-[#e3e9ee] rounded-full w-[25px] h-[25px] absolute bottom-1 right-1 flex items-center justify-center cursor-pointer">
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="hidden"
            />
            <label htmlFor="image" className="cursor-pointer">
              <AiOutlineCamera />
            </label>
          </div>
        </div>
      </div>

      <br />

      <div className="w-full px-5 ">
        <form onSubmit={handleSubmit} aria-required="true">
          <div className="w-full 800px:flex pb-3">
            <div className=" 800px:w-[50%] ">
              <label htmlFor="names" className="font-medium">
                Full Names
              </label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mt-2 mb-3`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label htmlFor="phone" className="font-medium">
                Phone Number
              </label>
              <input
                type="number"
                className={`${styles.input} !w-[95%] mt-2 mb-3`}
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="800px:w-[50%]">
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mt-2 mb-3`}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="pass" className="font-medium">
                Password
              </label>
              <input
                type="password"
                className={`${styles.input} !w-[95%] mt-2 mb-3`}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
    </div>
  );
};
const Inbox = () => {
  return <div className=""></div>;
};

export {
  Profile,
  Address,
  PaymentMethod,
  TrackOrders,
  AllRefundOrders,
  AllOrders,
  Inbox,
};
