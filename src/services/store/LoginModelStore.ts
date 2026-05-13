import { create, StateCreator } from "zustand";

type LoginModelStore = {
  isLoginSelected: boolean;
  isOpen: boolean;
  setIsLoginSelected: (value: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
  openLoginModel: () => void;
  openRegisterModel: () => void;
};

const createStore: StateCreator<LoginModelStore> = (set) => ({
  isLoginSelected: true,
  setIsLoginSelected: (isLoginSelected) => set({ isLoginSelected }),
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  openLoginModel: () => set({ isOpen: true, isLoginSelected: true }),
  openRegisterModel: () => set({ isOpen: true, isLoginSelected: false }),
});

export const useLoginModelStore = create<LoginModelStore>(createStore);