import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_KEY;

export const ME = async () => {
  try {
    const apiURL = `${BASE_URL}/me`;
    const response = await axios.post(apiURL);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error ME:", error);
    throw error.response.data;
  }
};
export const login = async (payload) => {
  try {
    const apiURL = `${BASE_URL}/login`;
    const response = await axios.post(apiURL, payload);
    localStorage.setItem("accessToken", response.data.token);
    return response.data;
    // return {token: 'response.data'};
  } catch (error) {
    // Handle errors
    console.error("Error login:", error);
    throw error.response.data;
  }
};

export const registerUser = async (payload) => {
  try {
    const apiURL = `${BASE_URL}/register`;
    const response = await axios.post(apiURL, payload);
    localStorage.setItem("verifyEmail", true);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error registerUser:", error);
    throw error.response.data;
  }
};

export const resendVerificationEmail = async (userEmail) => {
  try {
    const apiURL = `${BASE_URL}/resend-verfication`;
    const response = await axios.post(apiURL, {
      email: userEmail,
    });
    localStorage.setItem("verifyEmail", true);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error resendVerificationEmail:", error);
    throw error.response.data;
  }
};

export const verifyEmail = async (token) => {
  try {
    const apiURL = `${BASE_URL}/verifyemail/${token}`;
    const response = await axios.get(apiURL);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error verifyEmail:", error);
    throw error.response.data.message;
  }
};

export const registerGarden = async (payload) => {
  try {
    const apiURL = `${BASE_URL}/garden/register`;
    const response = await axios.post(apiURL, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error registerGarden:", error);
    throw error.response.data;
  }
};

export const createAddress = async (payload) => {
  try {
    const apiURL = `${BASE_URL}/address/create`;
    const response = await axios.post(apiURL, payload);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error createAddress:", error);
    throw error.response.data;
  }
};

export const addProduct = async (payload) => {
  try {
    const apiURL = `${BASE_URL}/product/create`;
    const response = await axios.post(apiURL, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error addProduct:", error);
    throw error.response.data;
  }
};

export const createMaintenance = async (payload) => {
  try {
    const apiURL = `${BASE_URL}/garden/maintenance`;
    const response = await axios.post(apiURL, payload);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error createMaintenance:", error);
    throw error.response.data;
  }
};
export const getAllGardenMaintenance = async () => {
  try {
    const apiURL = `${BASE_URL}/garden/all-maintenance`;
    const response = await axios.get(apiURL);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error getAllGardenMaintenance:", error);
    throw error.response.data;
  }
};
export const updateAddress = async (payload) => {
  try {
    const apiURL = `${BASE_URL}/address`;
    const response = await axios.put(apiURL, payload);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error updateGarden:", error);
    throw error.response.data;
  }
};

export const updateGarden = async (payload) => {
  try {
    const apiURL = `${BASE_URL}/garden/update`;
    const response = await axios.patch(apiURL, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error updateGarden:", error);
    throw error.response.data;
  }
};

export const getAddressDetails = async () => {
  try {
    const apiURL = `${BASE_URL}/address`;
    const response = await axios.get(apiURL);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error getAddressDetails:", error);
    throw error.response.data;
  }
};
export const getGardenDetails = async () => {
  try {
    const apiURL = `${BASE_URL}/garden/details`;
    const response = await axios.get(apiURL);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error getGardenDetails:", error);
    throw error.response.data;
  }
};

export const getProductDetails = async () => {
  try {
    const apiURL = `${BASE_URL}/product`;
    const response = await axios.get(apiURL);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error getGardenDetails:", error);
    throw error.response.data;
  }
};

export const getProductDetailsById = async (id) => {
  try {
    const apiURL = `${BASE_URL}/product/${id}`;
    const response = await axios.get(apiURL);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error getGardenDetails:", error);
    throw error.response.data;
  }
};

export const getCategory = async () => {
  try {
    const apiURL = `${BASE_URL}/category`;
    const response = await axios.get(apiURL);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error getCategory:", error);
    throw error.response.data;
  }
};

export const createCategory = async (payload) => {
  try {
    const apiURL = `${BASE_URL}/category/create`;
    const response = await axios.post(apiURL, payload);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error getCategory:", error);
    throw error.response.data;
  }
};

export const getAllMaintenance = async () => {
  try {
    const apiURL = `${BASE_URL}/garden/maintenance`;
    const response = await axios.get(apiURL);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error getAllMaintenance:", error);
    throw error.response.data;
  }
};

export const contact = async (payload) => {
  try {
    const apiURL = `${BASE_URL}/contact-us`;
    const response = await axios.post(apiURL, payload);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error contact:", error);
    throw error.response.data;
  }
};

export const updateMaintenance = async (payload, maintenanceId) => {
  try {
    const apiURL = `${BASE_URL}/garden/update-maintenance/${maintenanceId}`;
    const response = await axios.put(apiURL, payload);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error updateMaintenance:", error);
    throw error.response.data;
  }
};
export const updateProduct = async (payload, productId) => {
  try {
    const apiURL = `${BASE_URL}/product/update/${productId}`;

    // Create a FormData object
    const formData = new FormData();

    // Append all fields from payload to the FormData object
    for (const key in payload) {
      formData.append(key, payload[key]);
    }

    // Make the PUT request with the FormData object
    const response = await axios.put(apiURL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error updateProduct:", error);
    throw error.response ? error.response.data : error;
  }
};
