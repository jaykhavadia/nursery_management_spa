import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const ME = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/me`);
    console.log("response.data ME->>>", response.data);
    // localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error posting data:", error);
    return error.response.data;
  }
};
export const login = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, data);
    localStorage.setItem("accessToken", response.data.token);
    return response.data;
    // return {token: 'response.data'};
  } catch (error) {
    // Handle errors
    console.error("Error posting data:", error);
    return error.response.data;
  }
};

export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, data);
    localStorage.setItem("verifyEmail", true);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error posting data:", error);
    return error.response.data;
  }
};

export const resendVerificationEmail = async (userEmail) => {
  try {
    const response = await axios.post(`${BASE_URL}/resend-verfication`, {
      email: userEmail,
    });
    localStorage.setItem("verifyEmail", true);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error posting data:", error);
    return error.response.data;
  }
};

export const verifyEmail = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/verifyemail/${token}`);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error posting data:", error);
    return error.response.data.message;
  }
};

export const registerGarden = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/garden/register`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error posting data:", error);
    return error.response.data;
  }
};

export const getGardenDetails = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/garden/details`);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error posting data:", error);
    return error.response.data;
  }
};
