import { Board, Task } from "@/types/board.types";

export const mockBoard: Board = {
  id: "1",
  name: "My Task Board",
  description: "Tasks to keep organised",
};

export const mockTasks: Task[] = [
  {
    id: "1",
    name: "Task in Progress",
    icon: "⏰",
    status: "In Progress",
  },
  {
    id: "2",
    name: "Task Completed",
    icon: "🏋️‍♀️",
    status: "Completed",
  },
  {
    id: "3",
    name: "Task Won’t Do",
    icon: "☕",
    status: "Won't Do",
  },
  {
    id: "4",
    name: "Task To Do",
    description: "Work on a Challenge on devChallenges.io, learn TypeScript.",
    icon: "📚",
    status: "To Do",
  },
];
