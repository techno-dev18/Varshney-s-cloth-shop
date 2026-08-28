import axios from "axios";

const API = axios.create({
  baseURL:
    "https://varshney-s-cloth-shop.onrender.com/api"
});


// ===============================
// GET USER PROFILE
// ===============================

export const getUserProfile = (userId) => {
  return API.get(`/users/${userId}`);
};


// ===============================
// UPDATE USER PROFILE
// ===============================

export const updateUserProfile = (
  userId,
  userData
) => {
  return API.put(
    `/users/${userId}`,
    userData
  );
};


export default API;