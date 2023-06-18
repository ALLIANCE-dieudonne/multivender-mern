import axios from "axios";
import { server } from "../../server";

//load user

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response.data.message,
    });
  }
};

//update user info
export const updateUserInfo =
  (name, phoneNumber, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: "UpdateUserInfoRequest",
      });

      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        {
          name,
          email,
          password,
          phoneNumber,
        },
        { withCredentials: true }
      );

      dispatch({
        type: "UpdateUserInfoSuccess",
        payload: data.updatedUser,
      });
    } catch (error) {
      dispatch({
        type: "UpdateUserInfoFail",
        payload: error.response.data.message,
      });
    }
  };

//update user adress
export const updateUserAddress =
  (country, state, address1, address2, zipCode, addressType) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "UpdateUserAddrressRequest",
      });
      const { data } = await axios.put(
        `${server}/user/update-user-address`,
        {
          country,
          state,
          address1,
          address2,
          zipCode,
          addressType,
        },
        { withCredentials: true }
      );
      dispatch({
        type: "UpdateUserAddrressSuccess",
        payload: data.updatedUser,
      });
    } catch (error) {
      dispatch({
        type: "UpdateUserAddrressFail",
        payload: error.response.data.message,
      });
    }
  };

// //delete user addresses

// export const deleteUserAddress = (id) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "DeleteUserAddrressRequest",
//     });

//     const { data } = await axios.delete(
//       `${server}/user/delete-user-address/${id}`,
//       { withCredentials: true }
//     );

//     dispatch({
//       type: "DeleteUserAddrressSuccess",
//       payload: data.message,
//     });
//   } catch (error) {
//     dispatch({
//       type: "DeleteUserAddrressFail",
//       payload: error.response.data.message,
//     });
//   }
// };
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteUserAddressRequest",
    });

    const { data } = await axios.delete(
      `${server}/user/delete-user-address/${id}`,
      { withCredentials: true }
    );


    dispatch({
      type: "DeleteUserAddressSuccess",
      payload: {
        user: data.user,
        message: "Adress was successfully deleted!"
      }
    });

  } catch (error) {
    dispatch({
      type: "DeleteUserAddressFail",
      payload: error.response.data.message,
    });
  }
};
