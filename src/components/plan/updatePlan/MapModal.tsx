import React, { useEffect, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { type PinContentsType, addPin, updatePin } from '@api/pins';
import MapModalButton from '@components/plan/common/MapModalButton';
import MapModalInput from '@components/plan/common/MapModalInput';
import MapModalPay from '@components/plan/common/MapModalPay';
import MapNonePoly from '@components/plan/common/MapNonePoly';
import MapModalLayout from '@components/plan/common/ModalLayout';
import useConfirm from '@hooks/useConfirm';
import { updatePinStore } from '@store/updatePinStore';
import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type PinInsertType, type Json } from 'types/supabase';

interface InputType {
  address?: string;
  placeName?: string;
  cost?: number;
}

interface PropsType {
  pinQuery?:
    | { contents: Json[]; date: string; id: string; plan_id: string }
    | undefined;
  currentPage: number;
  openModal: () => void;
  closeModal: () => void;
}

const MapModal = ({
  pinQuery,
  openModal,
  currentPage,
  closeModal,
}: PropsType) => {
  const { id } = useParams();
  const planId: string = id as string;
  const { pin, idx, resetPin } = updatePinStore();
  const [position, setPosition] = useState({
    lat: pin !== null ? (pin.lat as number) : 0,
    lng: pin !== null ? (pin.lng as number) : 0,
  });
  const [address, setAddress] = useState<string>('');
  const [map, setMap] = useState<any>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    defaultValues: {
      placeName: pin != null ? pin.placeName : '',
      cost: pin !== null && typeof pin.cost === 'number' ? pin.cost : 0,
    },
  });
  const { confirm } = useConfirm();

  // 장소 검색
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

  // 저장 버튼
  const onSubmitPlaceName: SubmitHandler<InputType> = (data) => {
    const newObj: PinContentsType = {
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
        if (pinQuery !== undefined) {
          const newContents = pinQuery.contents.map((item, index) => {
            if (index === idx) {
              return newObj;
            } else {
              return item;
            }
          });
          const newPin: PinInsertType = {
            contents: newContents as Json[],
            date: pinQuery.date,
            plan_id: pinQuery.plan_id,
          };
          updateMutation.mutate(newPin);
          openModal();
          resetPin();
        }
      };
      confirm.default(confTitle, confDesc, confFunc);
    }
    // 장소추가 시
    else {
      const confTitle = '장소 추가';
      const confDesc = '이대로 추가하시겠습니까?';
      const confFunc = () => {
        if (pinQuery !== undefined) {
          const newContents = [...pinQuery.contents, newObj];
          const newPin: PinInsertType = {
            contents: newContents as Json[],
            date: pinQuery.date,
            plan_id: pinQuery.plan_id,
          };
          addMutation.mutate(newPin);
          openModal();
        }
      };
      confirm.default(confTitle, confDesc, confFunc);
    }
  };

  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: addPin,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['pin', planId, currentPage],
      });
    },
  });
  const updateMutation = useMutation({
    mutationFn: updatePin,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['pin', planId, currentPage],
      });
    },
  });

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

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
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

export default MapModal;
