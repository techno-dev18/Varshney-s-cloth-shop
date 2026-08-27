import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
  name: "basket",

  initialState: [],

  reducers: {

    insertProduct(state, action) {

      const existingItem = state.find(
        item =>
          item._id === action.payload._id &&
          item.selectedSize === action.payload.selectedSize
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
          product._id === action.payload._id &&
          product.selectedSize === action.payload.selectedSize
      );

      if (item) {
        item.quantity += 1;
      }

    },

    decreaseQuantity(state, action) {

      const item = state.find(
        product =>
          product._id === action.payload._id &&
          product.selectedSize === action.payload.selectedSize
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

    },

    deleteProduct(state, action) {

      return state.filter(
        item =>
          !(
            item._id === action.payload._id &&
            item.selectedSize === action.payload.selectedSize
          )
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