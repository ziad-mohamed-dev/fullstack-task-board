import { Board, Task } from "@/types/board.types";
import { create } from "zustand";

type ModalType = "task" | "board" | null;

type ModalData =
  | { type: "task"; data: Task }
  | { type: "board"; data: Board }
  | { type: null; data: null };

interface ModalState {
  type: ModalType;
  data: Task | Board | null;
  openModal: (modalData: ModalData) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  type: null,
  data: null,
  openModal: ({ type, data }) => set({ data, type }),
  closeModal: () => set({ data: null, type: null }),
}));
