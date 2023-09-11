/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  DndProvider,
  TouchTransition,
  MouseTransition,
} from 'react-dnd-multi-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
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

const HTML5toTouch = {
  backends: [
    {
      id: 'html5',
      backend: HTML5Backend,
      transition: MouseTransition,
    },
    {
      id: 'touch',
      backend: TouchBackend,
      options: { enableMouseEvents: true },
      preview: true,
      transition: TouchTransition,
    },
  ],
};

interface PropsType {
  currentPage: number;
  dates: string[];
}

const Pins = ({ currentPage, dates }: PropsType) => {
  const { value: isOpenModal, setNeedValue } = useBooleanState(false);

  const { value, setNeedValue: setValue } = useBooleanState(true);
  const openModal = () => {
    setValue(true);
    setNeedValue(true);
  };
  const closeModal = () => {
    setValue(false);
    setTimeout(() => {
      setNeedValue(false);
    }, 400);
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
        <div className="flex items-center mt-[36px] mb-[32px]">
          <IconPin w="w-[20px]" h="h-[25px]" fill="#4E4F54" />
          <div className="w-full ml-[8px] mx-auto font-bold text-normal text-gray_dark_1 py-[13px]">
            방문할 장소
          </div>
        </div>
      </div>
      <DndProvider options={HTML5toTouch}>
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
      <div
        className="flex items-center justify-between
            sm:w-[286px]
            md:w-[651px] md:mx-[25px] md:my-[8px]"
      >
        <p
          className="rounded-full bg-gradient-to-r from-[#5E9fff] from-0% to-[#1a68db] via-100%  w-[35px] h-[35px] font-semibold text-white border-[5px] border-white
        sm:w-[30px] sm:h-[30px]
        md:w-[35px] md:h-[35px]"
        ></p>
        <button
          type="button"
          onClick={openModal}
          className=" hover:bg-navy_light_1 duration-200  border border-dashed rounded-lg font-bold  text-gray_dark_1
          sm:w-[240px] sm:h-[65px] sm:mr-[2px] sm:text-[11px]
          md:w-pin_card md:h-pin_card md:text-[18px]"
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
          value={value}
        />
      )}
    </>
  );
};

export default Pins;
