import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const statuses = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const productSlice = createSlice({
  name: "Product",
  initialState: {
    data: [],
    status: statuses.IDLE,
    phoneproducts: [],
    laptopProducts: [],
  },
  //   reducers: {
  //     setProducts(state, action) {
  //       //redux : the pure functions are just loaded up claims throughout the application
  //       state.data = action.payload;
  //     },
  //     setStatus(state, action) {
  //       state.status = action.payload;
  //     },
  //   },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = statuses.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = statuses.IDLE;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = statuses.ERROR;
      })
  },
});

//thunk function

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await fetch("http://localhost:5001/api/products/products");
  const data = await response.json();
  return data;
});



export const fetchLaptopProducts = createAsyncThunk(
  "phoneProducts/fetch",
  async () => {
    const response = await fetch(
      "http://localhost:5001/api/products/products?category=Laptop"
    );
    const data = await response.json();
    return data;
  }
);

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;
