/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
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
import IconLocationDefault from '@assets/icons/IconLocationDefault';
import Pins from '@components/plan/updatePlan/Pins';
import { useQuery } from '@tanstack/react-query';

import DatePage from '../DatePage';

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
  const {
    data: plan,
    isLoading,
    isError,
  } = useQuery(['plan', planId], async () => await getPlan(planId));
  const { data: pin } = useQuery(
    ['pin', planId, currentPage],
    async () => await getPin(planId, currentPage),
  );

  useEffect(() => {
    if (pin != null && pin.length !== 0) {
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

  const mapRef = useRef<any>();
  const [style, setStyle] = useState({
    width: '95vw',
    height: '400px',
    borderRadius: '8px',
  });

  useEffect(() => {
    const map = mapRef.current;
    if (map !== undefined) {
      const timer = setTimeout(() => {
        map.relayout();
      }, 300);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [style]);

  useEffect(() => {
    const windowResize = () => {
      setStyle({
        width: '95vw',
        height: '400px',
        borderRadius: '8px',
      });
    };
    window.addEventListener(`resize`, windowResize);

    return () => {
      window.removeEventListener(`resize`, windowResize);
    };
  }, []);

  if (isLoading) {
    return <div className="w-full h-[500px] bg-slate-300">로딩중...</div>;
  }

  if (isError) {
    return <div className="w-full h-[500px] bg-slate-300">오류 발생...</div>;
  }

  return (
    <>
      <DatePage
        dates={dates ?? []}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        currentPage={currentPage}
      />
      <div className="flex flex-col justify-center gap-5">
        <div className="flex items-center my-[10px] text-normal font-semibold text-gray_dark_1 gap-[8px]">
          <IconLocationDefault w="20" h="20" />
          <label>여행지역</label>
        </div>
        <div className="flex justify-center">
          <Map
            center={{
              lat:
                pinArr.length !== 0
                  ? (pinArr[0].lat as number)
                  : 37.566826004661,
              lng:
                pinArr.length !== 0
                  ? (pinArr[0].lng as number)
                  : 126.978652258309,
            }}
            level={3}
            ref={mapRef}
            style={style}
          >
            {pinArr?.map((pin) => {
              return (
                <div key={pin.lng}>
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
              strokeColor={'#162F70'} // 선의 색깔입니다
              strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
              strokeStyle={'solid'} // 선의 스타일입니다
            />
            <MapTypeControl position={kakao.maps.ControlPosition.TOPRIGHT} />
            <ZoomControl position={kakao.maps.ControlPosition.RIGHT} />
          </Map>
        </div>
      </div>
      <Pins currentPage={currentPage} dates={dates as string[]} />
    </>
  );
};

export default UpdatePlan;
