import React from 'react';

import ModalLayout from '@components/plan/addPlan/ModalLayout';
import { confirmStore } from '@store/confirmStore';

enum ButtonText {
  modify = '수정하기',
  delete = '삭제하기',
  defalut = '확인',
}

const ConfirmModal = () => {
  const { title, desc, func, closeConfirm, buttonText } = confirmStore();

  const handleConfirm = () => {
    func();
    closeConfirm();
  };

  const button = () => {
    switch (buttonText) {
      case 'modify':
        return ButtonText.modify;
      case 'delete':
        return ButtonText.delete;
      default:
        return ButtonText.defalut;
    }
  };

  return (
    <ModalLayout>
      <div className="text-lg font-bold text-navy_dark">{title}</div>
      <div className="mb-6 text-gray_dark_1">{desc}</div>
      <div className="flex">
        <button
          onClick={closeConfirm}
          className="border border-navy text-navy rounded-lg px-[20px] py-[14px] w-[210px] mr-[24px] hover:bg-navy_light_1 duration-200"
        >
          취소
        </button>
        <button
          onClick={handleConfirm}
          className="bg-navy text-white rounded-lg hover:bg-navy_light_3  px-[20px] py-[14px] disabled:bg-gray w-[210px] duration-200"
        >
          {button()}
        </button>
      </div>
    </ModalLayout>
  );
};

export default ConfirmModal;
