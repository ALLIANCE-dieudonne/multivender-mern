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
});
