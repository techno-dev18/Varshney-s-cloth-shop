import { configureStore } from "@reduxjs/toolkit";

import basketSlice from "./slices/basketSlice";
import customerSlice from "./slices/customerSlice";

export const appStore = configureStore({
  reducer:{
    basket: basketSlice,
    customer: customerSlice,
    wishlist: wishlistSlice,
    theme: themeSlice
  }
});