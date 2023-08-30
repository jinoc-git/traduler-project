/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Map,
  MapMarker,
  MapTypeControl,
  Polyline,
  ZoomControl,
} from 'react-kakao-maps-sdk';
import { useParams } from 'react-router-dom';

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
  const { id } = useParams();
  const planId: string = id as string;
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
    if (pin != null && pin.length !== 0) {
      console.log(pin);
      console.log(pin?.[0].contents);
      setPinArr(pin?.[0].contents as []);
    }
  }, [pin]);

  useEffect(() => {
    if (plan !== undefined && plan !== null) {
      // plan을 불러왔을때
      setDates(plan[0].dates);
      setCurrentPage(0);
    }
  }, [plan]);

  if (isLoading) {
    return <div className="w-full h-[500px] bg-slate-300">로딩중...</div>;
  }

  return (
    <section>
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
          style={{ width: '95%', height: '400px', borderRadius: '8px' }}
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
          <MapTypeControl position={kakao.maps.ControlPosition.TOPRIGHT} />
          <ZoomControl position={kakao.maps.ControlPosition.RIGHT} />
        </Map>
      </div>
      <Pins currentPage={currentPage} dates={dates as string[]} />
    </section>
  );
};

export default UpdatePlan;
