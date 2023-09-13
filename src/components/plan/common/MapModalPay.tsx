import React from 'react';
import { type UseFormRegister } from 'react-hook-form';

import { type InputType } from '@components/plan/addPlan/AddMapModal';

const MapModalPay = ({
  register,
}: {
  register: UseFormRegister<InputType>;
}) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor="cost"
        className="mb-2 text-sm font-semibold text-gray_dark_1"
      >
        지출 비용
      </label>
      <input
        id="cost"
        type="number"
        step={'10000'}
        min={0}
        max={10000000}
        placeholder="지출 비용을 입력해주세요."
        {...register('cost', {
          setValueAs(value) {
            return value === '' ? 0 : parseInt(value);
          },
          valueAsNumber: true,
        })}
        className="input-border
          sm:h-[44px] sm:text-sm sm:font-medium"
      />
    </div>
  );
};

export default MapModalPay;
