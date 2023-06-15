import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { sellerReducer } from "./reducers/seller";
import { productReducer } from "./reducers/product";
import { wishlistReducer } from "./reducers/wishlist";
import thunk from "redux-thunk";
import { eventReducer } from "./reducers/event";
import { cartReducer } from "./reducers/cart";

const store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    product: productReducer,
    events: eventReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  middleware: [thunk],
});

export default store;
