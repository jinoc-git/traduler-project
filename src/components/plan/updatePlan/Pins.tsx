import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { calcPath } from '@api/path';
import { type PinContentsType, getPin, deletePin } from '@api/pins';
import IconPin from '@assets/icons/IconPin';
import IconSixDots from '@assets/icons/IconSixDots';
import MapModal from '@components/plan/updatePlan/MapModal';
import { updatePinStore } from '@store/updatePinStore';
import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import DropDown from './DropDown';

interface PropsType {
  currentPage: number;
  dates: string[];
}

const Pins = ({ currentPage, dates }: PropsType) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
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

  // 핀 거리 계산하기

  const [distanceData, setDistanceData] = useState<string[]>([]);

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

  return (
    <>
      <div className="flex gap-3">
        <IconPin />
        <h3>방문할 장소</h3>
      </div>
      <ul className=" flex flex-col gap-4">
        {pinArr.map((pin, idx) => {
          const betweenDistanceData = distanceData[idx] ?? '';
          return (
            <li key={uuid()} className=" flex gap-[10px] h-[100px]">
              <div className="w-[65px]">
                <p>{idx + 1}</p>
                {idx < pinArr.length - 1 && (
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
                    {pin !== null &&
                      typeof pin === 'object' &&
                      'placeName' in pin && (
                        <span>{pin.placeName as string}</span>
                      )}
                  </p>
                  <p>
                    {pin !== null &&
                      typeof pin === 'object' &&
                      'cost' in pin && <span>￦{pin.cost}</span>}
                  </p>
                </div>
                <div className="flex items-center">
                  <DropDown>
                    <ul className="absolute bg-white rounded-md">
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
        })}
      </ul>
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
