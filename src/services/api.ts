import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PORT,
  // withCredentials: true,
});

export default axiosInstance;
