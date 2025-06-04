import { mockBoard, mockTasks } from "@/db/mockBoard";
import { BoardStore } from "@/types/board.store.types";
import { create } from "zustand";

export const useBoardStore = create<BoardStore>()((set) => ({
  board: mockBoard,
  tasks: mockTasks,

  updateBoard: (updateBoard) => set({ board: updateBoard }),

  addTask: () => {
    set((state) => ({
      tasks: [
        ...state.tasks,
        { id: `${Date.now()}`, name: "Task", icon: "⏰", status: "To Do" },
      ],
    }));
  },

  updateTask: (updatedTask) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      ),
    }));
  },

  deleteTask: (id) => {
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) }));
  },
}));
