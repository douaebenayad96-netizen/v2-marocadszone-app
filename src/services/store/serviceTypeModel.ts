import { create, StateCreator } from "zustand"

type serviceTypeModelStore = {
  isServiceTypeModelOpen: boolean
  openServiceTypeModel: () => void
  closeServiceTypeModel: () => void
  setServiceTypeModelOpen: (isOpen: boolean) => void
}

const createStore: StateCreator<serviceTypeModelStore> = (set) => ({
  isServiceTypeModelOpen: false,
  openServiceTypeModel: () => set({ isServiceTypeModelOpen: true }),
  closeServiceTypeModel: () => set({ isServiceTypeModelOpen: false }),
  setServiceTypeModelOpen: (isOpen) => set({ isServiceTypeModelOpen: isOpen }),
})

export const useServiceTypeModelStore = create<serviceTypeModelStore>(createStore)