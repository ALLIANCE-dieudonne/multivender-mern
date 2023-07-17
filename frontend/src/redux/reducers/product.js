import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  products: [], // Initialize with an empty array
  isLoading: false,
  error: null,
  success: false,
  allproducts: [],
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
  getAllshopProductsRequest: (state) => {
    state.isLoading = true;
  },
  getAllshopProductsSuccess: (state, action) => {
    state.isLoading = false;
    state.products = action.payload;
    state.success = true;
  },
  getAllshopProductsFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  //delete product

  deleteProductRequest: (state) => {
    state.isLoading = true;
  },

  deleteProductSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteProductFails: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  //get all products

  getAllProductsRequest: (state) => {
    state.isLoading = true;
  },
  getAllProductsSuccess: (state, action) => {
    state.isLoading = false;
    state.allproducts = action.payload;
    state.success = true;
  },
  getAllProductsFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
