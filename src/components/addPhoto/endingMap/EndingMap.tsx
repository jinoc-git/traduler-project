/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/return-await */
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

import { type PinContentsType, getAllPins } from '@api/pins';
import Loading from '@components/loading/Loading';
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
  const [infoStates, setInfoStates] = useState<boolean[]>([]);
  const [level, setLevel] = useState<number>(4);

  const toggleMarkerInfo = (index: number) => {
    const newInfoStates = [...infoStates];
    newInfoStates[index] = !newInfoStates[index];
    setInfoStates(newInfoStates);
  };

  useEffect(() => {
    if (data !== undefined && data !== null) {
      const res = data.map((item) => item.contents);
      const flattenedRes = res.flatMap((innerRes) => innerRes);
      setPins(flattenedRes as PinContentsType[]);

      setInfoStates(new Array(flattenedRes.length).fill(false));
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
        <>
          <Map
            center={{
              lat: pins?.[0].lat !== undefined ? pins[0].lat : 37.566826004661,
              lng: pins?.[0].lng !== undefined ? pins[0].lng : 126.978652258309,
            }}
            level={level}
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
                    clickable={true}
                    onClick={() => {
                      toggleMarkerInfo(idx);
                    }}
                    // onCreate={(target) => {
                    //   console.log(target);
                    //   target.
                    // }}
                  >
                    {infoStates[idx] && (
                      <div className="flex flex-col justify-center text-center text-gray_dark_1 translate-x-[44px]">
                        <div>{pin?.placeName}</div>
                        <div>
                          <a
                            href={`https://map.kakao.com/link/map/${
                              pin?.placeName as string
                            },${pin?.lat as number},${pin?.lng as number}`}
                            className="underline text-blue_dark underline-offset-1"
                            target="_blank"
                            rel="noreferrer"
                          >
                            더보기
                          </a>
                        </div>
                      </div>
                      // <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
                      //   // 커스텀 오버레이가 표시될 위치입니다
                      //   position={{
                      //     lat: pin?.lat as number,
                      //     lng: pin?.lng as number,
                      //   }}
                      //   onCreate={(target) => {
                      //     const overlay = `<p>타이틀</p>`;
                      //     console.log(target.setContent(overlay));
                      //   }}
                      // ></CustomOverlayMap>
                    )}
                  </MapMarker>
                </div>
              );
            })}
            <Polyline
              path={pins.map((pin) => {
                return {
                  lat: pin.lat as number,
                  lng: pin.lng as number,
                };
              })}
              strokeWeight={5}
              strokeColor={'#162F70'}
              strokeOpacity={0.7}
              strokeStyle={'solid'}
              onCreate={(target) => {
                const polyLength = target.getLength();
                if (polyLength > 30000) {
                  setLevel(14);
                } else if (polyLength > 19000) {
                  setLevel(10);
                } else if (polyLength > 7000) {
                  setLevel(8);
                }
              }}
            />
            <MapTypeControl position={kakao.maps.ControlPosition.TOPRIGHT} />
            <ZoomControl position={kakao.maps.ControlPosition.RIGHT} />
          </Map>
        </>
      )}
    </div>
  );
};

export default EndingMap;
