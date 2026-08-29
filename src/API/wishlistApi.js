import axios from "axios";

const API = axios.create({
  baseURL:
    "https://varshney-s-cloth-shop.onrender.com/api"
});


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
// GET USER WISHLIST
// ==========================================

export const getWishlist = (
  userId
) => {

  return API.get(
    `/wishlist/${userId}`
  );

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