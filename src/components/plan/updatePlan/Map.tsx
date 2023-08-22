/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';

import { getPins, type PinContentsType } from '@api/pins';
import { useQuery } from '@tanstack/react-query';

import { getMap } from './../map';
import { getMarkerMap } from '../map';

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['pins'],
    queryFn: getPins,
  });
  console.log(data);

  useEffect(() => {
    if (data?.length === 0) {
      getMap();
    }
    if (data?.length !== 0 && data !== undefined) {
      getMarkerMap(data as PinContentsType[]);
    }
  }, [data]);

  if (isLoading) {
    return <div className="w-full h-[500px] bg-slate-300">로딩중...</div>;
  }

  return (
    <>
      <div className="w-full h-[500px]">
        <div id="map" style={{ width: '100vw', height: '500px' }}>
          지도지도
        </div>
      </div>
    </>
  );
};

export default Map;
