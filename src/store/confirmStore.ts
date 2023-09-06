import { create } from 'zustand';

interface confirmStoreType {
  isOpen: boolean;
  title: string;
  desc: string;
  buttonText: string;
  func: () => void;
  openConfirm: (
    title: string,
    description: string,
    buttonText: string,
    func: () => void,
  ) => void;
  closeConfirm: () => void;
}

export const confirmStore = create<confirmStoreType>((set) => ({
  isOpen: false,
  title: '',
  desc: '',
  buttonText: '',
  func: () => {},
  openConfirm: (
    title: string,
    desc: string,
    buttonText: string,
    func: () => void,
  ) => {
    set(() => ({
      isOpen: true,
      title,
      desc,
      buttonText,
      func,
    }));
  },
  closeConfirm: () => {
    set(() => ({
      isOpen: false,
      title: '',
      desc: '',
    }));
  },
}));
