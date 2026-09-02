import axios from "axios";

const API = axios.create({
  baseURL:
    "https://varshney-s-cloth-shop.onrender.com/api",
  withCredentials: true
});


// ==========================================
// GET WISHLIST
// ==========================================

export const getWishlist = () => {
  return API.get("/wishlist");
};


// ==========================================
// ADD TO WISHLIST
// ==========================================

export const addToWishlist = (
  userId,
  productId
) => {
  return API.post("/wishlist", {
    userId,
    productId
  });
};


// ==========================================
// REMOVE FROM WISHLIST
// ==========================================

export const removeFromWishlist = (
  wishlistId
) => {
  return API.delete(
    `/wishlist/${wishlistId}`
  );
};


export default API;