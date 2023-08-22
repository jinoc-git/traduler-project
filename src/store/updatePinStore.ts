import { type PinContentsType } from '@api/pins';
import { create } from 'zustand';

interface updatePinStoreType {
  pin: PinContentsType | null;
  updateClick: (data: PinContentsType) => void;
  resetPin: () => void;
}

export const updatePinStore = create<updatePinStoreType>((set) => ({
  pin: null,
  updateClick: (data: PinContentsType) => {
    set(() => ({
      pin: {
        lat: data.lat,
        lng: data.lng,
        placeName: data.placeName,
      },
    }));
  },
  resetPin: () => {
    set(() => ({
      pin: null,
    }));
  },
}));
