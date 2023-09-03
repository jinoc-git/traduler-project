/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

import { type PinContentsType } from '@api/pins';
import { updatePinStore } from '@store/updatePinStore';
import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import _ from 'lodash';

interface InputType {
  address?: string;
  placeName?: string;
  cost?: number;
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
    formState: { errors },
  } = useForm<InputType>();
  const {
    register: registerPlaceName,
    handleSubmit: handleSubmitPlaceName,
    formState: { errors: errorsPlaceName, isSubmitting: isSubmittingPlaceName },
  } = useForm<InputType>({
    defaultValues: {
      placeName: pin != null ? pin.placeName : '',
      cost: pin !== null && typeof pin.cost === 'number' ? pin.cost : 0,
    },
  });

  const onSubmit: SubmitHandler<InputType> = (data) => {
    if (data.address != null) {
      searchMap(data.address);
    }
  };
  const debouncedSearchMap = _.debounce(onSubmit, 300);

  const onSubmitPlaceName: SubmitHandler<InputType> = (data) => {
    const newContents: PinContentsType = {
      id: uuid(),
      lat: position.lat,
      lng: position.lng,
      placeName: data.placeName as string,
      cost: data.cost as number,
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

  const searchMap = (address: string) => {
    if (address === '') return;
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(address, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        bounds.extend(new kakao.maps.LatLng(+data[0].y, +data[0].x));
        setPosition({ lat: +data[0].y, lng: +data[0].x });
        map.setBounds(bounds);
      }
    });
  };

  const [map, setMap] = useState<any>();

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center w-screen h-screen bg-black/70">
      <div className="flex flex-col justify-center bg-white w-modal h-modal_2 rounded-lg px-[40px] py-[36px] gap-3">
        <div className="text-[20px] font-bold">방문할 장소</div>
        <div className="text-[16px] font-normal mb-[20px]">
          방문할 장소와 관련된 정보를 저장하세요.
        </div>
        <form
          onSubmit={handleSubmitPlaceName(onSubmitPlaceName)}
          className="flex flex-col gap-[16px]"
        >
          <div className="flex flex-col">
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
              className="input-border"
            />
            <p>{errorsPlaceName?.placeName?.message}</p>
          </div>
          <div className="flex flex-col">
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
              onChange={(e) => debouncedSearchMap({ address: e.target.value })}
              className="input-border"
            />
            <p>{errors?.address?.message}</p>
          </div>
          <div className="flex flex-col">
            <label htmlFor="cost">지출 비용</label>
            <input
              id="cost"
              type="number"
              placeholder="지출 비용을 입력해주세요."
              {...registerPlaceName('cost', {
                valueAsNumber: true, // 이 부분 추가하여 문자열이 아닌 숫자 값으로 등록
              })}
              className="input-border"
            />
          </div>
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
            ></MapMarker>
          </Map>
          <div className="flex justify-between w-[420px]">
            <button
              className="border border-#4f4f4f rounded-lg px-[20px] py-[14px] w-[210px] mr-[24px]"
              onClick={() => {
                setIsOpenModal(false);
                resetPin();
              }}
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isSubmittingPlaceName || disabledSubmit()}
              className="bg-[#4f4f4f] text-white rounded-lg px-[20px] py-[14px] disabled:bg-black w-[210px]"
            >
              새 장소 추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddMapModal;
