import { type PinContentsType } from '@api/pins';
import { create } from 'zustand';

interface pinsStoreType {
  pins: PinContentsType[][];
  setPins: (data: PinContentsType[], idx: number) => void;
  resetPins: () => void;
}

export const pinsStore = create<pinsStoreType>((set) => ({
  pins: [],
  setPins: (data: PinContentsType[], idx: number) => {
    set((state) => {
      const updatedPins = [...state.pins];
      updatedPins[idx] = data;
      return { pins: updatedPins };
    });
  },
  resetPins: () => {
    set(() => ({
      pins: [],
    }));
  },
}));
