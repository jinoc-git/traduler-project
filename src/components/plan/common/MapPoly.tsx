import React from 'react';
import {
  Map,
  MapMarker,
  MapTypeControl,
  Polyline,
  ZoomControl,
} from 'react-kakao-maps-sdk';

import { type PinContentsType } from '@api/pins';

interface PropsType {
  pins: PinContentsType[];
}

const MapPoly = ({ pins }: PropsType) => {
  return (
    <div className="flex justify-center">
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
        style={{
          width: '95vw',
          height: '400px',
          borderRadius: '8px',
        }}
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
