import { create } from 'zustand';

interface TabMenuStore {
  selectedMenu: 'bookMark' | 'traveling' | 'planning' | 'end';
  setSelectedMenu: (
    plan: 'bookMark' | 'traveling' | 'planning' | 'end',
  ) => void;
}

export const tabMenuStore = create<TabMenuStore>((set) => ({
  selectedMenu: 'traveling',
  setSelectedMenu: (plan) => {
    set({ selectedMenu: plan });
  },
}));
