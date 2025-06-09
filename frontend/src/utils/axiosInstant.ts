import axios from "axios";

const BACKEND_BASE_URL = process.env.NODE_ENV === 'production' 
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:5000";

if (!BACKEND_BASE_URL) {
  throw new Error('Environment variable NEXT_PUBLIC_BACKEND_BASE_URL is not defined');
}

export const AxiosInstant = axios.create({
  baseURL: `${BACKEND_BASE_URL}/api`,
  withCredentials: true,
});
