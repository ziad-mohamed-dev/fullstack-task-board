import { BoardStore } from "@/types/board.store.types";
import { create } from "zustand";

export const useBoardStore = create<BoardStore>()((set) => ({
  boards: [],
  board: { _id: "", description: "", name: "", tasks: [] },

  // BOARDS METHODS
  setBoards: (boards) => set({ boards }),
  addBoard: (board) => set((state) => ({ boards: [...state.boards, board] })),
  deleteBoard: (_id) =>
    set((state) => ({
      boards: state.boards.filter((board) => board._id !== _id),
    })),

  // BOARD METHODS
  setBoard: (board) => set({ board }),
  editBoard: (board) =>
    set((state) => ({
      board: {
        ...state.board,
        name: board.name,
        description: board.description,
      },
    })),
    

  // TASK METHODS
  addTask: (task) =>
    set((state) => ({
      board: { ...state.board, tasks: [...state.board.tasks, task] },
    })),
  editTask: (updatedTask) =>
    set((state) => ({
      board: {
        ...state.board,
        tasks: state.board.tasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        ),
      },
    })),
  removeTask: (_id) =>
    set((state) => ({
      board: {
        ...state.board,
        tasks: state.board.tasks.filter((task) => task._id !== _id),
      },
    })),
}));
