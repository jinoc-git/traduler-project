/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';

import { type PinContentsType } from '@api/pins';
import IconLocationDefault from '@assets/icons/IconLocationDefault';
import IconPin from '@assets/icons/IconPin';
import PinLayout from '@components/common/layout/PinLayout';
import AddMapModal from '@components/plan/addPlan/AddMapModal';
import MapPoly from '@components/plan/common/MapPoly';
import { datesStore } from '@store/datesStore';
import { updatePinStore } from '@store/updatePinStore';

interface PropsType {
  currentPage: number;
  pins: PinContentsType[][];
  setPins: React.Dispatch<React.SetStateAction<PinContentsType[][]>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const AddPlanContents = ({
  currentPage,
  pins,
  setPins,
  setCurrentPage,
}: PropsType) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const openModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  const { oldDates, dates } = datesStore();

  // pin 수정 버튼
  const { updateClick } = updatePinStore();
  const updatePin = (idx: number) => {
    const pin = pins[currentPage][idx];
    updateClick(pin, idx);
    openModal();
  };

  // pin 삭제 버튼
  const deletePin = (idx: number) => {
    const deletedPins = pins.map((pin, i) => {
      if (i === currentPage) {
        return pin.filter((_, j) => j !== idx);
      }
      return pin;
    });
    setPins(deletedPins);
  };

  useEffect(() => {
    setCurrentPage(() => 0);
    const newPins: PinContentsType[][] = [];
    dates.forEach((date) => {
      if (!oldDates.includes(date)) {
        newPins.push([]);
      } else {
        newPins.push(pins[oldDates.indexOf(date)]);
      }
    });
    setPins(() => newPins);
  }, [dates]);

  return (
    <>
      <div className="flex flex-col justify-center gap-5">
        <div className="flex items-center my-[10px] text-normal font-semibold text-gray_dark_1 gap-[8px]">
          <IconLocationDefault w="20" h="20" />
          <label>여행지역</label>
        </div>
        <MapPoly pins={pins[currentPage]} />
        <div className="flex flex-col justify-center">
          <div className="flex items-center">
            <IconPin w="w-[20px]" h="h-[25px]" fill="#4E4F54" />
            <div className="w-full ml-[8px] mx-auto font-bold text-normal text-gray_dark_1 py-[13px]">
              방문할 장소
            </div>
          </div>
          {pins[currentPage]?.map((pin, idx: number) => {
            return (
              <div key={pin.id}>
                <PinLayout
                  pin={pin}
                  idx={idx}
                  isEnding={false}
                  updatePin={updatePin}
                  deletePin={deletePin}
                />
              </div>
            );
          })}
          {dates.length !== 0 && (
            <div className="flex items-center justify-between my-[8px]">
              {/* <div className="absolute translate-x-[17.5px] translate-y-[-25px] -z-10 border border-l-gray_dark_1 h-[70px]" /> */}
              <p className="rounded-full bg-gradient-to-r from-[#5E9fff] from-0% to-[#1a68db] via-100%  w-[35px] h-[35px] font-semibold text-white border-[5px] border-white"></p>
              <button
                type="button"
                onClick={openModal}
                className="w-pin_card h-pin_card border border-dashed rounded-lg font-bold text-[18px] text-gray_dark_1 hover:bg-navy_light_1 duration-200"
              >
                장소 추가하기
              </button>
            </div>
          )}
        </div>
      </div>
      {isOpenModal && (
        <AddMapModal
          setPins={setPins}
          setIsOpenModal={setIsOpenModal}
          currentPage={currentPage}
        />
      )}
    </>
  );
};

export default AddPlanContents;
