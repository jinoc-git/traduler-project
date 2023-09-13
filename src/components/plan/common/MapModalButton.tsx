import React from 'react';
import { type UseFormHandleSubmit, type SubmitHandler } from 'react-hook-form';

import { type PinContentsType } from '@api/pins';
import { type InputType } from '@components/plan/addPlan/AddMapModal';

interface PropsType {
  handleSubmit: UseFormHandleSubmit<InputType, undefined>;
  onSubmitPlaceName: SubmitHandler<InputType>;
  closeModal: () => void;
  resetPin: () => void;
  disabledSubmit: () => boolean;
  pin: PinContentsType | null;
}

const MapModalButton = ({
  handleSubmit,
  onSubmitPlaceName,
  closeModal,
  resetPin,
  disabledSubmit,
  pin,
}: PropsType) => {
  return (
    <form
      onSubmit={handleSubmit(onSubmitPlaceName)}
      className="flex gap-[8px] h-[44px] items-center"
    >
      <button
        type="button"
        className="border border-navy text-navy rounded-lg px-[20px] py-[8px] w-[100%] mr-[8px] hover:bg-navy_light_1 duration-200"
        onClick={() => {
          closeModal();
          resetPin();
        }}
      >
        취소
      </button>
      <button
        type="submit"
        disabled={disabledSubmit()}
        className="bg-navy text-white rounded-lg hover:bg-navy_light_3 px-[20px] py-[8px] disabled:bg-gray w-[100%] duration-200"
        onClick={() => {
          handleSubmit(onSubmitPlaceName);
        }}
      >
        {pin !== null ? '수정하기' : '새 장소 추가'}
      </button>
    </form>
  );
};

export default MapModalButton;
