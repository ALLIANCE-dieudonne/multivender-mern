import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartReducer = createReducer(initialState, {
  addToCart: (state, action) => {
    const item = action.payload;
    const existItem = state.cart.find((i) => {
      return i._id === item._id;
    });

    if (existItem) {
      return {
        ...state,
        cart: state.cart.map((i) => (i._id === existItem._id ? item : i)),
      };
    } else {
      return {
        ...state,
        cart: [...state.cart, item],
      };
    }
  },

  removeFromCart: (state, action) => {
    return { ...state, cart: state.cart.filter((i) => i._id !== item._id) };
  },
});
