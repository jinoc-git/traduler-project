/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useState } from 'react';
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  MapTypeControl,
  Polyline,
  ZoomControl,
} from 'react-kakao-maps-sdk';
import { useParams } from 'react-router-dom';

import { type PinContentsType, getAllPins } from '@api/pins';
import Loading from '@components/loading/Loading';
import { screenStore } from '@store/screenStore';
import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
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
  const screenSize = screenStore((state) => state.screenSize);
  const [style, setStyle] = useState({
    width: '95vw',
    height: '400px',
    borderRadius: '8px',
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
    if (screenSize === 'sm') {
      setStyle({
        width: '263px',
        height: '227px',
        borderRadius: '8px',
      });
    }
    if (screenSize === 'md') {
      setStyle({
        width: '95vw',
        height: '400px',
        borderRadius: '8px',
      });
    }
    if (screenSize === 'lg') {
      setStyle({
        width: '95vw',
        height: '400px',
        borderRadius: '8px',
      });
    }
  }, [screenSize]);

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
    <div
      className="flex justify-center 
      sm:w-[263px] sm:ml-[23px] sm:h-[227px]
      md:w-[650px] md:mx-auto md:h-[400px]"
    >
      {pins?.length !== 0 && (
        <>
          <Map
            center={{
              lat: pins?.[0].lat !== undefined ? pins[0].lat : 37.566826004661,
              lng: pins?.[0].lng !== undefined ? pins[0].lng : 126.978652258309,
            }}
            level={level}
            style={style}
          >
            {pins?.map((pin, idx) => {
              return (
                <div key={uuid()}>
                  <MapMarker
                    position={{
                      lat: pin?.lat as number,
                      lng: pin?.lng as number,
                    }}
                    clickable={true}
                    onClick={() => {
                      toggleMarkerInfo(idx);
                    }}
                  />
                  {infoStates[idx] && (
                    <CustomOverlayMap
                      position={{
                        lat: pin?.lat as number,
                        lng: pin?.lng as number,
                      }}
                    >
                      <div className="flex flex-col  text-gray_dark_1 bg-white w-[130px] p-2 rounded-lg border border-gray_dark_1 translate-y-[-72px]">
                        <div className="flex items-center justify-between font-bold">
                          <div className="w-[85px] truncate">
                            {pin?.placeName}
                          </div>
                          <div
                            onClick={() => {
                              toggleMarkerInfo(idx);
                            }}
                            className="pl-3 font-bold cursor-pointer text-navy"
                          >
                            X
                          </div>
                        </div>
                        <div>
                          <a
                            href={`https://map.kakao.com/link/map/${
                              pin?.placeName as string
                            },${pin?.lat as number},${pin?.lng as number}`}
                            className="text-left underline text-navy underline-offset-1"
                            target="_blank"
                            rel="noreferrer"
                          >
                            더보기
                          </a>
                        </div>
                      </div>
                    </CustomOverlayMap>
                  )}
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
              strokeOpacity={0}
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

export default React.memo(EndingMap);
