export type TaskStatus = "In Progress" | "Completed" | "Won't Do" | "To Do";

export interface Task {
  id: string;
  name: string;
  description?: string;
  icon: "👨‍💻" | "💬" | "☕" | "🏋️‍♀️" | "📚" | "⏰";
  status: TaskStatus;
}

export interface Board {
  id: string;
  name: string;
  description: string;
}
