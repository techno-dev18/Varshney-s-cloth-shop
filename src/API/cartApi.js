import axios from "axios";

const API = axios.create({

  baseURL:
    "https://varshney-s-cloth-shop.onrender.com/api",

  withCredentials: true

});


export const getCart = () => {

  return API.get("/cart");

};


export const addToCart = (
  productId,
  selectedSize
) => {

  return API.post(
    "/cart",
    {
      productId,
      selectedSize
    }
  );

};


export const updateCart = (
  cartId,
  action
) => {

  return API.put(
    `/cart/${cartId}`,
    {
      action
    }
  );

};


export const deleteCartItem = (
  cartId
) => {

  return API.delete(
    `/cart/${cartId}`
  );

};


export default API;