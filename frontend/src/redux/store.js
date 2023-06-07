import { configureStore } from "@reduxjs/toolkit";
import {userReducer} from "./reducers/user";
import { sellerReducer } from "./reducers/seller";
import { productReducer } from "./reducers/product";
import thunk from "redux-thunk";
import { eventReducer } from "./reducers/event";

const store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    product: productReducer,
    events:eventReducer
  },
  middleware: [thunk],
});

export default store;
