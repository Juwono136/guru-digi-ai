import axios from "axios";

const API_URL = "/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export default axiosInstance;
