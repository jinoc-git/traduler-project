import React from 'react';
import {
  type SubmitHandler,
  type FieldErrors,
  type UseFormRegister,
} from 'react-hook-form';

interface InputType {
  address?: string;
  placeName?: string;
  cost?: number;
}

interface PropsType {
  register: UseFormRegister<InputType>;
  errors: FieldErrors<InputType>;
  debouncedFunc: _.DebouncedFunc<SubmitHandler<InputType>>;
}

const MapModalInput = ({ register, errors, debouncedFunc }: PropsType) => {
  return (
    <>
      <div className="text-[20px] font-bold mb-[-8px]">방문할 장소</div>
      <div className="text-[16px] font-normal mb-[4px]">
        방문할 장소와 관련된 정보를 저장하세요.
      </div>
      <div className="flex flex-col">
        <label htmlFor="placeName" className="mb-2">
          장소 이름
        </label>
        <input
          id="placeName"
          type="text"
          placeholder="장소 이름을 입력하세요"
          {...register('placeName', {
            required: '장소 이름은 필수 입력값입니다.',
            minLength: {
              value: 2,
              message: '장소 이름은 2자 이상이어야 합니다.',
            },
            pattern: {
              value: /^[가-힣|a-z|A-Z|0-9|\s-]*$/,
              message: '모음, 자음 안됨',
            },
          })}
          className="input-border"
        />
        <p>{errors?.placeName?.message}</p>
      </div>
      <div className="flex flex-col">
        <label htmlFor="address" className="mb-2">
          주소
        </label>
        <input
          id="address"
          type="text"
          placeholder="주소를 검색하세요"
          {...register('address', {
            required: '주소를 입력하고 검색해주세요.',
            minLength: {
              value: 2,
              message: '주소는 2글자 이상이어야 합니다.',
            },
            pattern: {
              value: /^[가-힣|0-9|\s-]*$/,
              message: '모음, 자음 안됨',
            },
          })}
          onChange={(e) => debouncedFunc({ address: e.target.value })}
          className="input-border"
        />
        <p>{errors?.address?.message}</p>
      </div>
      <div className="flex flex-col">
        <label htmlFor="cost" className="mb-2">
          지출 비용
        </label>
        <input
          id="cost"
          type="number"
          placeholder="지출 비용을 입력해주세요."
          {...register('cost', {
            valueAsNumber: true, // 이 부분 추가하여 문자열이 아닌 숫자 값으로 등록
          })}
          className="input-border"
        />
      </div>
    </>
  );
};

export default MapModalInput;
