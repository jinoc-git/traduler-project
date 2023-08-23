/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { type PinContentsType } from '@api/pins';
import { updatePinStore } from '@store/updatePinStore';

interface InputType {
  address?: string;
  placeName?: string;
}

interface PropsType {
  setPins: React.Dispatch<React.SetStateAction<PinContentsType[][]>>;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: number;
}

const AddMapModal = ({ setPins, setIsOpenModal, currentPage }: PropsType) => {
  // 수정하기 눌렀을 때 해당 pin에 대한 정보를 store에서 불러옴
  const { pin, resetPin } = updatePinStore();

  const [position, setPosition] = useState({
    La: 37.566826004661,
    Ma: 126.978652258309,
  });
  const [markers, setMarkers] = useState<any[]>([]);
  const mapRef = useRef<any>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<InputType>();
  const {
    register: registerPlaceName,
    watch: watchPlaceName,
    handleSubmit: handleSubmitPlaceName,
    formState: { errors: errorsPlaceName, isSubmitting: isSubmittingPlaceName },
  } = useForm<InputType>({
    defaultValues: {
      placeName: pin != null ? pin.placeName : '',
    },
  });

  const getMap = (data: string) => {
    if (mapRef.current === null) {
      const mapContainer = document.getElementById('mapModal');
      const mapOption = {
        center: new window.kakao.maps.LatLng(
          pin != null ? pin.lat : 37.566826004661,
          pin != null ? pin.lng : 126.978652258309,
        ),
        level: 3,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      mapRef.current = map;
    }
    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(data, placesSearchCB);

    if (pin != null) {
      const marker = new window.kakao.maps.Marker({
        map: mapRef.current,
        position: new window.kakao.maps.LatLng(pin.lat, pin.lng),
      });
      setMarkers((state) => [...state, marker]);
      setPosition({ La: pin.lng as number, Ma: pin.lat as number });
      getAddress(pin.lat as number, pin.lng as number);
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

    function getAddress(lat: number, lng: number) {
      const geocoder = new window.kakao.maps.services.Geocoder();

      const coord = new window.kakao.maps.LatLng(lat, lng);
      const callback = function (
        result: Array<{ address: { address_name: any } }>,
        status: any,
      ) {
        if (status === window.kakao.maps.services.Status.OK) {
          setValue('address', result[0].address.address_name);
        }
      };
      geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    }
  };

  const onSubmit: SubmitHandler<InputType> = (data) => {
    if (data.address !== undefined) {
      getMap(data.address);
    }
  };

  const onSubmitPlaceName: SubmitHandler<InputType> = (data) => {
    const newContents: PinContentsType = {
      lat: position.La,
      lng: position.Ma,
      placeName: data.placeName as string,
    };

    setPins((state) => {
      console.log('장소추가', newContents);
      return state.map((item, idx) => {
        if (idx === currentPage) {
          console.log('장소추가', currentPage);
          return [...item, newContents];
        }
        return item;
      });
    });
    setIsOpenModal(false);
  };

  useEffect(() => {
    getMap(' ');
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
        <button
          className="bg-slate-400"
          onClick={() => {
            setIsOpenModal(false);
            resetPin();
          }}
        >
          닫기
        </button>
      </div>
    </div>
  );
};
export default AddMapModal;
