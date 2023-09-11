/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

import { type PinContentsType } from '@api/pins';
import _ from 'lodash';

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
  setAddress: React.Dispatch<React.SetStateAction<string>>;
}

const MapNonePoly = ({
  pin,
  setMap,
  position,
  setPosition,
  setAddress,
}: PropsType) => {
  const geocoder = new kakao.maps.services.Geocoder();
  const searchAddr = (position: kakao.maps.LatLng) => {
    const callback = (result: any) => {
      const RoadAddress = result[0]?.road_address?.address_name;
      const Address = result[0]?.address?.address_name;
      setAddress(RoadAddress !== undefined ? RoadAddress : Address);
    };
    geocoder.coord2Address(position.getLng(), position.getLat(), callback);
  };
  const debouncedSearchAddr = _.debounce(searchAddr, 500);

  const [marker, setMarker] = useState<kakao.maps.Marker>();

  useEffect(() => {
    if (marker !== undefined) {
      debouncedSearchAddr(marker.getPosition());
    }
  }, [marker?.getPosition()]);

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
          onCreate={(marker) => {
            setMarker(marker);
          }}
        />
      </Map>
    </div>
  );
};

export default MapNonePoly;
