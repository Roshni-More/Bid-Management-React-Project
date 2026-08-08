import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:7296",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("Request URL:", config.baseURL + config.url);

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized — token expired or missing.");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
