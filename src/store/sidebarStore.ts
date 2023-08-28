import { create } from 'zustand';

interface SideBarStore {
  isMenuOpen: boolean;
  isVisibleSideBar: boolean;
  toggleMenu: () => void;
  setVisibilityIcon: (val: boolean) => void;
}

export const useSidebarStore = create<SideBarStore>((set) => ({
  isMenuOpen: true,
  isVisibleSideBar: false,
  toggleMenu: () => {
    set((state) => ({ isMenuOpen: !state.isMenuOpen }));
  },
  setVisibilityIcon: (val: boolean) => {
    set({ isVisibleSideBar: val });
  },
}));
