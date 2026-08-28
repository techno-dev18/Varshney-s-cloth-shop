import axios from "axios";

const API = axios.create({
  baseURL:
    "https://varshney-s-cloth-shop.onrender.com/api"
});


// CREATE ORDER

export const createOrder = (userId) => {

  return API.post("/orders", {
    userId
  });

};


// GET USER ORDERS

export const getUserOrders = (userId) => {

  return API.get(`/orders/${userId}`);

};


// GET SINGLE ORDER

export const getSingleOrder = (orderId) => {

  return API.get(
    `/orders/order/${orderId}`
  );

};


export default API;