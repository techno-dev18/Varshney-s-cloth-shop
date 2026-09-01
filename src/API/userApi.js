import axios from "axios";

const API = axios.create({

  baseURL:
    "https://varshney-s-cloth-shop.onrender.com/api",

  withCredentials: true

});


export const registerUser = (userData) => {

  return API.post(
    "/users/register",
    userData
  );

};


export const loginUser = (userData) => {

  return API.post(
    "/users/login",
    userData
  );

};


export const logoutUser = () => {

  return API.post(
    "/users/logout"
  );

};


export const getCurrentUser = () => {

  return API.get(
    "/users/me"
  );

};


export const getUserProfile = (userId) => {

  return API.get(
    `/users/${userId}`
  );

};


export const updateUser = (
  userId,
  userData
) => {

  return API.put(
    `/users/${userId}`,
    userData
  );

};


export const updateUserPassword = (
  userId,
  passwordData
) => {

  return API.put(
    `/users/${userId}/password`,
    passwordData
  );

};


export default API;