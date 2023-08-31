import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useParams } from 'react-router-dom';

import { getCost, insertPlanEnding } from '@api/datesPay';
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
  // const planId = 'b3bdfec0-4107-441c-b477-19d96e5b566e';
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
  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  const movePlns = (beforeIdx: number, afterIdx: number) => {
    if (beforeIdx === afterIdx) return;
    const newPinArr = [...pinArr];
    const item = newPinArr.splice(beforeIdx, 1);
    newPinArr.splice(afterIdx, 0, ...item);
    console.log(pinArr, newPinArr);
    setPinArr(newPinArr);
  };

  useEffect(() => {
    if (pin != null && pin.length !== 0) {
      setPinArr(pin?.[0].contents as []);
    }
  }, [pin]);

  useEffect(() => {
    const getCalcPathData = async (data: PinContentsType[]) => {
      const pathData = await calcPath(data);
      setDistanceData(pathData);
    };
    if (pinArr.length > 1) {
      void getCalcPathData(pinArr);
    }
  }, [pinArr]);

  // const renderPin = useCallback(
  //   (
  //     pin: PinContentsType,
  //     id: string,
  //     index: number,
  //     betweenDistanceData: string,
  //     pinArrLength: number,
  //     handleUpdate: (idx: number) => void,
  //     handleDelete: (idx: number) => void,
  //     movePlns: (beforeIdx: number, afterIdx: number) => void,
  //   ) => {
  //     return (
  //       <Pin
  //         key={id}
  //         pin={pin}
  //         id={id}
  //         idx={index}
  //         betweenDistanceData={betweenDistanceData}
  //         pinArrLength={pinArrLength}
  //         handleUpdate={handleUpdate}
  //         handleDelete={handleDelete}
  //         movePlns={movePlns}
  //       />
  //     );
  //   },
  //   [],
  // );

  // 08-30
  const calcCostAndInsertPlansEnding = async () => {
    const response = await getCost(planId);

    if (response !== null && response !== undefined) {
      const datesCost: number[] = [];

      response.forEach((value) => {
        let cost = 0;

        value.contents.forEach((content) => {
          cost += content.cost;
        });

        datesCost.push(cost);
      });

      void insertPlanEnding({
        id: planId,
        distance: distanceData.map(Number),
        dates_cost: datesCost,
      });
    }
  };

  return (
    <>
      <div className="flex gap-3 mb-5">
        <IconPin />
        <h3>방문할 장소</h3>
      </div>
      <DndProvider backend={HTML5Backend}>
        <ul className=" flex flex-col gap-4">
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
                movePlns={movePlns}
              />
            );
          })}
        </ul>
      </DndProvider>
      <button onClick={openModal} className="p-5 bg-slate-500">
        장소 추가하기
      </button>
      <button
        className="p-5 bg-slate-500"
        onClick={calcCostAndInsertPlansEnding}
      >
        여행 완료
      </button>
      {isOpenModal && (
        <MapModal openModal={openModal} date={dates[currentPage]} />
      )}
    </>
  );
};

export default Pins;
