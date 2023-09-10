/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { type ReactNode } from 'react';

import { type PinContentsType } from '@api/pins';
import DropDown from '@components/plan/updatePlan/DropDown';
import useConfirm from '@hooks/useConfirm';

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
        sm:h-[102px] sm:translate-x-[15px]
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
        className="flex items-center justify-between border rounded-lg border-gray_dark_1 
      sm:w-[239px] sm:h-[65px] sm:mb-0 sm:mr-[2px] sm:px-[8px] sm:py-[17px] 
      md:w-pin_card md:h-pin_card md:mb-[10px] md:p-[30px] md:py-[8px]"
      >
        {!isEnding && children}
        <div
          className="flex flex-col text-left  text-gray_dark_1 w-[400px]
        sm:text-[11px]
        md:text-normal"
        >
          {pin !== null && typeof pin === 'object' && 'placeName' in pin && (
            <span className="font-bold">{pin.placeName}</span>
          )}
          {pin !== null && typeof pin === 'object' && 'address' in pin && (
            <span>{pin.address}</span>
          )}
          {/* {pin !== null && typeof pin === 'object' && 'cost' in pin && (
            <span>
              ￦
              {pin.cost !== null && pin.cost !== undefined
                ? formatNumberWithCommas(pin.cost)
                : ''}
            </span>
          )} */}
        </div>
        {!isEnding && updatePin && deletePin && (
          <DropDown>
            <ul className="absolute left-[40px] bottom-[-50px] border rounded-md bg-white z-10">
              <li
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                onClick={() => {
                  updatePin(idx);
                }}
                className="flex-center w-[80px] h-[40px] rounded-t-md border-b bg-white cursor-pointer hover:bg-gray_light_3"
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
                className="flex-center w-[80px] h-[40px] rounded-b-md bg-white cursor-pointer hover:bg-gray_light_3"
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
