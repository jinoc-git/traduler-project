/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { type PinContentsType, addPin } from '@api/pins';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface InputType {
  address?: string;
  placeName?: string;
}

const MapModal = ({
  openModal,
  date,
}: {
  openModal: () => void;
  date: string;
}) => {
  const [position, setPosition] = useState({ La: 0, Ma: 0 });
  const [markers, setMarkers] = useState<any[]>([]);
  const mapRef = useRef<any>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputType>();
  const {
    register: registerPlaceName,
    watch: watchPlaceName,
    handleSubmit: handleSubmitPlaceName,
    formState: { errors: errorsPlaceName, isSubmitting: isSubmittingPlaceName },
  } = useForm<InputType>({
    defaultValues: {
      placeName: '',
    },
  });
  const planId = 'b3bdfec0-4107-441c-b477-19d96e5b566e';

  const getMap = (data: string, mapRef: any) => {
    if (mapRef.current === null) {
      const mapContainer = document.getElementById('mapModal');
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.566826004661, 126.978652258309),
        level: 3,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      mapRef.current = map;
    } else {
      const ps = new window.kakao.maps.services.Places();
      ps.keywordSearch(data, placesSearchCB);
    }
    function placesSearchCB(data: string | any[], status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        const bounds = new window.kakao.maps.LatLngBounds();
        displayMarker(data[0]);
        bounds.extend(new window.kakao.maps.LatLng(data[0].y, data[0].x));
        mapRef.current.setBounds(bounds);
      }
    }

    function displayMarker(place: { y: any; x: any }) {
      for (const marker of markers) {
        marker.setMap(null);
      }
      const marker = new window.kakao.maps.Marker({
        map: mapRef.current,
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });
      setMarkers((state) => [...state, marker]);
      setPosition({ La: place.y, Ma: place.x });
      window.kakao.maps.event.addListener(marker, 'dragend', function () {
        setPosition({
          La: marker.getPosition().Ma,
          Ma: marker.getPosition().La,
        });
      });
      marker.setDraggable(true);
    }
  };

  const onSubmit: SubmitHandler<InputType> = (data) => {
    if (data.address !== undefined) {
      getMap(data.address, mapRef);
    }
  };

  const onSubmitPlaceName: SubmitHandler<InputType> = (data) => {
    const newContents: PinContentsType = {
      lat: position.La,
      lng: position.Ma,
      placeName: data.placeName as string,
    };

    mutation.mutate([date, planId, newContents]);
    openModal();
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ([date, planId, newContents]: [
      string,
      string,
      PinContentsType,
    ]) => {
      await addPin(date, planId, newContents);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['pins'] });
    },
  });

  useEffect(() => {
    getMap(' ', mapRef);
  }, []);

  return (
    <div className="absolute top-0 z-10 flex items-center justify-center w-screen h-screen bg-black/70">
      <div className="flex-col p-10 items-center justify-center align-middle bg-white h-[800px]">
        <div className="w-[50vw]">
          <div id="mapModal" style={{ width: '50vw', height: '500px' }}>
            지도지도
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="address">주소</label>
          <input
            id="address"
            type="text"
            placeholder="주소를 검색하세요"
            {...register('address', {
              required: '주소를 입력하고 검색해주세요.',
              minLength: {
                value: 2,
                message: '주소는 2글자 이상이어야 합니다.',
              },
              pattern: {
                value: /^[가-힣|0-9|\s-]*$/,
                message: '모음, 자음 안됨',
              },
            })}
          />
          <p>{errors?.address?.message}</p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-slate-400"
          >
            검색
          </button>
        </form>
        <form onSubmit={handleSubmitPlaceName(onSubmitPlaceName)}>
          <label htmlFor="placeName">장소 이름</label>
          <input
            id="placeName"
            type="text"
            placeholder="장소 이름을 입력하세요"
            {...registerPlaceName('placeName', {
              required: '장소 이름은 필수 입력값입니다.',
              minLength: {
                value: 2,
                message: '장소 이름은 2자 이상이어야 합니다.',
              },
              pattern: {
                value: /^[가-힣|a-z|A-Z|0-9|\s-]*$/,
                message: '모음, 자음 안됨',
              },
            })}
          />
          <p>{errorsPlaceName?.placeName?.message}</p>
          <button
            type="submit"
            disabled={isSubmittingPlaceName}
            className="bg-slate-400"
          >
            저장
          </button>
        </form>
        <div>
          위도, 경도
          <br />
          {position.La}, {position.Ma}
          <br />
          장소이름
          <br />
          {watchPlaceName('placeName')}
        </div>
        <button className="bg-slate-400" onClick={openModal}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default MapModal;
