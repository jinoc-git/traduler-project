/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useParams } from 'react-router-dom';

import { type PinContentsType, getPin } from '@api/pins';
import IconPin from '@assets/icons/IconPin';
import MapModal from '@components/plan/updatePlan/MapModal';
import useBooleanState from '@hooks/useBooleanState';
import usePinMutation from '@hooks/usePinMutation';
import { updatePinStore } from '@store/updatePinStore';
import { useQuery } from '@tanstack/react-query';
import update from 'immutability-helper';

import Pin from './Pin';

interface PropsType {
  currentPage: number;
  dates: string[];
}

const Pins = ({ currentPage, dates }: PropsType) => {
  const {
    value: isOpenModal,
    toggleValue: openModal,
    setNeedValue,
  } = useBooleanState(false);

  const closeModal = () => {
    setNeedValue(false);
  };

  const { id } = useParams();
  const planId: string = id as string;
  const { updateClick } = updatePinStore();
  const [pinArr, setPinArr] = useState<PinContentsType[]>([]);

  const { data: pin } = useQuery({
    queryKey: ['pin', planId, currentPage],
    queryFn: async () => await getPin(planId, currentPage),
    // cacheTime: 600000,
    staleTime: 60 * 1000,
  });

  const { deleteMutation, debounceNewOrderMutaion } = usePinMutation(
    planId,
    currentPage,
  );

  const handleUpdate = (idx: number) => {
    const updatePin = pinArr[idx];
    updateClick(updatePin, idx);
    openModal();
  };
  const handleDelete = (idx: number) => {
    const deletedPin = pinArr.filter((pin, i) => i !== idx);
    deleteMutation([dates[currentPage], planId, deletedPin]);
  };

  // drang drop
  const movePins = useCallback((beforeIdx: number, afterIdx: number) => {
    if (beforeIdx === afterIdx) return;
    setPinArr((prev) =>
      update(prev, {
        $splice: [
          [beforeIdx, 1],
          [afterIdx, 0, prev[beforeIdx]],
        ],
      }),
    );
  }, []);

  const changeOrderAtDidDrop = () => {
    debounceNewOrderMutaion([dates[currentPage], planId, pinArr]);
  };

  useEffect(() => {
    if (pin != null && pin.length !== 0) {
      setPinArr(pin[0].contents as []);
    }
  }, [pin]);

  return (
    <>
      <div className="flex flex-col justify-center gap-5">
        <div className="flex items-center mt-[36px]">
          <IconPin w="20" h="25" fill="#4E4F54" />
          <div className="w-full ml-[8px] mx-auto font-bold text-normal text-gray_dark_1 py-[13px]">
            방문할 장소
          </div>
        </div>
      </div>
      <DndProvider backend={HTML5Backend}>
        <ul className="flex flex-col ">
          {pinArr.map((pin, idx) => {
            return (
              <Pin
                key={pin.id}
                pin={pin}
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                id={pin.id!}
                idx={idx}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                movePins={movePins}
                changeOrderAtDidDrop={changeOrderAtDidDrop}
              />
            );
          })}
        </ul>
      </DndProvider>
      <div className="flex items-center justify-between my-[8px]">
        <p className="rounded-full bg-gradient-to-r from-[#5E9fff] from-0% to-[#1a68db] via-100%  w-[35px] h-[35px] font-semibold text-white border-[5px] border-white"></p>
        <button
          type="button"
          onClick={openModal}
          className="w-pin_card hover:bg-navy_light_1 duration-200 h-pin_card border border-dashed rounded-lg font-bold text-[18px] text-gray_dark_1"
        >
          장소 추가하기
        </button>
      </div>
      {isOpenModal && (
        <MapModal
          pinQuery={pin?.[0]}
          openModal={openModal}
          closeModal={closeModal}
          currentPage={currentPage}
        />
      )}
    </>
  );
};

export default Pins;
