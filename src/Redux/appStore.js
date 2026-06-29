import { configureStore } from "@reduxjs/toolkit";

import basketSlice from "./slices/basketSlice";
import customerSlice from "./slices/customerSlice";
import wishlistSlice from "./slices/wishlistSlice.js";
// import theme from "./slices/themeSlice";
export const appStore = configureStore({
  reducer:{
    basket: basketSlice,
    customer: customerSlice,
    wishlist: wishlistSlice,
    // theme: themeSlice
  }
});