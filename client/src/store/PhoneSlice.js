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
      .addCase(fetchPhoneProducts.pending, (state, action) => {
        state.status = statuses.LOADING;
      })
      .addCase(fetchPhoneProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = statuses.IDLE;
      })
      .addCase(fetchPhoneProducts.rejected, (state, action) => {
        state.status = statuses.ERROR;
      });
  },
});

export const fetchPhoneProducts = createAsyncThunk(
  "phoneProducts/fetch",
  async () => {
    const response = await fetch(
      "https://aklamaash-e-commerce.vercel.app/api/products/products?category=Phone"
    );
    const data = await response.json();
    return data;
  }
);

export default phoneStore.reducer;
