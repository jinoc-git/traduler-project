import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

import { type PinContentsType } from '@api/pins';

interface PropsType {
  pin: PinContentsType | null;
  setMap: React.Dispatch<React.SetStateAction<any>>;
  position: {
    lat: number;
    lng: number;
  };
  setPosition: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
}

const MapNonePoly = ({ pin, setMap, position, setPosition }: PropsType) => {
  return (
    <div className="flex justify-center">
      <Map
        center={{
          lat: pin != null ? (pin.lat as number) : 37.566826004661,
          lng: pin !== null ? (pin.lng as number) : 126.978652258309,
        }}
        className="w-[420px] h-[160px] rounded-lg"
        level={3}
        onCreate={setMap}
      >
        <MapMarker
          position={position}
          draggable={true}
          onDragEnd={(marker) => {
            setPosition({
              lat: marker.getPosition().getLat(),
              lng: marker.getPosition().getLng(),
            });
          }}
        />
      </Map>
    </div>
  );
};

export default MapNonePoly;
