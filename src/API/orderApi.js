import axios from "axios";

const API = axios.create({
  baseURL:
    "https://varshney-s-cloth-shop.onrender.com/api",

  withCredentials: true
});


// ==========================================
// CREATE ORDER
// ==========================================

export const createOrder = (orderData) => {
  return API.post(
    "/orders",
    orderData
  );
};


// ==========================================
// GET USER ORDERS
// ==========================================

export const getOrders = () => {
  return API.get("/orders");
};


// ==========================================
// GET SINGLE ORDER
// ==========================================

export const getSingleOrder = (orderId) => {
  return API.get(
    `/orders/order/${orderId}`
  );
};


export default API;