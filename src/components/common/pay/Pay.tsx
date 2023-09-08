/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { type FieldErrors, type UseFormRegister } from 'react-hook-form';

import IconWallet from '@assets/icons/IconWallet';
import PayLayout from '@components/common/layout/PayLayout';
import { type InputType } from '@pages/AddPlan';
import { modifyStateStore } from '@store/modifyStateStore';
import { formatNumberWithCommas } from '@utils/calcDutchPay';

interface PropsType {
  register: UseFormRegister<InputType>;
  errors?: FieldErrors<InputType>;
  total_Cost?: number;
}

const Pay = ({ total_Cost, register, errors }: PropsType) => {
  const modifyState = modifyStateStore((state) => state.modifyState);

  return (
    <PayLayout>
      <div className="flex items-center">
        <IconWallet w="w-[20px]" h="h-[18px]" fill="#4E4F54" />
        <p className=" mr-[51px] ml-[8px]">전체 예산</p>
        {modifyState === 'readOnly' ? (
          <p
            id="totalCost"
            className="text-[14px] font-medium border rounded-lg px-[16px] outline-none w-[150px] border-gray read-only:cursor-default read-only:border-none read-only:text-normal read-only:font-semibold"
          >
            {total_Cost !== undefined
              ? formatNumberWithCommas(total_Cost) + ' 원'
              : null}
          </p>
        ) : (
          <div className="relative flex flex-col mt-[10px]">
            <input
              id="totalCost"
              type="number"
              step={'10000'}
              min={0}
              max={10000000}
              placeholder="예산을 입력하세요."
              {...register('totalCost', {
                required: '예산은 필수입니다.',
                setValueAs(value) {
                  return value === '' ? 0 : parseInt(value);
                },
              })}
              className="text-[14px] font-medium border rounded-lg px-[16px] outline-none w-[150px] h-[30px] border-gray read-only:cursor-default read-only:border-none read-only:text-normal read-only:font-semibold"
            />
            <span className=" absolute right-[-20px] top-[3px]">원</span>
            <p className="h-[10px] pl-2 pt-1 text-xs text-red-600">
              {errors?.totalCost?.message}
            </p>
          </div>
        )}
      </div>
    </PayLayout>
  );
};

export default Pay;
