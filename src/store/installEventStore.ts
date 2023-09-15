import { create } from 'zustand';

interface InstallEventStore {
  installEvent: any;
  setEvent: (event: Event | null) => void;
}

export const installEventStore = create<InstallEventStore>((set) => ({
  installEvent: null,
  setEvent: (event: Event | null) => {
    set(() => ({
      installEvent: event,
    }));
  },
}));
