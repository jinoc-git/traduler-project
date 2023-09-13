import { type PinContentsType } from '@api/pins';
import { create } from 'zustand';

interface updatePinStoreType {
  pin: PinContentsType | null;
  idx: number;
  updateClick: (data: PinContentsType, idx: number) => void;
  resetPin: () => void;
}

export const updatePinStore = create<updatePinStoreType>((set) => ({
  pin: null,
  idx: 0,
  updateClick: (data: PinContentsType, idx: number) => {
    set(() => ({
      pin: {
        lat: data.lat,
        lng: data.lng,
        placeName: data.placeName,
        cost: data.cost,
      },
      idx,
    }));
  },
  resetPin: () => {
    set(() => ({
      pin: null,
      idx: 0,
    }));
  },
}));
