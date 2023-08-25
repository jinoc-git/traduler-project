import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { type PinContentsType, getPin, deletePin } from '@api/pins';
import { updatePinStore } from '@store/updatePinStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import MapModal from './MapModal';

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
  const { data: pin } = useQuery(
    ['pin', planId, currentPage],
    // eslint-disable-next-line @typescript-eslint/return-await
    async () => await getPin(planId, currentPage),
  );

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

  const queryClient = useQueryClient();
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

  useEffect(() => {
    if (pin !== undefined) {
      setPinArr(pin?.[0].contents as []);
    }
  }, [pin]);

  return (
    <>
      <div>
        {pinArr.map((pin, idx: number) => {
          return (
            <div key={idx}>
              <p>{idx + 1}</p>
              <p>
                {pin !== null &&
                  typeof pin === 'object' &&
                  'placeName' in pin && <span>{pin.placeName as string}</span>}
              </p>
              <button
                className="m-4 bg-slate-400"
                onClick={() => {
                  handleUpdate(idx);
                }}
              >
                수정
              </button>
              <button
                className="m-4 bg-slate-400"
                onClick={() => {
                  handleDelete(idx);
                }}
              >
                삭제
              </button>
            </div>
          );
        })}
      </div>
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
