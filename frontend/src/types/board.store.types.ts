import { Task } from "./board.types";

export interface BoardStore {
  tasks: Task[];
  addTask: () => void;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (id: Task["id"]) => void;
}
