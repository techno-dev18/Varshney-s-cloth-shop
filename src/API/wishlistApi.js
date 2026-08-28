import axios from "axios";

const API = axios.create({
  baseURL:
    "https://varshney-s-cloth-shop.onrender.com/api"
});

export const addToWishlist = (
  userId,
  productId
) => {

  return API.post("/wishlist", {
    userId,
    productId
  });

};

export const getWishlist = (
  userId
) => {

  return API.get(
    `/wishlist/${userId}`
  );

};

export const removeFromWishlist = (
  wishlistId
) => {

  return API.delete(
    `/wishlist/${wishlistId}`
  );

};

export default API;