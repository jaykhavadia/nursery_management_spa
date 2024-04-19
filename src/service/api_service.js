import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const login = async (data) => {
  try {
    // const response = await axios.post(`${BASE_URL}/login`, data);
    localStorage.setItem("verifyEmail", true);
    // return response.data;
    return {token: 'response.data'};
  } catch (error) {
    // Handle errors
    console.error("Error posting data:", error);
    return error.response.data;
  }
};

export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, data);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error posting data:", error);
    return error.response.data;
  }
};
