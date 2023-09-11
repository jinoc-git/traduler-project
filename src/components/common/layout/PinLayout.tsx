/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { type ReactNode } from 'react';

import { type PinContentsType } from '@api/pins';
import DropDown from '@components/plan/updatePlan/DropDown';
import useConfirm from '@hooks/useConfirm';
import { formatNumberWithCommas } from '@utils/calcDutchPay';

interface PropsType {
  pin: PinContentsType | [];
  idx: number;
  updatePin?: (idx: number) => void;
  deletePin?: (idx: number) => void;
  children?: ReactNode;
  isEnding: boolean;
}

const PinLayout = ({
  pin,
  idx,
  updatePin,
  deletePin,
  children,
  isEnding,
}: PropsType) => {
  const { confirm } = useConfirm();

  const handleDelete = (idx: number) => {
    const confTitle = '장소 삭제';
    const confDesc =
      '삭제한 장소는 다시 복구할 수 없습니다. 정말로 삭제하시겠습니까?';
    const confFunc = () => {
      if (deletePin) {
        deletePin(idx);
      }
    };
    confirm.delete(confTitle, confDesc, confFunc);
  };

  return (
    <div
      className="relative flex items-center justify-between gap-4
    sm:w-[286px] sm:mb-[37px]
    md:w-[651px] md:mx-[25px]"
    >
      <div className="flex items-center">
        <div
          className="absolute -z-10 border border-l-black 
        sm:h-[82px] sm:translate-x-[15px] 
        md:h-[147px] md:translate-x-[17.5px]"
        />
        <p
          className="rounded-full bg-gradient-to-r from-[#5E9fff] from-0% to-[#1a68db] via-100%  text-center font-semibold text-white border-[5px] border-white
        sm:w-[30px] sm:h-[30px] sm:text-sm
        md:w-[35px] md:h-[35px] md:text-normal"
        >
          {idx + 1}
        </p>
      </div>
      {isEnding && children}
      <div
        className="relative flex items-center justify-between border rounded-lg border-gray_dark_1 
      sm:w-[239px] sm:h-[65px] sm:mb-0 sm:mr-[2px] sm:px-0 sm:py-[17px] 
      md:w-pin_card md:h-pin_card md:mb-[10px] md:px-[15px] md:py-[8px]"
      >
        {!isEnding && children}
        <div
          className={`flex flex-col text-left  text-gray_dark_1 w-[400px]
        sm:text-[11px]
        md:text-normal
        ${isEnding ? 'ml-[15px]' : ''}
        `}
        >
          {pin !== null && typeof pin === 'object' && 'placeName' in pin && (
            <span className="font-bold">{pin.placeName}</span>
          )}
          {pin !== null && typeof pin === 'object' && 'address' in pin && (
            <span>{pin.address}</span>
          )}
          {isEnding && pin !== null && typeof pin === 'object' && 'cost' in pin &&  (
            <span className=' absolute top-[5px] right-[10px]'>
            
              {pin.cost !== null && pin.cost !== undefined
                ? formatNumberWithCommas(pin.cost) + ' 원'
                : ''}
            </span>
          )}
        </div>
        {!isEnding && updatePin && deletePin && (
          <DropDown>
            <ul
              className="absolute border rounded-md bg-white z-10 
              md:left-[40px] md:bottom-[-50px] md:text-[16px]
              sm:left-[20px] sm:bottom-[-25px] sm:text-[12px]
            "
            >
              <li
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                onClick={() => {
                  updatePin(idx);
                }}
                className="flex-center rounded-t-md border-b bg-white cursor-pointer hover:bg-gray_light_3
                md:w-[80px] md:h-[40px]
                sm:w-[40px] sm:h-[20px]
                "
              >
                수정
              </li>
              <li
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                onClick={() => {
                  handleDelete(idx);
                }}
                className="flex-center rounded-b-md bg-white cursor-pointer hover:bg-gray_light_3
                md:w-[80px] md:h-[40px]
                sm:w-[40px] sm:h-[20px]
                "
              >
                삭제
              </li>
            </ul>
          </DropDown>
        )}
      </div>
    </div>
  );
};

export default PinLayout;
