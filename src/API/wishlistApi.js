import axios from "axios";

const API = axios.create({

  baseURL:
    "https://varshney-s-cloth-shop.onrender.com/api",

  withCredentials: true

});


export const getWishlist = () => {

  return API.get("/wishlist");

};


export const addToWishlist = (
  productId
) => {

  return API.post(
    "/wishlist",
    {
      productId
    }
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