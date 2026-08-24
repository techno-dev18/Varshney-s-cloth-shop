import axios from "axios";

const API = axios.create({
  baseURL: "https://varshney-s-cloth-shop.onrender.com/api"
});

export const getAllProducts = () =>
  API.get("/products");

export const getSingleProduct = (productName) =>
  API.get(`/products/${productName}`);

export const addProduct = (product) =>
  API.post("/products", product);

export default API;