/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useParams } from 'react-router-dom';

import { calcPath } from '@api/path';
import { type PinContentsType, getPin, deletePin } from '@api/pins';
import IconLocationDefault from '@assets/icons/IconLocationDefault';
import IconPin from '@assets/icons/IconPin';
import MapModal from '@components/plan/updatePlan/MapModal';
import { updatePinStore } from '@store/updatePinStore';
import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import Pin from './Pin';

interface PropsType {
  currentPage: number;
  dates: string[];
}

const Pins = ({ currentPage, dates }: PropsType) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [distanceData, setDistanceData] = useState<string[]>([]);

  const openModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };

  const { id } = useParams();
  const planId: string = id as string;
  const [pinArr, setPinArr] = useState<PinContentsType[]>([]);

  const queryClient = useQueryClient();

  const { data: pin } = useQuery(
    ['pin', planId, currentPage],
    async () => await getPin(planId, currentPage),
  );

  const deletemutation = useMutation({
    mutationFn: async ([date, planId, deletedPin]: [
      string,
      string,
      PinContentsType[],
    ]) => {
      await deletePin(date, planId, deletedPin);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['pin', planId, currentPage],
      });
    },
  });

  const { updateClick } = updatePinStore();

  const handleUpdate = (idx: number) => {
    const updatePin = pinArr[idx];
    updateClick(updatePin, idx);
    openModal();
  };
  const handleDelete = (idx: number) => {
    const deletedPin = pinArr.filter((pin, i) => i !== idx);
    deletemutation.mutate([dates[currentPage], planId, deletedPin]);
  };

  // drang drop
  const movePins = useCallback((beforeIdx: number, afterIdx: number) => {
    if (beforeIdx === afterIdx) return;
    setPinArr((prev) => {
      const newPinArr = [...prev];
      const item = newPinArr.splice(beforeIdx, 1);
      newPinArr.splice(afterIdx, 0, ...item);
      return newPinArr;
    });
  }, []);

  useEffect(() => {
    if (pin != null && pin.length !== 0) {
      setPinArr(pin?.[0].contents as []);
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
            // const betweenDistanceData = distanceData[idx] ?? '';
            // const pinArrLength = pinArr.length;
            return (
              <Pin
                key={`${pin.lat as number}`}
                pin={pin}
                id={`${pin.lat as number}`}
                idx={idx}
                // betweenDistanceData={betweenDistanceData}
                // pinArrLength={pinArrLength}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                movePins={movePins}
              />
            );
          })}
        </ul>
      </DndProvider>
      <div className="flex items-center justify-between my-[8px]">
        {/* <div className="absolute translate-x-[17.5px] translate-y-[-25px] -z-10 border border-l-gray_dark_1 h-[70px]" /> */}
        <p className="rounded-full bg-gradient-to-r from-[#5E9fff] from-0% to-[#1a68db] via-100%  w-[35px] h-[35px] font-semibold text-white border-[5px] border-white"></p>
        <button
          type="button"
          onClick={openModal}
          className="w-pin_card h-pin_card border border-dashed rounded-lg font-bold text-[18px] text-gray_dark_1"
        >
          장소 추가하기
        </button>
      </div>
      {isOpenModal && (
        <MapModal
          openModal={openModal}
          closeModal={closeModal}
          date={dates[currentPage]}
          currentPage={currentPage}
        />
      )}
    </>
  );
};

export default Pins;
