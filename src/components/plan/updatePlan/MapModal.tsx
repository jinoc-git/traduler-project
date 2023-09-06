/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { type PinContentsType, addPin, updatePin } from '@api/pins';
import MapModalInput from '@components/plan/addPlan/MapModalInput';
import MapNonePoly from '@components/plan/addPlan/MapNonePoly';
import MapModalLayout from '@components/plan/addPlan/ModalLayout';
import useConfirm from '@hooks/useConfirm';
import { updatePinStore } from '@store/updatePinStore';
import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';

interface InputType {
  address?: string;
  placeName?: string;
  cost?: number;
}

const MapModal = ({
  openModal,
  date,
  currentPage,
  closeModal,
}: {
  closeModal: () => void;
  openModal: () => void;
  date: string;
  currentPage: number;
}) => {
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
  } = useForm<InputType>({
    defaultValues: {
      placeName: pin != null ? pin.placeName : '',
      cost: pin !== null && typeof pin.cost === 'number' ? pin.cost : 0,
    },
  });
  const { id } = useParams();
  const planId: string = id as string;

  // 장소 검색
  const onSubmit: SubmitHandler<InputType> = (data) => {
    if (data.address != null) {
      searchMap(data.address);
    }
  };
  const debouncedSearchMap = _.debounce(onSubmit, 300);

  const { confirm } = useConfirm();
  // 저장 버튼
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
      const confTitle = '장소 수정';
      const confDesc = '이대로 수정하시겠습니까?';
      const confFunc = () => {
        updateMutation.mutate([idx, date, planId, newContents]);
        openModal();
        resetPin();
      };
      confirm.default(confTitle, confDesc, confFunc);
    }
    // 장소추가 시
    else {
      const confTitle = '장소 추가';
      const confDesc = '이대로 추가하시겠습니까?';
      const confFunc = () => {
        addMutation.mutate([date, planId, newContents]);
        openModal();
      };
      confirm.default(confTitle, confDesc, confFunc);
    }
  };

  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: async ([date, planId, newContents]: [
      string,
      string,
      PinContentsType,
    ]) => {
      await addPin(date, planId, newContents);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['pin'] });
    },
  });
  const updateMutation = useMutation({
    mutationFn: async ([idx, date, planId, newContents]: [
      number,
      string,
      string,
      PinContentsType,
    ]) => {
      await updatePin(idx, date, planId, newContents);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['pin', planId, currentPage],
      });
    },
  });

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
        debouncedFunc={debouncedSearchMap}
      />
      <MapNonePoly
        pin={pin}
        setMap={setMap}
        position={position}
        setPosition={setPosition}
      />
      <form
        onSubmit={handleSubmit(onSubmitPlaceName)}
        className="flex gap-[16px]"
      >
        <button
          className="border border-navy text-navy rounded-lg px-[20px] py-[14px] w-[210px] mr-[24px] hover:bg-navy_light_1 duration-200"
          onClick={() => {
            closeModal();
            resetPin();
          }}
        >
          취소
        </button>
        <button
          type="submit"
          disabled={disabledSubmit()}
          className="bg-navy text-white rounded-lg hover:bg-navy_light_3  px-[20px] py-[14px] disabled:bg-gray w-[210px] duration-200"
          onClick={() => {
            handleSubmit(onSubmitPlaceName);
          }}
        >
          {pin !== null ? '수정하기' : '새 장소 추가'}
        </button>
      </form>
    </MapModalLayout>
  );
};

export default MapModal;
