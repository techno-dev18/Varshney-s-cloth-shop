import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const getAllProducts = () =>
  API.get("/products");

export const getSingleProduct = (productName) =>
  API.get(`/products/${productName}`);

export const addProduct = (product) =>
  API.post("/products", product);

export default API;