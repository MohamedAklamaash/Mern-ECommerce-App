import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { statuses } from "./ProductSlice";

const phoneStore = createSlice({
  name: "phones",
  initialState: {
    data: [],
    status: statuses.IDLE,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLaptopsfromdb.pending, (state, action) => {
        state.status = statuses.LOADING;
      })
      .addCase(fetchLaptopsfromdb.fulfilled, (state, action) => {
        console.log("action payload:",action.payload);
        state.data = action.payload;
        console.log("Data in laptop slice:",state.data);
        state.status = statuses.IDLE;
      })
      .addCase(fetchLaptopsfromdb.rejected, (state, action) => {
        state.status = statuses.ERROR;
      });
  },
});

export const fetchLaptopsfromdb = createAsyncThunk(
  "laptopProducts/fetch",
  async () => {
    const response = await fetch(
      "http://localhost:5001/api/products/products?category=Laptop"
    );
    const data = await response.json();
    return data;
  }
);

export default phoneStore.reducer;
