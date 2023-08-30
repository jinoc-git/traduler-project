import { create } from 'zustand';

interface ModifyStateStoreType {
  modifyState: '' | 'modify' | 'readOnly';
  setModify: () => void;
  setReadOnly: () => void;
}

export const modifyStateStore = create<ModifyStateStoreType>((set) => ({
  modifyState: '',
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
}));
