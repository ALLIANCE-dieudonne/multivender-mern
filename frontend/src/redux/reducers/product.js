// import { createReducer } from "@reduxjs/toolkit";

// const initialState = {
//   products: [], // Initialize with an empty array
//   isLoading: false,
//   error: null,
//   success: false,
// };

// export const productReducer = createReducer(initialState, {
//   // product create

//   productCreateRequest: (state) => {
//     state.isLoading = true;
//   },
//   productCreateSuccess: (state, action) => {
//     state.isLoading = false;
//     state.product = action.payload;
//     state.success = true;
//   },
//   productCreateFail: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//     state.success = false;
//   },

//   // get all products

//   getAllshopProducsRequest: (state) => {
//     state.isLoading = true;
//   },
//   getAllshopProductsSuccess: (state, action) => {
//     state.isLoading = false;
//     state.products = action.payload;
//     state.success = true;
//   },
//   getAllshopProductsFail: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//     state.success = false;
//   },
//   clearErrors: (state) => {
//     state.error = null;
//   },
// });

import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  products: [], // Initialize with an empty array
  isLoading: false,
  error: null,
  success: false,
};

export const productReducer = createReducer(initialState, {
  // product create
  productCreateRequest: (state) => {
    state.isLoading = true;
  },
  productCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.products = action.payload;
    state.success = true;
  },
  productCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // get all products
  getAllShopProductsRequest: (state) => {
    state.isLoading = true;
  },
  getAllShopProductsSuccess: (state, action) => {
    state.isLoading = false;
    state.products = action.payload;
    state.success = true;
  },
  getAllShopProductsFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

