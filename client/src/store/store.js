import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import productReducer from "./ProductSlice"
import usersReducer from "./userSlice";
import PhoneSlice from "./PhoneSlice";
import LaptopSlice from "./LaptopSlice";
const store = configureStore({
    reducer:{
        cart:cartReducer,
        product:productReducer,
        user:usersReducer,
        phone:PhoneSlice,
        laptop:LaptopSlice,
    }
})
export default store;