import React from 'react';

import ModalLayout from '@components/plan/ModalLayout';
import { confirmStore } from '@store/confirmStore';

enum ButtonText {
  modify = '수정하기',
  delete = '삭제하기',
}

// interface PropsType {
//   title: string;
//   description: string;
//   buttonText?: 'modify' | 'delete';
//   confirmFunc: () => void;
// }

const ConfirmModal = () => {
  const { title, desc, func, closeConfirm, buttonText } = confirmStore();

  const handleConfirm = () => {
    func();
    closeConfirm();
  };

  const button =
    buttonText === 'modify' ? ButtonText.modify : ButtonText.delete ?? '확인';

  return (
    <ModalLayout>
      <div>{title}</div>
      <div>{desc}</div>
      <button onClick={closeConfirm}>취소</button>
      <button onClick={handleConfirm}>{button}</button>
    </ModalLayout>
  );
};

export default ConfirmModal;
