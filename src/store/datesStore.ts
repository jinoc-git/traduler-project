import { create } from 'zustand';

interface datesStoreType {
  oldDates: string[];
  dates: string[];
  setDates: (data: string[]) => void;
  resetDates: () => void;
}

export const datesStore = create<datesStoreType>((set) => ({
  oldDates: [],
  dates: [],
  setDates: (data: string[]) => {
    set((state) => ({
      oldDates: state.dates,
      dates: data,
    }));
  },
  resetDates: () => {
    set(() => ({
      oldDates: [],
      dates: [],
    }));
  },
}));
