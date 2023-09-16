import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import productReducer from "./ProductSlice"
import usersReducer from "./userSlice";
const store = configureStore({
    reducer:{
        cart:cartReducer,
        product:productReducer,
        user:usersReducer
    }
})
export default store;