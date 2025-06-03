import { Task } from "@/types/board.types";
import { create } from "zustand";

type ModalType = "task" | "board" | null;

interface ModalState {
  type: ModalType;
  data: Task | null;
  openModal: (type: ModalType, data?: Task) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  type: null,
  data: null,
  openModal: (type, data) => set({ data, type }),
  closeModal: () => set({ data: null, type: null }),
}));
