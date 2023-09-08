/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl,
} from 'react-kakao-maps-sdk';
import { useParams } from 'react-router-dom';

import { type PinContentsType, getAllPins } from '@api/pins';
import Loading from '@components/loading/Loading';
import useBooleanState from '@hooks/useBooleanState';
import { useQuery } from '@tanstack/react-query';

const EndingMap = ({ dates }: { dates: string[] }) => {
  const { id: planId } = useParams();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['pins', planId],
    queryFn: async () => {
      if (planId !== undefined && dates !== undefined) {
        const pinsData = await getAllPins(planId, dates);
        return pinsData;
      }
      return null;
    },
  });
  const [pins, setPins] = useState<PinContentsType[]>([]);
  const { value: isInfoOpen, toggleValue: toggleInfo } = useBooleanState(false);

  useEffect(() => {
    if (data !== undefined && data !== null) {
      const res = data.map((item) => item.contents);
      const flattenedRes = res.flatMap((innerRes) => innerRes);
      setPins(flattenedRes as PinContentsType[]);
    }
  }, [data]);

  useEffect(() => {
    if (planId !== undefined && dates !== undefined) {
      setPins([]);
      void refetch();
    }
  }, [planId, dates]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-[720px] flex-center">
      {pins?.length !== 0 && (
        <Map
          center={{
            lat: pins?.[0].lat !== undefined ? pins[0].lat : 37.566826004661,
            lng: pins?.[0].lng !== undefined ? pins[0].lng : 126.978652258309,
          }}
          level={4}
          className="w-[95vw] h-[400px] rounded-lg"
        >
          {pins?.map((pin, idx) => {
            return (
              <div key={idx}>
                <MapMarker
                  position={{
                    lat: pin?.lat as number,
                    lng: pin?.lng as number,
                  }}
                  clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
                  onClick={toggleInfo}
                >
                  {isInfoOpen && (
                    <div style={{ padding: '5px', color: '#000' }}>
                      {pin?.placeName} <br />
                      <a
                        href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667"
                        style={{ color: 'blue' }}
                        target="_blank"
                        rel="noreferrer"
                      >
                        큰지도보기
                      </a>{' '}
                      <a
                        href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667"
                        style={{ color: 'blue' }}
                        target="_blank"
                        rel="noreferrer"
                      >
                        길찾기
                      </a>
                    </div>
                  )}
                </MapMarker>
              </div>
            );
          })}
          <MapTypeControl position={kakao.maps.ControlPosition.TOPRIGHT} />
          <ZoomControl position={kakao.maps.ControlPosition.RIGHT} />
        </Map>
      )}
    </div>
  );
};

export default EndingMap;
