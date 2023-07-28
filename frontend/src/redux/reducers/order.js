import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

export const orderReducer = createReducer(initialState, {
  // get all orders
  getAllOrdersRequest: (state) => {
    state.isLoading = true;
  },
  getAllOrdersSuccess: (state, action) => {
    state.isLoading = false;
    state.orders = action.payload;
    state.success = true;
  },
  getAllOrdersFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },
  // get all shop orders
  getAllshopOrdersRequest: (state) => {
    state.isLoading = true;
  },
  getAllshopOrdersSuccess: (state, action) => {
    state.isLoading = false;
    state.orders = action.payload;
    state.success = true;
  },
  getAllshopOrdersFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  //deleteOrder
  deleteOrderRequest: (state) => {
    state.isLoading = true;
  },

  deleteOrderSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteOrderFails: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
});
