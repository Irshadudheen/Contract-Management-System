import axios from "axios";

const API_URL = "http://localhost:3000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Automatically include cookies in every request
});

// Response Interceptor (Optional: Handle Errors Globally)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
