// import axios from "axios";
// import { server } from "../../server";


// //create product

// export const createProduct = (newForm) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "productCreateRequest",
//     });

//     const config = { headers: { "Content-Type": "multipart-form/data" } };
//     const { data } = await axios.post(
//       `${server}/product/create-product`,
//       newForm,
//       config
//     );

//     dispatch({
//       type: "productCreateSuccess",
//       payload: data.product,
//     });
//   } catch (error) {
//     dispatch({
//       type: "productCreateFail",
//       payload: error.response.data.message,
//     });
//   }
// };


// // //get all products

// // export const getAllAshopProducts =(id) => async (dispatch) =>{

// //   try {
// //       dispatch({
// //         type: "getAllshopProducsRequest",
// //       });


// //     const { data } = await axios.get(`${server}/product/all-shop-products/${id}`);
// //       dispatch({
// //         type: "productCreateSuccess",
// //         payload: data.products,
// //       });
    
// //   } catch (error) {
// //     dispatch({
// //       type: "getAllshopProductsFail",
// //       payload: error.response.data.message,
// //     });
// //   }

// // }

// export const getAllAshopProducts = (id) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "getAllshopProducsRequest",
//     });

//     const { data } = await axios.get(
//       `${server}/product/all-shop-products/${id}`
//     );
//     dispatch({
//       type: "getAllshopProductsSuccess",
//       payload: data.products,
//     });
//   } catch (error) {
//     dispatch({
//       type: "getAllshopProductsFail",
//       payload: error.response.data.message,
//     });
//   }
// };

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
      `${server}/product/all-shop-products/${id}`
    );
    console.log(data)
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
