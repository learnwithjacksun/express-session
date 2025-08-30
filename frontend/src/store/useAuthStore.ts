import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IAuthState {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "auth",
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);

export default useAuthStore;
