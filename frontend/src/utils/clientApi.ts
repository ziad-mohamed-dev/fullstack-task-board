import { BoardDataApi, SignInData, SignUpData } from "@/types/api.types";
import { AxiosInstant } from "./axiosInstant";
import { BoardData, TaskData } from "@/types/board.types";

// AUTH
const signUp = async ({ username, password }: SignUpData) =>
  await AxiosInstant.post("/auth/sign-up", { username, password });

const signIn = async ({ username, password }: SignInData) =>
  await AxiosInstant.post("/auth/sign-in", { username, password });

const signOut = async () => await AxiosInstant.post("/auth/sign-out");

// BOARDS
const getAllBoards = async () => await AxiosInstant.get("/boards");

const createBoard = async ({ name, description }: BoardDataApi) =>
  await AxiosInstant.post("/boards", { name, description });

const updateBoard = async (updatedBoard: BoardData) =>
  await AxiosInstant.put(`/boards/${updatedBoard._id}`, {
    name: updatedBoard.name,
    description: updatedBoard.description,
  });

const DeleteBoard = async (_id: string) =>
  await AxiosInstant.delete(`/boards/${_id}`);

// Tasks
const createTask = async (boardId: BoardData["_id"]) =>
  await AxiosInstant.post("/tasks", { boardId });

const updateTask = async ({ name, description, icon, status, _id }: TaskData) =>
  await AxiosInstant.put(`/tasks/${_id}`, {
    name,
    description,
    icon,
    status,
  });

const deleteTask = async (_id: TaskData["_id"]) =>
  await AxiosInstant.delete(`/tasks/${_id}`);

export {
  signUp,
  signIn,
  signOut,
  createBoard,
  DeleteBoard,
  updateBoard,
  createTask,
  updateTask,
  deleteTask,
  getAllBoards,
};
