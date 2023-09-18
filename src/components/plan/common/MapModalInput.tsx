import React from 'react';
import { type FieldErrors, type UseFormRegister } from 'react-hook-form';

import _ from 'lodash';

import { type MapModalInputType } from '../updatePlan/MapModal';

interface PropsType {
  register: UseFormRegister<MapModalInputType>;
  errors: FieldErrors<MapModalInputType>;
  searchMap: (address: string) => void;
}

const MapModalInput = ({ register, errors, searchMap }: PropsType) => {
  const debouncedSearchMap = _.debounce(searchMap, 500);

  return (
    <div>
      <div>
        <div className="mb-[8px] text-navy text-lg font-bold">방문할 장소</div>
        <div className="text-[16px] font-normal mb-[16px]">
          방문할 장소와 관련된 정보를 저장하세요.
        </div>
      </div>
      <div>
        <div className="flex flex-col">
          <label htmlFor="placeName" className="mb-2 text-sm font-semibold">
            장소 이름
          </label>
          <input
            id="placeName"
            type="text"
            placeholder="장소 이름을 입력하세요"
            {...register('placeName', {
              required: '장소 이름은 필수 입력값입니다.',
              minLength: {
                value: 1,
                message: '장소 이름은 1자 이상이어야 합니다.',
              },
              maxLength: {
                value: 12,
                message: '장소 이름은 12자 이하여야 합니다.',
              },
              pattern: {
                value: /^[가-힣|a-z|A-Z|0-9|\s-]*$/,
                message: '모음, 자음 안됨',
              },
            })}
            className="input-border
            sm:h-[44px] sm:text-sm sm:font-medium"
          />
          <p className="text-red-400 text-[12px] h-[24px] my-[5px]">
            {errors?.placeName?.message}
          </p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="address" className="mb-2 text-sm font-semibold">
            주소
          </label>
          <input
            id="address"
            type="text"
            placeholder="주소를 검색하세요"
            {...register('address', {
              pattern: {
                value: /^[가-힣|0-9|\s-]*$/,
                message: '모음, 자음 안됨',
              },
            })}
            onChange={(e) => {
              debouncedSearchMap(e.target.value);
            }}
            className="input-border
            sm:h-[44px] sm:text-sm sm:font-medium"
          />
          <p>{errors?.address?.message}</p>
        </div>
      </div>
    </div>
  );
};

export default MapModalInput;
