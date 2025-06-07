import { BoardData, TaskData } from "./board.types";

export interface BoardStore {
  boards: BoardData[];
  board: BoardData;

  // BOARDS METHODS
  addBoard: (board: BoardData) => void;
  setBoards: (boards: BoardData[]) => void;
  deleteBoard: (_id: BoardData["_id"]) => void;

  // BOARD METHODS
  setBoard: (board: BoardData) => void;
  editBoard: (board: BoardData) => void;

  // TASK METHODS
  addTask: (task: TaskData) => void;
  removeTask: (_id: TaskData["_id"]) => void;
  editTask: (task: TaskData) => void;
}
