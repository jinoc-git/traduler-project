import { create } from 'zustand';

interface ScreenStore {
  screenSize: 'sm' | 'md' | 'lg' | '';
  setScreenSize: (
    size: 'sm' | 'md' | 'lg',
  ) => void;
}

export const screenStore = create<ScreenStore>((set) => ({
  screenSize: '',
  setScreenSize: (size) => {
    set({ screenSize: size });
  },
}));
