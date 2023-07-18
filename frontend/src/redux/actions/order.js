import axios from "axios";
import { server } from "../../server";


// Get all orders
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

export const getAllShopOrders = (shopId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllshopOrdersRequest",
    });

    const { data } = await axios.get(
      `${server}/order/all-shop-orders/${shopId}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "getAllshopOrdersSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllshopOrdersFail",
      payload: error.response.data.message,
    });
  }
};
