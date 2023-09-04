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
      <div className="flex items-center">
        <IconWallet w="20" h="18" fill="#4E4F54" />
        <p className=" mr-[51px] ml-[8px]">전체 예산</p>
        <div className="flex flex-col mt-[10px]">
          <input
            id="totalCost"
            type="number"
            placeholder="예산을 입력하세요."
            readOnly={modifyState === 'readOnly'}
            {...register('totalCost', {
              required: '예산은 필수입니다.',
            })}
            className="text-[14px] font-medium border rounded-lg px-[16px] outline-none w-[150px] h-[30px] border-gray read-only:cursor-default read-only:border-none read-only:text-normal read-only:font-semibold"
          />
          <p className="h-[10px] pl-2 pt-1 text-xs text-red-600">
            {errors?.totalCost?.message}
          </p>
        </div>
      </div>
    </PayLayout>
  );
};

export default Pay;
