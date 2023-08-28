import { create } from 'zustand';

interface SideBarStore {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export const useSidebarStore = create<SideBarStore>((set) => ({
  isMenuOpen: true,

  toggleMenu: () => {
    set((state) => ({ isMenuOpen: !state.isMenuOpen }));
  },
}));
