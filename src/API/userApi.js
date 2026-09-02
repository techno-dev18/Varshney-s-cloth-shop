import axios from "axios";

const API = axios.create({
  baseURL:
    "https://varshney-s-cloth-shop.onrender.com/api",

  withCredentials: true
});


// ==========================================
// REGISTER
// ==========================================

export const registerUser = (userData) => {

  return API.post(
    "/users/register",
    userData
  );

};


// ==========================================
// LOGIN
// ==========================================

export const loginUser = (userData) => {

  return API.post(
    "/users/login",
    userData
  );

};


// ==========================================
// GET USER PROFILE
// ==========================================

export const getUserProfile = (userId) => {

  return API.get(
    `/users/${userId}`
  );

};


// ==========================================
// UPDATE USER PROFILE
// ==========================================

export const updateUserProfile = (
  userId,
  userData
) => {

  return API.put(
    `/users/${userId}`,
    userData
  );

};


// ==========================================
// CHANGE PASSWORD
// ==========================================

export const updateUserPassword = (
  userId,
  passwordData
) => {

  return API.put(
    `/users/${userId}/password`,
    passwordData
  );

};


// ==========================================
// LOGOUT
// ==========================================

export const logoutUser = () => {

  return API.post(
    "/users/logout"
  );

};


// ==========================================
// CURRENT USER
// ==========================================

export const getCurrentUser = () => {

  return API.get(
    "/users/me"
  );

};


export default API;