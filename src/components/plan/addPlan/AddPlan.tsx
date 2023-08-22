import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { type PinContentsType } from '@api/pins';
import { addPlan } from '@api/plans';
import { datesStore } from '@store/datesStore';
import { updatePinStore } from '@store/updatePinStore';
import { userStore } from '@store/userStore';

import AddMapModal from './AddMapModal';
import PostPlan from '../PostPlan';

interface InputType {
  title?: string;
}

const AddPlan = () => {
  const user = userStore((state) => state.user);
  const userId = user?.id;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const openModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  const mapRef = useRef<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [linePaths, setLinePaths] = useState<any[]>([]);

  const [pins, setPins] = useState<PinContentsType[]>([]);

  const { dates } = datesStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InputType>();

  const submitPlan = async () => {
    if (userId !== null) {
      await addPlan(
        userId as string,
        watch('title') as string,
        0,
        pins,
        dates as string[],
      );
      // 저장 후 홈으로 이동해야됨~
    }
  };

  // pin 수정하기 버튼
  const { updateClick } = updatePinStore();
  const updatePin = (idx: number) => {
    const pin = pins[idx];
    updateClick(pin);
    openModal();
  };

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
    if (pins?.length === 0) {
      getMap();
    }
    if (pins?.length !== 0) {
      getMarkerMap(pins);
    }
  }, [pins]);

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
      <form onSubmit={handleSubmit(submitPlan)}>
        <input
          id="title"
          type="text"
          placeholder="제목을 입력하세요"
          {...register('title', {
            required: '제목은 필수입니다.',
            minLength: {
              value: 2,
              message: '제목은 2글자 이상이어야 합니다.',
            },
          })}
        />
        <p>{errors?.title?.message}</p>
        <p>링크 공유하기</p>
        <p>친구 초대하기</p>
        <PostPlan />
        <p>(이전) 날짜 2023-08-21 (다음)</p>
        <div className="w-full h-[500px]">
          <div id="map" style={{ width: '100vw', height: '500px' }}>
            지도지도
          </div>
        </div>
        <div>
          <p>user_id : {user?.id}</p>
          <div>
            {pins?.map((pin, idx: number) => {
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
          <button
            type="button"
            onClick={openModal}
            className="p-5 bg-slate-500"
          >
            장소 추가하기
          </button>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="p-5 mt-10 bg-slate-500"
        >
          저장하기
        </button>
      </form>
      {isOpenModal && (
        <AddMapModal setPins={setPins} setIsOpenModal={setIsOpenModal} />
      )}
    </>
  );
};

export default AddPlan;
