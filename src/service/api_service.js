import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const ME = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/me`);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error posting data:", error);
    throw error.response.data;
  }
};
export const login = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, payload);
    localStorage.setItem("accessToken", response.data.token);
    return response.data;
    // return {token: 'response.data'};
  } catch (error) {
    // Handle errors
    console.error("Error posting data:", error);
    throw error.response.data;
  }
};

export const registerUser = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, payload);
    localStorage.setItem("verifyEmail", true);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error posting data:", error);
    throw error.response.data;
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
    throw error.response.data;
  }
};

export const verifyEmail = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/verifyemail/${token}`);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error posting data:", error);
    throw error.response.data.message;
  }
};

export const registerGarden = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/garden/register`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error posting data:", error);
    throw error.response.data;
  }
};
export const createMaintenance = async (payload) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/garden/maintenance`,
      payload
    );
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error posting data:", error);
    throw error.response.data;
  }
};
export const getAllMaintenance = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/garden/maintenance`);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error posting data:", error);
    throw error.response.data;
  }
};
export const updateGarden = async (payload) => {
  try {
    const response = await axios.patch(`${BASE_URL}/garden/update`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error posting data:", error);
    throw error.response.data;
  }
};

export const getGardenDetails = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/garden/details`);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error posting data:", error);
    throw error.response.data;
  }
};

export const contact = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/contact-us`, payload);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error posting data:", error);
    throw error.response.data;
  }
};
