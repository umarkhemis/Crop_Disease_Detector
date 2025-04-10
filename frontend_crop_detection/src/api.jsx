import axios from "axios";
import {jwtDecode} from "jwt-decode";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

API.interceptors.request.use(async (config) => {
  let token = localStorage.getItem("token");
  let refreshToken = localStorage.getItem("refreshToken");

  if (token) {
    const decodedToken = jwtDecode(token);
    const isExpired = decodedToken.exp * 1000 < Date.now();

    if (isExpired && refreshToken) {
      try {
        const response = await axios.post("http://127.0.0.1:8000/refresh/", {
          refresh: refreshToken,
        });

        localStorage.setItem("token", response.data.access);
        token = response.data.access;
      } catch (error) {
        console.error("Token refresh failed, logging out...");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";  // Redirect to login if refresh fails
      }
    }

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;