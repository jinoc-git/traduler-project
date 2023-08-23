/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';

import { type PinContentsType } from '@api/pins';
import { updatePinStore } from '@store/updatePinStore';

import AddMapModal from './AddMapModal';

interface PropsType {
  currentPage: number;
  dates: string[];
  pins: PinContentsType[][];
  setPins: React.Dispatch<React.SetStateAction<PinContentsType[][]>>;
}

const AddPlanContents = ({ currentPage, dates, pins, setPins }: PropsType) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const openModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  const mapRef = useRef<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [linePaths, setLinePaths] = useState<any[]>([]);

  // pin 수정 버튼
  const { updateClick } = updatePinStore();
  const updatePin = (idx: number) => {
    const pin = pins[currentPage][idx];
    updateClick(pin, idx);
    openModal();
  };

  // pin 삭제 버튼
  const deletePin = (idx: number) => {
    const deletedPins = pins.filter((pin, i) => i !== idx);
    setPins(deletedPins);
    markers.map((marker, i) => {
      if (i === idx) {
        return marker.setMap(null);
      }
      return marker;
    });
  };

  useEffect(() => {
    setPins((state) => {
      const newPins = [];
      for (let i = 0; i < dates.length; i++) {
        newPins.push([]);
      }
      return newPins;
    });
  }, [dates]);

  useEffect(() => {
    console.log('pins', pins);
    if (pins[currentPage] === undefined || pins[currentPage].length === 0) {
      getMap();
    } else if (pins[currentPage].length !== 0) {
      getMarkerMap(pins[currentPage]);
    }
  }, [pins, currentPage, dates]);

  const getMap = () => {
    if (mapRef.current === null) {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.566826004661, 126.978652258309), // 지도의 중심좌표
        level: 4,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      mapRef.current = map;

      const mapTypeControl = new window.kakao.maps.MapTypeControl();
      map.addControl(
        mapTypeControl,
        window.kakao.maps.ControlPosition.TOPRIGHT,
      );
      const zoomControl = new window.kakao.maps.ZoomControl();
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
    } else {
      const latlng = new window.kakao.maps.LatLng(
        37.566826004661,
        126.978652258309,
      );
      mapRef.current.setCenter(latlng);
    }
  };

  const getMarkerMap = (data: PinContentsType[]) => {
    const positions = data?.map((pin: PinContentsType) => {
      const position = {
        title: pin.placeName,
        latlng: new window.kakao.maps.LatLng(pin.lat, pin.lng),
      };
      return position;
    });

    if (mapRef.current === null) {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: positions[0].latlng, // 지도의 중심좌표
        level: 4,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      const mapTypeControl = new window.kakao.maps.MapTypeControl();
      map.addControl(
        mapTypeControl,
        window.kakao.maps.ControlPosition.TOPRIGHT,
      );
      const zoomControl = new window.kakao.maps.ZoomControl();
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
    }

    mapRef.current.setCenter(positions[0].latlng);

    const imageSrc =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

    const polyline = [];
    for (const marker of markers) {
      marker.setMap(null);
    }
    for (let i = 0; i < positions.length; i++) {
      const imageSize = new window.kakao.maps.Size(24, 35);
      const markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
      );
      const marker = new window.kakao.maps.Marker({
        map: mapRef.current,
        position: positions[i].latlng,
        title: positions[i].title,
        image: markerImage,
      });
      setMarkers((state) => [...state, marker]);
      polyline.push(positions[i].latlng);
    }

    for (const linePath of linePaths) {
      linePath.setMap(null);
    }
    const linePath = new window.kakao.maps.Polyline({
      path: polyline, // 선을 구성하는 좌표배열
      strokeWeight: 4, // 선의 두께
      strokeColor: 'black', // 선의 색깔
      strokeOpacity: 0.7, // 선의 불투명도, 1에서 0 사이의 값이며, 0에 가까울수록 투명
      strokeStyle: 'solid', // 선의 스타일
    });
    setLinePaths((state) => [...state, linePath]);
    linePath.setMap(mapRef.current);
  };

  return (
    <>
      <div className="w-full h-[500px]">
        <div id="map" style={{ width: '100vw', height: '500px' }}>
          지도지도
        </div>
      </div>
      <div>
        <div>
          {pins[currentPage]?.map((pin, idx: number) => {
            return (
              <div key={idx}>
                <p>{idx + 1}</p>
                <p>
                  {pin !== null &&
                    typeof pin === 'object' &&
                    'placeName' in pin && <span>{pin.placeName}</span>}
                </p>
                <button
                  className="m-4 bg-slate-400"
                  onClick={() => {
                    updatePin(idx);
                  }}
                >
                  수정
                </button>
                <button
                  className="m-4 bg-slate-400"
                  onClick={() => {
                    deletePin(idx);
                  }}
                >
                  삭제
                </button>
              </div>
            );
          })}
        </div>
        <button type="button" onClick={openModal} className="p-5 bg-slate-500">
          장소 추가하기
        </button>
      </div>
      {isOpenModal && (
        <AddMapModal
          setPins={setPins}
          setIsOpenModal={setIsOpenModal}
          currentPage={currentPage}
        />
      )}
    </>
  );
};

export default AddPlanContents;
