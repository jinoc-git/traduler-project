/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { type ReactNode } from 'react';

import { type PinContentsType } from '@api/pins';
import useConfirm from '@hooks/useConfirm';
import { formatNumberWithCommas } from '@utils/calcDutchPay';

import DropDown from './updatePlan/DropDown';

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
    <div className="relative flex items-center justify-between gap-4">
      <div className="flex items-center">
        <div className="absolute translate-x-[17.5px] -z-10 border border-l-black h-[116px]" />
        <p className="rounded-full bg-gradient-to-r from-[#5E9fff] from-0% to-[#1a68db] via-100%  w-[35px] h-[35px] text-center font-semibold text-white border-[5px] border-white">
          {idx + 1}
        </p>
      </div>
      {isEnding && children}
      <div className="flex items-center justify-between border rounded-lg w-pin_card h-pin_card border-gray_dark_1 p-[30px] py-[8px] mb-[10px]">
        {!isEnding && children}
        <div className="flex flex-col text-left text-normal text-gray_dark_1 w-[400px]">
          {pin !== null && typeof pin === 'object' && 'placeName' in pin && (
            <span className="font-bold">{pin.placeName}</span>
          )}
          {pin !== null && typeof pin === 'object' && 'cost' in pin && (
            <span>
              ￦
              {pin.cost !== null && pin.cost !== undefined
                ? formatNumberWithCommas(pin.cost)
                : ''}
            </span>
          )}
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
