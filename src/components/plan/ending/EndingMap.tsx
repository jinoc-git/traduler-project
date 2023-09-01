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
import { useQuery } from '@tanstack/react-query';

const EndingMap = () => {
  const { id: planId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['pins', planId],
    queryFn: async () => await getAllPins(planId as string),
  });
  const [pins, SetPins] = useState<PinContentsType[]>();

  useEffect(() => {
    if (data !== undefined) {
      const res = data.map((item) => item.contents);
      const flattenedRes = res.flatMap((innerRes) => innerRes);
      SetPins(flattenedRes as PinContentsType[]);
    }
  }, [data]);

  if (isLoading) {
    return <div>로딩중...</div>;
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
                ></MapMarker>
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
