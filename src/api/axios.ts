import { ROUTES } from "@/routes/router";
import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(
          "/api/auth/refresh",
          {},
          {
            withCredentials: true,
          },
        );

        return api(originalRequest);
      } catch {
        sessionStorage.removeItem("isAuth");
        window.location.href = ROUTES.LOGIN;
      }
    }
    return Promise.reject(error);
  },
);
