/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';

import { type PinContentsType, getPin } from '@api/pins';
import { getPlan } from '@api/plans';
import Pins from '@components/plan/updatePlan/Pins';
import { useQuery } from '@tanstack/react-query';

declare global {
  interface Window {
    kakao: any;
  }
}

const UpdatePlan = () => {
  const planId = 'b3bdfec0-4107-441c-b477-19d96e5b566e';
  const [dates, setDates] = useState<string[]>();
  const [currentPage, setCurrentPage] = useState(0);
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const [pinArr, setPinArr] = useState<PinContentsType[]>([]);
  const { data: plan, isLoading } = useQuery(
    ['plan'],
    async () => await getPlan(planId),
  );
  const { data: pin } = useQuery(
    ['pin', planId, currentPage],
    async () => await getPin(planId, currentPage),
  );

  useEffect(() => {
    if (pin !== undefined) {
      setPinArr(pin?.[0].contents as []);
    }
  }, [pin]);

  useEffect(() => {
    if (plan !== undefined && plan !== null) {
      setDates(plan[0].dates);
    }
  }, [plan]);

  if (isLoading) {
    return <div className="w-full h-[500px] bg-slate-300">로딩중...</div>;
  }

  return (
    <div>
      <div className="flex justify-center gap-5 mb-10 text-2xl font-bold">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className="cursor-pointer disabled:text-transparent disabled:cursor-none"
        >
          ⬅️
        </button>
        <h1>{dates?.[currentPage]}</h1>
        <button
          onClick={handleNextPage}
          disabled={dates !== undefined && currentPage === dates.length - 1}
          className="cursor-pointer disabled:text-transparent disabled:cursor-none"
        >
          ➡️
        </button>
      </div>
      <div className="w-full h-[500px]">
        <Map
          center={{
            lat:
              pinArr.length !== 0 ? (pinArr[0].lat as number) : 37.566826004661,
            lng:
              pinArr.length !== 0
                ? (pinArr[0].lng as number)
                : 126.978652258309,
          }}
          style={{ width: '100vw', height: '500px' }}
          level={3}
        >
          {pinArr?.map((pin, idx) => {
            return (
              <div key={idx}>
                <MapMarker
                  position={{
                    lat: pin?.lat as number,
                    lng: pin?.lng as number,
                  }}
                ></MapMarker>
              </div>
            );
          })}
          <Polyline
            path={pinArr.map((pin) => {
              return { lat: pin.lat as number, lng: pin.lng as number };
            })}
            strokeWeight={5} // 선의 두께 입니다
            strokeColor={'#FFAE00'} // 선의 색깔입니다
            strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle={'solid'} // 선의 스타일입니다
          />
        </Map>
      </div>
      <Pins currentPage={currentPage} dates={dates as string[]} />
    </div>
  );
};

export default UpdatePlan;
