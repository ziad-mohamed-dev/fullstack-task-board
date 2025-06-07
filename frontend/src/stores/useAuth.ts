import { create } from "zustand";

export const useAuth = create<AuthStore>((set) => ({
  isAuth: null,
  setAuth: (isAuth) => set({ isAuth }),
}));
