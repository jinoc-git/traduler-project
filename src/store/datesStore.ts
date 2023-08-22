import { create } from 'zustand';

interface datesStoreType {
  dates: string[] | null;
  setDates: (data: string[]) => void;
  resetDates: () => void;
}

export const datesStore = create<datesStoreType>((set) => ({
  dates: null,
  setDates: (data: string[]) => {
    set(() => ({
      dates: data,
    }));
  },
  resetDates: () => {
    set(() => ({
      dates: null,
    }));
  },
}));
