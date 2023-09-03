import React, { type ReactNode } from 'react';

import { type PinContentsType } from '@api/pins';

import DropDown from './updatePlan/DropDown';

interface PropsType {
  pin: PinContentsType;
  idx: number;
  updatePin: (idx: number) => void;
  deletePin: (idx: number) => void;
  children?: ReactNode;
}

const PinLayout = ({ pin, idx, updatePin, deletePin, children }: PropsType) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="absolute translate-x-[17.5px] -z-10 border border-l-black h-[116px]" />
      <p className="rounded-full bg-gradient-to-r from-[#5E9fff] from-0% to-[#1a68db] via-100%  w-[35px] h-[35px] text-center font-semibold text-white border-[5px] border-white">
        {idx + 1}
      </p>
      <div className="flex items-center justify-between border rounded-lg w-pin_card h-pin_card border-gray_dark_1 p-[30px] py-[8px] mb-[10px]">
        {children}
        <div className="flex flex-col text-normal text-gray_dark_1 ">
          {pin !== null && typeof pin === 'object' && 'placeName' in pin && (
            <span className="font-bold">{pin.placeName}</span>
          )}
          {pin !== null && typeof pin === 'object' && 'cost' in pin && (
            <span>￦{pin.cost}</span>
          )}
        </div>
        <DropDown>
          <ul className="absolute left-0 bottom-[-60px] rounded-md bg-white">
            <li
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              onClick={() => {
                updatePin(idx);
              }}
              className="flex-center w-[80px] h-[40px] border rounded-t-md cursor-pointer"
            >
              수정
            </li>
            <li
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              onClick={() => {
                deletePin(idx);
              }}
              className="flex-center w-[80px] h-[40px] border rounded-b-md cursor-pointer"
            >
              삭제
            </li>
          </ul>
        </DropDown>
      </div>
    </div>
  );
};

export default PinLayout;
