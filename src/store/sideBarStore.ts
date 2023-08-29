import { create } from 'zustand';

interface SideBarStore {
  isSideBarOpen: boolean;
  isVisibleSideBar: boolean;
  toggleMenu: () => void;
  setVisibilityIcon: (val: boolean) => void;
}

export const sideBarStore = create<SideBarStore>((set) => ({
  isSideBarOpen: true,
  isVisibleSideBar: false,
  toggleMenu: () => {
    set((state) => ({ isSideBarOpen: !state.isSideBarOpen }));
  },
  setVisibilityIcon: (val: boolean) => {
    set({ isVisibleSideBar: val });
  },
}));
