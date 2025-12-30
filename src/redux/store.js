import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import orderReducer from "../features/orders/orderSlice.js";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        orders: orderReducer,
    },
});
