import React from 'react';

import { confirmStore } from '@store/confirmStore';

import ComfirmModalLayout from './ComfirmModalLayout';

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
    <ComfirmModalLayout>
      <div className="text-lg font-bold text-navy_dark">{title}</div>
      <div className=" text-gray_dark_1 md:mb-6 sm:mb-3">{desc}</div>
      <div className="flex justify-center">
        <button
          onClick={closeConfirm}
          className="border border-navy text-navy rounded-lg  hover:bg-navy_light_1 duration-200
          md:px-[20px] md:py-[14px] md:w-[210px] md:mr-[24px]
          sm:px-[10px] sm:py-[7px] sm:w-[105px] sm:mr-[12px]
          "
        >
          취소
        </button>
        <button
          onClick={handleConfirm}
          className="bg-navy text-white rounded-lg hover:bg-navy_light_3 disabled:bg-grayduration-200
          md:px-[20px] md:py-[14px] md:w-[210px]
          sm:px-[10px] sm:py-[7px] sm:w-[105px] 
          "
        >
          {button()}
        </button>
      </div>
    </ComfirmModalLayout>
  );
};

export default ConfirmModal;
