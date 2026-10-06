import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";

export interface UserInfo {
  userId: string;
  email?: string;
  role?: string;
}

export interface State {
  userInfo: UserInfo | null;
  isAuthenticated: boolean;
}

interface Actions {
  setUserInfo: (user: UserInfo) => void;
  clearUserInfo: () => void;
}

const initialState: State = {
  userInfo: null,
  isAuthenticated: false,
};

const useAuthGuardStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      ...initialState,

      setUserInfo: (user) =>
        set((state) => {
          state.userInfo = user;
          // if user is not null, then user is authenticated is true
          state.isAuthenticated = Boolean(user);
        }),

      clearUserInfo: () => set(initialState),
    })),
    {
      name: "auth-guard", // key for localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthGuardStore;
