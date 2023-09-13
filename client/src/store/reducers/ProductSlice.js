import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { statuses } from "../constants/ProductConstants";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  try {
    console.log("Func");
    let res = await axios.get("http://localhost:5001/api/products/products");
    const jsonData = await res.data;
    return jsonData;
  } catch (error) {
    throw error;
  }
});

const productSlice = createSlice({
  name: "Product",
  initialState: {
    data: [],
    status: statuses.IDLE,
  },
  reducers: {
    setProducts(state, action) {
      state.data.push(action.payload);
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = statuses.IDLE;
      })
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = statuses.LOADING;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = statuses.ERROR;
      });
  },
});

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;
