import React from 'react';
import { type UseFormRegister } from 'react-hook-form';

import { type MapModalInputType } from '../updatePlan/MapModal';

const MapModalPay = ({
  register,
  onChangeCost,
}: {
  register: UseFormRegister<MapModalInputType>;
  onChangeCost: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
        type="text"
        placeholder="지출 비용을 입력해주세요."
        {...register('cost', {
          onChange: onChangeCost,
          setValueAs(value) {
            return value === '' ? '0' : value;
          },
        })}
        className="input-border
          sm:h-[44px] sm:text-sm sm:font-medium"
      />
    </div>
  );
};

export default MapModalPay;
