import axios from "axios";

const API = axios.create({
  baseURL: "https://varshney-s-cloth-shop.onrender.com/api"
});


// GET PROFILE
export const getUserProfile = (userId) => {
  return API.get(`/users/${userId}`);
};


// UPDATE PROFILE
export const updateUserProfile = (userId, userData) => {
  return API.put(`/users/${userId}`, userData);
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