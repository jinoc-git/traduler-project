import React, { useState } from 'react';

import { getPins } from '@api/pins';
import { useQuery } from '@tanstack/react-query';

import MapModal from './MapModal';

const AddMap = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const openModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const { data: pins } = useQuery({ queryKey: ['pins'], queryFn: getPins });

  return (
    <>
      <div>
        {pins?.map((pin, idx: number) => {
          return (
            <div key={idx}>
              <p>{idx + 1}</p>
              <p>
                {pin !== null &&
                  typeof pin === 'object' &&
                  'placeName' in pin && <span>{pin.placeName as string}</span>}
              </p>
              <button className="m-4 bg-slate-400">수정</button>
              <button className="m-4 bg-slate-400">삭제</button>
            </div>
          );
        })}
      </div>
      <button onClick={openModal} className="p-5 bg-slate-500">
        장소 추가하기
      </button>
      {isOpenModal && <MapModal openModal={openModal} />}
    </>
  );
};

export default AddMap;
