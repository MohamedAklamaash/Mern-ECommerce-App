import {  configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/ProductSlice";
import cartReducer from "./reducers/CartSlice";

const store = configureStore({
    reducer:{
        product:productReducer,
        cart:cartReducer
    }
})

export default store;