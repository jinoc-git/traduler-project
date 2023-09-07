import { create } from 'zustand';

interface SideBarStore {
  isSideBarOpen: boolean;
  isVisibleSideBar: boolean;
  isErrorPage: boolean;
  toggleMenu: () => void;
  setMenuIsOpen: (val: boolean) => void;
  setVisibilityIcon: (val: boolean) => void;
  setIsErrorPage: (val: boolean) => void;
}

export const sideBarStore = create<SideBarStore>((set) => ({
  isSideBarOpen: true,
  isVisibleSideBar: false,
  isErrorPage: false,
  toggleMenu: () => {
    set((state) => ({ isSideBarOpen: !state.isSideBarOpen }));
  },
  setMenuIsOpen: (val) => {
    set({ isSideBarOpen: val });
  },
  setVisibilityIcon: (val: boolean) => {
    set({ isVisibleSideBar: val });
  },
  setIsErrorPage: (val: boolean) => {
    set({ isErrorPage: val });
  },
}));
