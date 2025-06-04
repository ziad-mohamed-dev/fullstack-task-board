import { SignInData, SignUpData } from "@/types/api.types";
import axios from "axios";

const AxiosClient = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

const signUp = async ({ username, password }: SignUpData) =>
  await AxiosClient.post("/auth/signup", { username, password });

const signIn = async ({ username, password }: SignInData) =>
  await AxiosClient.post("/auth/login", { username, password });

export { signUp, signIn };
