import axios from "axios";

const API = axios.create({
  baseURL: "https://varshney-s-cloth-shop.onrender.com/api"
});

export const getAllProducts = () => {
  return API.get("/products");
};

export const getSingleProduct = (productId) => {
  return API.get(`/products/${productId}`);
};

export const addProduct = (product) => {
  return API.post("/products", product);
};

export default API;