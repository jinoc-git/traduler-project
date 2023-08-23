import { type PinContentsType } from '@api/pins';
import { create } from 'zustand';

interface pinsStoreType {
  pins: PinContentsType[][];
  idx: number;
  setPins: (data: PinContentsType[], idx: number) => void;
  resetPins: () => void;
}

export const pinsStore = create<pinsStoreType>((set) => ({
  pins: [],
  idx: 0,
  setPins: (data: PinContentsType[], idx: number) => {
    set((state) => {
      const updatedPins = [...state.pins];
      updatedPins[idx] = data;
      return { pins: updatedPins, idx };
    });
  },
  resetPins: () => {
    set(() => ({
      pins: [],
      idx: 0,
    }));
  },
}));
