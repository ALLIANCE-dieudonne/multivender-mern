import { configureStore } from "@reduxjs/toolkit";
import {userReducer} from "./reducers/user";
import { sellerReducer } from "./reducers/seller";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer
  },
  middleware: [thunk],
});

export default store;
