import axios from "axios";

const API = axios.create({
  baseURL:
    "https://varshney-s-cloth-shop.onrender.com/api"
});


export const createOrder = (
  userId,
  orderData
) => {

  return API.post(
    "/orders",
    {
      userId,
      ...orderData
    }
  );

};


export const getOrders = (userId) => {

  return API.get(
    `/orders/${userId}`
  );

};


export const getSingleOrder = (orderId) => {

  return API.get(
    `/orders/order/${orderId}`
  );

};


export default API;