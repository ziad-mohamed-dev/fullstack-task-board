import axios from "axios";

const BACKEND_BASE_URL =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:5000";

export const AxiosInstant = axios.create({
  baseURL: `${BACKEND_BASE_URL}/api`,
  withCredentials: true,
});
