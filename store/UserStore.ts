import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  userName: string;
  setUserName: (name: string) => void;
  balance: number | null;
  setBalance: (b: number) => void;
};

export const useAppStore = create<State>()(
  persist(
    (set) => ({
      userName: "",
      setUserName: (name) => set({ userName: name }),
      balance: null,
      setBalance: (balance) => set({ balance }),
    }),
    { name: "cave-bank" },
  ),
);
