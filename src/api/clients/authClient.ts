import { ENV } from "@/config/env";
import useAuthGuardStore from "@/store/auth/authGuardStore";
import axios from "axios";

const authApiClient = axios.create({
  baseURL: ENV.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // send httpOnly cookies
  timeout: 10000, // 10 seconds
});

authApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthGuardStore.getState().clearUserInfo();

      window.location.href = `/login?redirect=${encodeURIComponent(
        window.location.pathname
      )}`;
    }
    return Promise.reject(error);
  }
);
export default authApiClient;
