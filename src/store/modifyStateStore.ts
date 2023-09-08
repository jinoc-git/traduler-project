import { create } from 'zustand';

interface ModifyStateStoreType {
  modifyState: 'modify' | 'readOnly';
  requiredDates: {
    start: boolean;
    end: boolean;
  };
  setModify: () => void;
  setReadOnly: () => void;
  setRequiredDates: (type: 'start' | 'end') => void;
  clearRequiredDates: () => void;
}

export const modifyStateStore = create<ModifyStateStoreType>((set, get) => ({
  modifyState: 'readOnly',
  requiredDates: {
    start: false,
    end: false,
  },
  setModify: () => {
    set(() => ({
      modifyState: 'modify',
    }));
  },
  setReadOnly: () => {
    set(() => ({
      modifyState: 'readOnly',
    }));
  },
  setRequiredDates: (type: 'start' | 'end') => {
    const current = get().requiredDates;
    if (type === 'start') {
      set({
        requiredDates: {
          ...current,
          start: true,
        },
      });
    } else {
      set({
        requiredDates: {
          ...current,
          end: true,
        },
      });
    }
  },
  clearRequiredDates: () => {
    set({
      requiredDates: {
        start: false,
        end: false,
      },
    });
  },
}));
