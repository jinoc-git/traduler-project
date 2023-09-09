/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
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
  const [marker, setMarker] = useState<kakao.maps.Marker>();
  const geocoder = new kakao.maps.services.Geocoder();
  const searchAddr = (marker: kakao.maps.LatLng) => {
    const callback = (result: any) => {
      const RoadAddress = result[0]?.road_address?.address_name;
      const Address = result[0]?.address?.address_name;
      console.log(RoadAddress);
      console.log(Address);
    };
    geocoder.coord2Address(marker.getLng(), marker.getLat(), callback);
  };

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
          onCreate={(target) => {
            setMarker(target);
            searchAddr(target.getPosition());
          }}
        />
      </Map>
    </div>
  );
};

export default MapNonePoly;
