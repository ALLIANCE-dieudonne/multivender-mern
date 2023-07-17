import axios from "axios";
import { server } from "../../server";


// Get all events
export const getAllOrders = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersRequest",
    });
    const { data } = await axios.get(`${server}/order/all-orders/${userId}`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllOrdersSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersFail",
      payload: error.response.data.message,
    });
  }
};
