import { ENV } from "@/config/env";
import axios from "axios";

const publicApiClient = axios.create({
  baseURL: ENV.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // send httpOnly cookies
  timeout: 10000, // 10 seconds
});

export default publicApiClient;
