import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

import { AuthResponse } from "../types/auth";
import { User } from "../types/user";

type AuthStore = {
  token: string | null;
  user: User | null;
  logout: () => void;
  signIn: (data: AuthResponse, rememberMe: boolean) => void;
  setUser: (data: User) => void;
};

const createStore: StateCreator<AuthStore> = (set) => ({
  token: null,
  user: null,
  logout: () => {
    set({ token: null, user: null });
  },
  signIn: (response) => {
  const payload = response.data ?? response;

  set({
    token: payload.token,
    user: payload.user,
  });
},
  setUser: (data: User) => {
    set({ user: data });
  },
});

export const useAuthStore = create<AuthStore>()(
  persist(createStore, {
    name: "auth-storage",
    getStorage: () => localStorage,
  })
);