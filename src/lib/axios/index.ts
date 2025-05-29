import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://opentdb.com/",
  timeout: 10000,
});

export default axiosInstance;
