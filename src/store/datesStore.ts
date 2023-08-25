import { create } from 'zustand';

interface datesStoreType {
  dates: string[];
  setDates: (data: string[]) => void;
  resetDates: () => void;
}

export const datesStore = create<datesStoreType>((set) => ({
  dates: [],
  setDates: (data: string[]) => {
    set(() => ({
      dates: data,
    }));
  },
  resetDates: () => {
    set(() => ({
      dates: [],
    }));
  },
}));
