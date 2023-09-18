/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  calcAllPath,
  calcCostAndInsertPlansEnding,
  getCoordinate,
  insertPlanEnding,
} from '@api/endingData';
import { addPicture } from '@api/picture';
import { type PinContentsType } from '@api/pins';
import { changePlanState, getPlan } from '@api/plans';
import IconCamera from '@assets/icons/IconCamera';
import IconLocationDefault from '@assets/icons/IconLocationDefault';
import { LoadingGif } from '@assets/index';
import AddPicture from '@components/addPhoto/addPicture/AddPicture';
import EndingMap from '@components/addPhoto/endingMap/EndingMap';
import EndingDate from '@components/common/date/EndingDate';
import Invite from '@components/common/invite/Invite';
import EndingPay from '@components/common/pay/EndingPay';
import Loading from '@components/loading/Loading';
import useConfirm from '@hooks/useConfirm';
import { sideBarStore } from '@store/sideBarStore';
import { userStore } from '@store/userStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type PlansEndingType } from 'types/supabase';

const AddPhoto = () => {
  const isSideBarOpen = sideBarStore((state) => state.isSideBarOpen);
  const user = userStore((state) => state.user);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dates, setDates] = useState<string[]>();
  const [pay, setPay] = useState<string>('');

  const { id } = useParams();
  const planId: string = id as string;
  const [distancePin, setDistancePin] = useState<PinContentsType[][]>([]);
  const navigate = useNavigate();

  const {
    data: plan,
    isLoading: isPlanLoading,
    isError: isPlanError,
  } = useQuery(['plan', planId], async () => await getPlan(planId));

  const { data, isLoading, isError } = useQuery(
    ['planCoordinate', planId],
    async () => await getCoordinate(planId),
  );

  const queryClient = useQueryClient();
  const changeMutation = useMutation({
    mutationFn: changePlanState,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['plan', planId] });
      void queryClient.invalidateQueries({
        queryKey: ['plan_mates', user?.id],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const handleButton = async () => {
    setIsSubmiting(true);
    console.log(distancePin);
    const distanceDataList = await calcAllPath(distancePin);
    const datesCostList = await calcCostAndInsertPlansEnding(planId);
    if (datesCostList !== undefined) {
      const pictures = await addPicture(uploadedFiles, planId);
      const planEnding: PlansEndingType = {
        id: planId,
        distance: distanceDataList,
        dates_cost: datesCostList,
        pictures,
        title: plan?.[0].title as string,
        total_cost: plan?.[0].total_cost as string,
        dates: plan?.[0].dates as string[],
      };
      await insertPlanEnding(planEnding);
      changeMutation.mutate([planId, 'end']);
      navigate(`/ending/${planId}`);
    }
  };

  const { confirm } = useConfirm();
  const handleSubmitButton = () => {
    const confTitle = '여행 저장';
    const confDesc =
      '저장한 여행은 수정할 수 없습니다. 정말로 저장하시겠습니까?';
    const confFunc = () => {
      handleButton();
    };
    confirm.default(confTitle, confDesc, confFunc);
  };

  useEffect(() => {
    if (
      data !== undefined &&
      data !== null &&
      plan !== undefined &&
      plan !== null
    ) {
      const response = data.map((item) => {
        return item;
      });
      setDistancePin(response as PinContentsType[][]);
      setPay(plan[0].total_cost);
      setDates(plan[0].dates);
    }
  }, [data, plan]);

  if (isPlanLoading || isLoading) {
    return <Loading />;
  }

  if (isPlanError || isError) {
    navigate('/error');
    return;
  }

  return (
    <main
      className={`transition-all duration-300 ease-in-out pt-[60px]  ${
        isSideBarOpen ? 'sidebar-open sm:ml-0 md:ml-[270px]' : 'sidebar-close '
      }`}
    >
      <div className="flex flex-col mt-[76px] mx-auto md:w-plan sm:w-[310px]">
        <section>
          <div
            className="flex items-center justify-between
          sm:mb-[35px]
          md:mb-[18px]"
          >
            <h3
              className="font-bold text-gray_dark_1
            sm:text-[20px]
            md:text-[24px]"
            >
              {plan?.[0].title}
            </h3>
            <div className="bg-orange rounded-3xl w-[65px] h-[20px] text-[9px] flex-center font-normal text-white">
              완료된 여행
            </div>
          </div>
          <EndingDate planDates={dates as string[]} />
          <Invite />
          <EndingPay pay={pay} />
        </section>
        <section>
          <div
            className="flex items-center font-semibold text-normal text-gray_dark_1 gap-[8px] 
          sm:w-[286px] sm:my-[35px] sm:text-sm sm:mx-auto
          md:w-[700px] md:my-[10px] md:text-normal md:mx-[6px]"
          >
            <IconLocationDefault w="20" h="20" />
            <p>여행 지역</p>
          </div>
          <EndingMap dates={dates as string[]} />
        </section>
        <section>
          <div className="flex items-center mt-[20px] gap-[8px] mx-[6px] md:w-full md:mx-[6px] sm:w-[286px] sm:mx-auto ">
            <IconCamera w="w-[20px]" h="h-[25px]" fill="#4E4F54" />
            <div
              className="w-full mx-auto font-bold  text-gray_dark_1 py-[13px]
            sm:text-sm
            md:text-normal"
            >
              추억할 사진 올리기
            </div>
          </div>
          <p
            className="text-gray sm:ml-[12px]
            sm:text-sm
            md:text-normal"
          >
            10개 까지 추가 가능합니다.
          </p>
          <AddPicture setUploadedFiles={setUploadedFiles} limit={10} />
        </section>
        <section>
          <div
            className="flex items-center justify-end gap-5
          sm:my-[55px] sm:w-[286px] sm:justify-normal sm:mx-auto
          md:my-[100px] md:w-[720px] md:justify-end"
          >
            <span
              className="text-gray_dark_1 font-Regular 
              sm:w-[170px] sm:text-sm
              md:w-[200px] md:text-noraml"
            >
              여행 잘 다녀오셨나요?
            </span>
            <button
              disabled={isSubmiting}
              onClick={handleSubmitButton}
              className="flex-center p-3 border border-blue rounded-lg font-bold text-blue disabled:border-gray_dark_1 disabled:cursor-default disabled:bg-gray_light_3 disabled:text-gray_dark_1 hover:bg-blue_light_1 duration-200
              sm:w-[113px] sm:text-sm
              md:w-[130px] md:text-normal"
            >
              {isSubmiting ? '저장 중' : '여행 저장'}
              {isSubmiting && (
                <img
                  src={LoadingGif}
                  alt="저장 중"
                  className="ml-[10px]
                    sm:w-[20px] sm:h-[20px]
                    md:w-[27px] md:h-[27px]"
                />
              )}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AddPhoto;
