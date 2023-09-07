import { create } from 'zustand';

interface SideBarStore {
  isSideBarOpen: boolean;
  isVisibleSideBar: boolean;

  isNotFoundPage: boolean;
  toggleMenu: () => void;
  setMenuIsOpen: (val: boolean) => void;
  setVisibilityIcon: (val: boolean) => void;

  setIsNotFoundPage: (val: boolean) => void;
}

export const sideBarStore = create<SideBarStore>((set) => ({
  isSideBarOpen: true,
  isVisibleSideBar: false,
  isErrorPage: false,
  isNotFoundPage: false,

  toggleMenu: () => {
    set((state) => ({ isSideBarOpen: !state.isSideBarOpen }));
  },
  setMenuIsOpen: (val) => {
    set({ isSideBarOpen: val });
  },
  setVisibilityIcon: (val: boolean) => {
    set({ isVisibleSideBar: val });
  },

  setIsNotFoundPage: (val: boolean) => {
    set({ isNotFoundPage: val });
  },
}));
