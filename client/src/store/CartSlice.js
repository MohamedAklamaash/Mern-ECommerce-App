import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    add(state, action) {
      //redux : the pure functions are just loaded up claims throughout the application
      state.push(...state, action.payload);
      console.log("add func worked");
    },
    remove(state, action) {
      console.log("remove func worked");
      state = state.filter((item) => item._id !== action.payload);
      return state;
    },
  },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
