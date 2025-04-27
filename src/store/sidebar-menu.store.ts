import { create } from "zustand";

type State = {
  isOpen: boolean;
};

type Action = {
  handleOpen: VoidFunction;
};

export const useSidebarMenuStore = create<State & Action>((set, get) => ({
  isOpen: true,
  handleOpen: () => {
    set(() => ({ isOpen: !get().isOpen }));
  },
}));
