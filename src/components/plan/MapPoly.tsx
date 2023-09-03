import React, { useEffect, useRef, useState } from 'react';
import {
  Map,
  MapMarker,
  MapTypeControl,
  Polyline,
  ZoomControl,
} from 'react-kakao-maps-sdk';

import { type PinContentsType } from '@api/pins';

interface PropsType {
  pins: PinContentsType[][];
  currentPage: number;
}

const MapPoly = ({ pins, currentPage }: PropsType) => {
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

  return (
    <div className="flex justify-center">
      <Map
        center={{
          lat:
            pins.length !== 0 && pins[currentPage].length !== 0
              ? (pins[currentPage][0].lat as number)
              : 37.566826004661,
          lng:
            pins.length !== 0 && pins[currentPage].length !== 0
              ? (pins[currentPage][0].lng as number)
              : 126.978652258309,
        }}
        level={3}
        ref={mapRef}
        style={style}
      >
        {pins[currentPage]?.map((pin) => {
          return (
            <MapMarker
              key={pin.lng}
              position={{
                lat: pin?.lat as number,
                lng: pin?.lng as number,
              }}
            ></MapMarker>
          );
        })}
        {pins.length !== 0 && pins[currentPage].length !== 0 && (
          <Polyline
            path={pins[currentPage].map((pin) => {
              return {
                lat: pin.lat as number,
                lng: pin.lng as number,
              };
            })}
            strokeWeight={5} // 선의 두께 입니다
            strokeColor={'#162F70'} // 선의 색깔입니다
            strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle={'solid'} // 선의 스타일입니다
          />
        )}
        <MapTypeControl position={kakao.maps.ControlPosition.TOPRIGHT} />
        <ZoomControl position={kakao.maps.ControlPosition.RIGHT} />
      </Map>
    </div>
  );
};

export default MapPoly;
