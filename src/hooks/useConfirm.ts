import { confirmStore } from '@store/confirmStore';

const useConfirm = () => {
  const { openConfirm } = confirmStore();
  const confirm = {
    default: (title: string, desc: string, func: () => void) => {
      openConfirm(title, desc, 'default', func);
    },
    modify: (title: string, desc: string, func: () => void) => {
      openConfirm(title, desc, 'modify', func);
    },
    delete: (title: string, desc: string, func: () => void) => {
      openConfirm(title, desc, 'delete', func);
    },
  };
  return { confirm };
};

export default useConfirm;
