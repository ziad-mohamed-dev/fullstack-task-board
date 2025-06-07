import axios from "axios";

export const AxiosInstant = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api`,
  withCredentials: true,
});
