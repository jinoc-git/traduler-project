import React from 'react';
import { type FieldErrors, type UseFormRegister } from 'react-hook-form';

import IconWallet from '@assets/icons/IconWallet';
import { modifyStateStore } from '@store/modifyStateStore';

import PayLayout from './PayLayout';

interface InputType {
  totalCost?: number;
}

interface PropsType {
  register: UseFormRegister<InputType>;
  errors?: FieldErrors<InputType>;
}

const Pay = ({ register, errors }: PropsType) => {
  const modifyState = modifyStateStore((state) => state.modifyState);
  return (
    <PayLayout>
      <IconWallet w="20" h="18" fill="#4E4F54" />
      <div className=" mr-[51px] ml-[8px]">전체 예산</div>
      <input
        id="totalCost"
        type="number"
        placeholder="예산을 입력하세요."
        readOnly={modifyState === 'readOnly'}
        {...register('totalCost', {
          required: '예산은 필수입니다.',
        })}
        className="text-[14px] font-medium border rounded-lg px-[16px] outline-none w-[150px] h-[30px] border-gray read-only:cursor-default"
      />
      <p className="h-[20px] pt-1.5 text-sm">{errors?.totalCost?.message}</p>
    </PayLayout>
  );
};

export default Pay;
