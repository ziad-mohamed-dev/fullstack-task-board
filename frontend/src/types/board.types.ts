export type TaskStatus = "In Progress" | "Completed" | "Won't Do" | "To Do";

export interface TaskData {
  _id: string;
  name: string;
  description?: string;
  icon: "👨‍💻" | "💬" | "☕" | "🏋️‍♀️" | "📚" | "⏰";
  status: TaskStatus;
  board: BoardData["_id"];
}

export interface BoardData {
  _id: string;
  name: string;
  description: string;
  tasks: TaskData[];
}
