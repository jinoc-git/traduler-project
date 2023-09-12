/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { type ReactNode } from 'react';

import { type PinContentsType } from '@api/pins';
import IconDeleteSolid from '@assets/icons/IconDeleteSolid';
import IconEditSolid from '@assets/icons/IconEditSolid';
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
        sm:h-[102px] sm:translate-x-[15px] 
        md:h-[147px] md:translate-x-[17.5px] md:translate-y-[0px]"
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
      sm:w-[239px] sm:h-[80px] sm:mb-0 sm:mr-[2px] sm:px-0 sm:py-[17px] 
      md:w-pin_card md:h-pin_card md:mb-[10px] md:px-[15px] md:py-[8px]"
      >
        <div className="w-[20px] md:hidden"></div>
        {!isEnding && children}
        <div
          className={`flex flex-col text-left  text-gray_dark_1 w-[400px] gap-y-[2px]
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
          {pin !== null && typeof pin === 'object' && 'cost' in pin && (
            <span>
              {pin.cost !== null && pin.cost !== undefined
                ? formatNumberWithCommas(pin.cost) + ' 원'
                : ''}
            </span>
          )}
        </div>
        {!isEnding && updatePin && deletePin && (
          <DropDown>
            <ul
              className="absolute border border-gray_dark_1  bg-white z-10 overflow-hidden
              md:left-[40px] md:bottom-[-50px] md:text-[16px] md:w-[100px] md:rounded-md
              sm:left-[-22px] sm:bottom-[-27px] sm:text-[10px] sm:h-[80px] sm:w-[45px] sm:rounded-l-none sm:rounded-r-md
            "
            >
              <li
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                onClick={() => {
                  updatePin(idx);
                }}
                className="flex-center border-b border-gray_dark_1 cursor-pointer hover:bg-gray_light_3
                md:w-[100px] md:h-[40px]
                sm:w-[45px] sm:h-[40px]
                "
              >
                <div className="flex items-center">
                  <IconEditSolid w="w-[10px]" h="h-[10px]" fill="#6E6F76" />
                  <span className="ml-[3px] md:ml-[20px]">수정</span>
                </div>
              </li>
              <li
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                onClick={() => {
                  handleDelete(idx);
                }}
                className="flex-center border-b border-gray_dark_1 cursor-pointer hover:bg-gray_light_3
                md:w-[100px] md:h-[40px]
                sm:w-[45px] sm:h-[40px]
                "
              >
                <div className="flex items-center">
                  <IconDeleteSolid w="w-[10px]" h="h-[10px]" fill="#6E6F76" />
                  <span className="ml-[3px] md:ml-[20px]">삭제</span>
                </div>
              </li>
            </ul>
          </DropDown>
        )}
      </div>
    </div>
  );
};

export default PinLayout;
