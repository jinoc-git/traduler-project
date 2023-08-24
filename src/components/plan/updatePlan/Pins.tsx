import React, { useState } from 'react';

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
  // const planId = 'b3bdfec0-4107-441c-b477-19d96e5b566e';
  // const { data: pins } = useQuery(['pins'], fetchPinsData);
  // console.log(pins);

  return (
    <>
      <div>
        {/* {pins?.[currentPage]?.contents.map((pin, idx: number) => {
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
        })} */}
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
