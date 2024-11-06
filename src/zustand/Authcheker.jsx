import { create } from "zustand";

const AuthCheck = create((set) => ({
  check: false,
  changeTrue: () => set({ check: true }),
  changeFalse: () => set({ check: false }),
}));

export default AuthCheck;
