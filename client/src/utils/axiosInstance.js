import axios from "axios";
import  { getData } from '../hooks/useGetUser';

import { removeUser } from "../redux/userSlice";
import { store } from "../redux/storage";
const API_URL = "https://contract.gigglewagon.shop/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getData();
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

axiosInstance.interceptors.response.use(
  (response) => response ,
   
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    console.log(error.status, 'error status')
    if(error.status === 401 || error.status === 403) {
      
        store.dispatch(removeUser())
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
