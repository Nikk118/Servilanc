import axios from "axios"

export const axiosInstant=axios.create({
    baseURL: "http://localhost:3000/api/",
    withCredentials:true,
});

axiosInstant.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );