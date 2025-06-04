import { Board, Task } from "./board.types";

export interface BoardStore {
  board: Board;
  tasks: Task[];

  updateBoard: (updatedBoard: Board) => void;

  addTask: () => void;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (id: Task["id"]) => void;
}
