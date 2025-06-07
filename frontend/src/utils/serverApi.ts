"use server";
import { cookies } from "next/headers";
import { AxiosInstant } from "./axiosInstant";

AxiosInstant.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.toString();
  if (cookie) {
    config.headers.Cookie = cookie;
  }
  return config;
});

// AUTH
const verifyToken = async () => await AxiosInstant.get("/auth/verify");

// BOARDS
const getAllBoards = async () => await AxiosInstant.get("/boards");

const getBoard = async (_id: string) =>
  await AxiosInstant.get(`/boards/${_id}`);

export { verifyToken , getAllBoards, getBoard };
