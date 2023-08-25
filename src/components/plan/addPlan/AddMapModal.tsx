/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

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
  const { pin, idx, resetPin } = updatePinStore();
  const [position, setPosition] = useState({
    lat: pin !== null ? (pin.lat as number) : 0,
    lng: pin !== null ? (pin.lng as number) : 0,
  });
  const {
    register,
    handleSubmit,
    watch,
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

  const onSubmit: SubmitHandler<InputType> = (data) => {};

  const onSubmitPlaceName: SubmitHandler<InputType> = (data) => {
    const newContents: PinContentsType = {
      lat: position.lat,
      lng: position.lng,
      placeName: data.placeName as string,
    };

    // 수정하기 시
    if (pin !== null) {
      setPins((state) => {
        console.log('장소수정', newContents);
        return state.map((item, i) => {
          if (i === currentPage) {
            console.log('장소수정', currentPage);
            item[idx] = newContents;
            return [...item];
          }
          return item;
        });
      });
    }
    // 장소추가 시
    else {
      setPins((state) => {
        console.log('장소추가', newContents);
        return state.map((item, i) => {
          if (i === currentPage) {
            return [...item, newContents];
          }
          return item;
        });
      });
    }

    setIsOpenModal(false);
    resetPin();
  };

  const disabledSubmit = () => {
    if (position.lat === 0 || position.lng === 0) {
      return true;
    }
    return false;
  };

  const [map, setMap] = useState<any>();
  useEffect(() => {
    if (map === undefined) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(
      watch('address') === '' ? ' ' : (watch('address') as string),
      (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          const bounds = new kakao.maps.LatLngBounds();
          bounds.extend(new kakao.maps.LatLng(+data[0].y, +data[0].x));
          setPosition({ lat: +data[0].y, lng: +data[0].x });
          map.setBounds(bounds);
        }
      },
    );
  }, [map, watch('address')]);

  return (
    <div className="absolute top-0 z-10 flex items-center justify-center w-screen h-screen bg-black/70">
      <div className="flex-col p-10 items-center justify-center align-middle bg-white h-[800px]">
        <Map
          center={{
            lat: pin != null ? (pin.lat as number) : 37.566826004661,
            lng: pin !== null ? (pin.lng as number) : 126.978652258309,
          }}
          className="w-[50vw] h-[500px]"
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
          ></MapMarker>
        </Map>
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
            disabled={isSubmittingPlaceName || disabledSubmit()}
            className="bg-slate-400 disabled:bg-black"
          >
            저장
          </button>
        </form>
        <div>
          위도, 경도
          <br />
          {position.lat}, {position.lng}
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
