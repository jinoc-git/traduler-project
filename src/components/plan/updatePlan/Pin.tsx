import React from 'react';

import { type PinContentsType } from '@api/pins';
import IconSixDots from '@assets/icons/IconSixDots';

import DropDown from './DropDown';

interface PinProps {
  pin: PinContentsType;
  idx: number;
  betweenDistanceData: string;
  pinArrLength: number;
  handleUpdate: (idx: number) => void;
  handleDelete: (idx: number) => void;
}

const Pin = (props: PinProps) => {
  const {
    pin,
    idx,
    betweenDistanceData,
    pinArrLength,
    handleUpdate,
    handleDelete,
  } = props;

  return (
    <li className=" flex gap-[10px] h-[100px]">
      <div className="w-[65px]">
        <p>{idx + 1}</p>
        {idx < pinArrLength - 1 && (
          <div>
            <p>{betweenDistanceData}km</p>
          </div>
        )}
      </div>
      <div className="flex w-full border">
        <button className=" flex justify-center items-center w-[50px] m-3">
          <IconSixDots fill="orange" />
        </button>
        <div className="flex flex-col justify-center gap-2 w-full">
          <p>
            {pin !== null && typeof pin === 'object' && 'placeName' in pin && (
              <span>{pin.placeName as string}</span>
            )}
          </p>
          <p>
            {pin !== null && typeof pin === 'object' && 'cost' in pin && (
              <span>￦{pin.cost}</span>
            )}
          </p>
        </div>
        <div className="flex items-center ">
          <DropDown>
            <ul className="absolute left-0 bottom-[-60px] rounded-md bg-white">
              <li
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                onClick={() => {
                  handleUpdate(idx);
                }}
                className=" flex justify-center items-center w-[80px] h-[40px] border rounded-t-md cursor-pointer"
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
                className=" flex justify-center items-center w-[80px] h-[40px] border rounded-b-md cursor-pointer"
              >
                삭제
              </li>
            </ul>
          </DropDown>
        </div>
      </div>
    </li>
  );
};

export default Pin;
