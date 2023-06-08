import axios from "axios";
import { server } from "../../server";

// Create product
export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "productCreateRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } }; // Fixed typo in "multipart/form-data"
    const { data } = await axios.post(
      `${server}/product/create-product`,
      newForm,
      config
    );

    dispatch({
      type: "productCreateSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "productCreateFail",
      payload: error.response.data.message,
    });
  }
};

// Get all products
export const getAllShopProducts = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllshopProductsRequest",
    });

    const { data } = await axios.get(
      `${server}/product/all-shop-products/${id}`,
      {
        withCredentials: true,
      }
    );


    dispatch({
      type: "getAllshopProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllshopProductsFail",
      payload: error.response.data.message,
    });
  }
};

//delete product

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteProductRequest" });

    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFails",
      payload: error.response.data.message,
    });
  }
};
