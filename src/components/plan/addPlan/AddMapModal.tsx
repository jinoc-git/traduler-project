import React, { useEffect, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { type PinContentsType } from '@api/pins';
import MapModalButton from '@components/plan/common/MapModalButton';
import MapModalInput from '@components/plan/common/MapModalInput';
import MapModalPay from '@components/plan/common/MapModalPay';
import MapNonePoly from '@components/plan/common/MapNonePoly';
import MapModalLayout from '@components/plan/common/ModalLayout';
import useConfirm from '@hooks/useConfirm';
import { updatePinStore } from '@store/updatePinStore';
import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';

export interface InputType {
  address?: string;
  placeName?: string;
  cost?: number;
}

interface PropsType {
  setPins: React.Dispatch<React.SetStateAction<PinContentsType[][]>>;
  closeModal: () => void;
  currentPage: number;
  value: boolean;
}

const AddMapModal = ({
  setPins,
  closeModal,
  currentPage,
  value,
}: PropsType) => {
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
        closeModal();
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
        closeModal();
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

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  });

  return (
    <MapModalLayout value={value}>
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
      <MapModalPay register={register} />
      <MapModalButton
        handleSubmit={handleSubmit}
        onSubmitPlaceName={onSubmitPlaceName}
        closeModal={closeModal}
        resetPin={resetPin}
        disabledSubmit={disabledSubmit}
        pin={pin}
      />
    </MapModalLayout>
  );
};
export default AddMapModal;
