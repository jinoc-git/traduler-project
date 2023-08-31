/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useParams } from 'react-router-dom';

import { calcPath } from '@api/path';
import { type PinContentsType, getPin, deletePin } from '@api/pins';
import IconPin from '@assets/icons/IconPin';
import MapModal from '@components/plan/updatePlan/MapModal';
import { updatePinStore } from '@store/updatePinStore';
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
      void queryClient.invalidateQueries({ queryKey: ['pin'] });
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

  // useEffect(() => {
  //   const getCalcPathData = async (data: PinContentsType[]) => {
  //     const pathData = await calcPath(data);
  //     setDistanceData(pathData);
  //   };
  //   if (pinArr.length > 1) {
  //     void getCalcPathData(pinArr);
  //   }
  // }, [pinArr]);

  return (
    <>
      <div className="flex gap-3 mb-5">
        <IconPin />
        <h3>방문할 장소</h3>
      </div>
      <DndProvider backend={HTML5Backend}>
        <ul className="flex flex-col gap-4 ">
          {pinArr.map((pin, idx) => {
            const betweenDistanceData = distanceData[idx] ?? '';
            const pinArrLength = pinArr.length;
            return (
              <Pin
                key={`${pin.lat as number}`}
                pin={pin}
                id={`${pin.lat as number}`}
                idx={idx}
                betweenDistanceData={betweenDistanceData}
                pinArrLength={pinArrLength}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                movePins={movePins}
              />
            );
          })}
        </ul>
      </DndProvider>
      <button onClick={openModal} className="p-5 bg-slate-500">
        장소 추가하기
      </button>
      {isOpenModal && (
        <MapModal openModal={openModal} date={dates[currentPage]} />
      )}
    </>
  );
};

export default Pins;
