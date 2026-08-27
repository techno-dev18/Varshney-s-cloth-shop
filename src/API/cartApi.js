import axios from "axios";

const API = axios.create({
  baseURL: "https://varshney-s-cloth-shop.onrender.com/api"
});

export const addToCart = (userId, productId, selectedSize) =>
  API.post("/cart", {
    userId,
    productId,
    selectedSize
  });

export const getCart = (userId) =>
  API.get(`/cart/${userId}`);

export const updateCart = (cartId, action) =>
  API.put(`/cart/${cartId}`, {
    action
  });

export const deleteCartItem = (cartId) =>
  API.delete(`/cart/${cartId}`);

export default API;