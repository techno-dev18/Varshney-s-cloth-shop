import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState: [],

  reducers: {
    addWishlist(state, action) {
      state.push(action.payload);
    },

    removeWishlist(state, action) {
      return state.filter(
        item =>
          item.productName !== action.payload
      );
    }
  }
});

export const {
  addWishlist,
  removeWishlist
} = wishlistSlice.actions;

export default wishlistSlice.reducer;