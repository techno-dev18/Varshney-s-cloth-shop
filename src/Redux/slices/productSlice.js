import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    selectedProduct: null,
  },
  reducers: {
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { setAllProducts, setSelectedProduct } = productSlice.actions;
export default productSlice.reducer;