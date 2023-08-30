/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import {
  Map,
  MapMarker,
  MapTypeControl,
  Polyline,
  ZoomControl,
} from 'react-kakao-maps-sdk';

import { type PinContentsType } from '@api/pins';
import AddMapModal from '@components/plan/addPlan/AddMapModal';
import { datesStore } from '@store/datesStore';
import { updatePinStore } from '@store/updatePinStore';

interface PropsType {
  currentPage: number;
  pins: PinContentsType[][];
  setPins: React.Dispatch<React.SetStateAction<PinContentsType[][]>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const AddPlanContents = ({
  currentPage,
  pins,
  setPins,
  setCurrentPage,
}: PropsType) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const openModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  const { oldDates, dates } = datesStore();

  // pin 수정 버튼
  const { updateClick } = updatePinStore();
  const updatePin = (idx: number) => {
    const pin = pins[currentPage][idx];
    updateClick(pin, idx);
    openModal();
  };

  // pin 삭제 버튼
  const deletePin = (idx: number) => {
    const deletedPins = pins.map((pin, i) => {
      if (i === currentPage) {
        return pin.filter((_, j) => j !== idx);
      }
      return pin;
    });
    setPins(deletedPins);
  };

  useEffect(() => {
    setCurrentPage(() => 0);
    const newPins: PinContentsType[][] = [];
    dates.forEach((date) => {
      if (!oldDates.includes(date)) {
        newPins.push([]);
      } else {
        newPins.push(pins[oldDates.indexOf(date)]);
      }
    });
    setPins(() => newPins);
  }, [dates]);

  const mapRef = useRef<any>();
  const [style, setStyle] = useState({
    width: '95vw',
    height: '400px',
    borderRadius: '8px',
  });

  // useEffect(() => {
  //   const map = mapRef.current;
  //   if (map) {
  //     setTimeout(() => {
  //       map.relayout();
  //     }, 3000);
  //   }
  // }, [style]);

  // useEffect(() => {
  // const windowResize = () => {
  //   console.log('resize');
  //   const width = window.innerWidth;
  //   const height = window.innerHeight;
  //   console.log(width);
  //   console.log(height);
  // setStyle({
  //   width : width.toString(),
  //   height : height.toString(),
  //   borderRadius: '8px',
  // });
  // };

  // window.addEventListener(`resize`, windowResize);

  //   return () => {
  //     window.removeEventListener(`resize`, windowResize);
  //   };
  // }, []);

  return (
    <>
      <div className="flex flex-col justify-center gap-5">
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
            style={style}
            level={3}
            ref={mapRef}
          >
            {pins[currentPage]?.map((pin, idx) => {
              return (
                <MapMarker
                  key={idx}
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
                strokeColor={'#FFAE00'} // 선의 색깔입니다
                strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                strokeStyle={'solid'} // 선의 스타일입니다
              />
            )}
            <MapTypeControl position={kakao.maps.ControlPosition.TOPRIGHT} />
            <ZoomControl position={kakao.maps.ControlPosition.RIGHT} />
          </Map>
        </div>
        <div className="flex flex-col justify-center">
          <div className="w-[95%] mt-[17px] mx-auto font-bold text-[18px]">
            방문할 장소
          </div>
          {pins[currentPage]?.map((pin, idx: number) => {
            return (
              <div key={idx}>
                <p>{idx + 1}</p>
                <p>
                  {pin !== null &&
                    typeof pin === 'object' &&
                    'placeName' in pin && <span>{pin.placeName}</span>}
                </p>
                <p>
                  {pin !== null && typeof pin === 'object' && 'cost' in pin && (
                    <span>￦{pin.cost}</span>
                  )}
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
          {dates.length !== 0 && (
            <button
              type="button"
              onClick={openModal}
              className="w-[95%] h-[100px] border border-dashed mt-[17px] rounded-lg mx-auto font-bold text-[18px]"
            >
              장소 추가하기
            </button>
          )}
        </div>
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
