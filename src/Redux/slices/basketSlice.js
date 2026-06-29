import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
  name: "basket",

  initialState: [],

  reducers: {
    insertProduct(state, action) {

      const existingItem = state.find(
        item =>
          item.productName ===
          action.payload.productName
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({
          ...action.payload,
          quantity: 1
        });
      }
    },

    increaseQuantity(state, action) {
      const item = state.find(
        product =>
          product.productName ===
          action.payload
      );

      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity(state, action) {
      const item = state.find(
        product =>
          product.productName ===
          action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    deleteProduct(state, action) {
      return state.filter(
        item =>
          item.productName !==
          action.payload
      );
    }
  }
});

export const {
  insertProduct,
  increaseQuantity,
  decreaseQuantity,
  deleteProduct
} = basketSlice.actions;

export default basketSlice.reducer;