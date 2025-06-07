import { BoardData, TaskData } from "@/types/board.types";
import { create } from "zustand";

type ModalType = "task" | "edit board" | "create board" | null;

type ModalData =
  | { type: "task"; data: TaskData }
  | { type: "edit board"; data: BoardData }
  | { type: "create board" }
  | { type: null; data: null };

interface ModalState {
  type: ModalType;
  data: TaskData | BoardData | null;
  openModal: (modalData: ModalData) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  type: null,
  data: null,
  openModal: (modalData) => set(modalData),
  closeModal: () => set({ data: null, type: null }),
}));
