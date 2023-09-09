import React, { useEffect, useState } from 'react';
import {
  Map,
  MapMarker,
  MapTypeControl,
  Polyline,
  ZoomControl,
} from 'react-kakao-maps-sdk';

import { type PinContentsType } from '@api/pins';
import { screenStore } from '@store/screenStore';

interface PropsType {
  pins: PinContentsType[];
}

const MapPoly = ({ pins }: PropsType) => {
  const screenSize = screenStore((state) => state.screenSize);
  const [style, setStyle] = useState({
    width: '95vw',
    height: '400px',
    borderRadius: '8px',
  });

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

  return (
    <div className="flex justify-center sm:w-[310px] md:w-[650px]">
      <Map
        center={{
          lat:
            pins !== undefined && pins.length !== 0
              ? (pins[0].lat as number)
              : 37.566826004661,
          lng:
            pins !== undefined && pins.length !== 0
              ? (pins[0].lng as number)
              : 126.978652258309,
        }}
        level={3}
        style={style}
      >
        {pins?.map((pin) => {
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
        {pins !== undefined && pins.length !== 0 && (
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
          />
        )}
        <MapTypeControl position={kakao.maps.ControlPosition.TOPRIGHT} />
        <ZoomControl position={kakao.maps.ControlPosition.RIGHT} />
      </Map>
    </div>
  );
};

export default MapPoly;
