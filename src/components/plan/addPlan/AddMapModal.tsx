import React, { useEffect, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { type PinContentsType } from '@api/pins';
import MapModalInput from '@components/plan/addPlan/MapModalInput';
import MapNonePoly from '@components/plan/addPlan/MapNonePoly';
import MapModalLayout from '@components/plan/addPlan/ModalLayout';
import useConfirm from '@hooks/useConfirm';
import { updatePinStore } from '@store/updatePinStore';
import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';

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
  const [address, setAddress] = useState<string>('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    mode: 'onChange',
    defaultValues: {
      placeName: pin != null ? pin.placeName : '',
      cost: pin !== null && typeof pin.cost === 'number' ? pin.cost : 0,
    },
  });

  const { confirm } = useConfirm();
  const onSubmitPlaceName: SubmitHandler<InputType> = (data) => {
    const newContents: PinContentsType = {
      id: uuid(),
      lat: position.lat,
      lng: position.lng,
      placeName: data.placeName as string,
      cost: data.cost as number,
      address,
    };
    // 수정하기 시
    if (pin !== null) {
      const confTitle = '장소 수정';
      const confDesc = '이대로 수정하시겠습니까?';
      const confFunc = () => {
        setPins((state) => {
          return state.map((item, i) => {
            if (i === currentPage) {
              item[idx] = newContents;
              return [...item];
            }
            return item;
          });
        });
        setIsOpenModal(false);
        resetPin();
      };
      confirm.default(confTitle, confDesc, confFunc);
    }
    // 장소추가 시
    else {
      const confTitle = '장소 추가';
      const confDesc = '이대로 추가하시겠습니까?';
      const confFunc = () => {
        setPins((state) => {
          return state.map((item, i) => {
            if (i === currentPage) {
              return [...item, newContents];
            }
            return item;
          });
        });
        setIsOpenModal(false);
        resetPin();
      };
      confirm.default(confTitle, confDesc, confFunc);
    }
  };

  const disabledSubmit = () => {
    if (
      position.lat === 0 ||
      position.lng === 0 ||
      isSubmitting ||
      watch('placeName')?.length === 0
    ) {
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
  // const scrollPosition = window.scrollY;
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    setScrollPosition(window.scrollY);
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.removeProperty('position');
      document.body.style.removeProperty('top');
      document.body.style.removeProperty('left');
      document.body.style.removeProperty('right');

      window.scrollTo(0, scrollPosition);
    };
  });

  return (
    <MapModalLayout>
      <MapModalInput
        register={register}
        errors={errors}
        searchMap={searchMap}
      />
      <MapNonePoly
        pin={pin}
        setMap={setMap}
        position={position}
        setPosition={setPosition}
        setAddress={setAddress}
      />
      <div className="flex flex-col">
        <label htmlFor="cost" className="mb-2 text-sm font-semibold">
          지출 비용
        </label>
        <input
          id="cost"
          type="number"
          placeholder="지출 비용을 입력해주세요."
          {...register('cost', {
            valueAsNumber: true, // 이 부분 추가하여 문자열이 아닌 숫자 값으로 등록
          })}
          className="input-border
          sm:h-[44px] sm:text-sm sm:font-medium"
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmitPlaceName)}
        className="flex gap-[8px] h-[44px] items-center"
      >
        <button
          className="border border-navy text-navy rounded-lg px-[20px] py-[8px] w-[100%] mr-[8px] hover:bg-navy_light_1 duration-200"
          onClick={() => {
            setIsOpenModal(false);
            resetPin();
          }}
        >
          취소
        </button>
        <button
          type="submit"
          disabled={disabledSubmit()}
          className="bg-navy text-white rounded-lg hover:bg-navy_light_3 px-[20px] py-[8px] disabled:bg-gray w-[100%] duration-200"
          onSubmit={() => {
            handleSubmit(onSubmitPlaceName);
          }}
        >
          {pin !== null ? '수정하기' : '새 장소 추가'}
        </button>
      </form>
    </MapModalLayout>
  );
};
export default AddMapModal;
