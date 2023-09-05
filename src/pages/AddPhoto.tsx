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
import Invite from '@components/common/invite/Invite';
import Loading from '@components/loading/Loading';
import EndingDate from '@components/plan/ending/EndingDate';
import EndingMap from '@components/plan/ending/EndingMap';
import EndingPay from '@components/plan/ending/EndingPay';
import { sideBarStore } from '@store/sideBarStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AddPicture from 'components/addpicture/AddPicture';

const AddPhoto = () => {
  const { isSideBarOpen, isVisibleSideBar } = sideBarStore();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dates, setDates] = useState<string[]>();
  const [pay, setPay] = useState<number>();

  const { id } = useParams();
  const planId: string = id as string;
  const [distancePin, setDistancePin] = useState<PinContentsType[][]>([]);
  const navigate = useNavigate();

  const { data: plan, isLoading: isPlanLoading } = useQuery(
    ['plan', planId],
    async () => await getPlan(planId),
  );

  const { data, isLoading, isError } = useQuery(
    ['planCoordinate', planId],
    async () => await getCoordinate(planId),
  );
  const queryClient = useQueryClient();
  const changeMutation = useMutation({
    mutationFn: changePlanState,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['plan', planId] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleButton = async () => {
    const distanceDataList = await calcAllPath(distancePin);
    const datesCostList = await calcCostAndInsertPlansEnding(planId);
    console.log(distanceDataList);
    if (datesCostList !== undefined) {
      const pictures = await addPicture(uploadedFiles, planId);
      await insertPlanEnding({
        id: planId,
        distance: distanceDataList,
        dates_cost: datesCostList,
        pictures,
      });
      changeMutation.mutate([planId, 'end']);
      navigate(`/ending/${planId}`);
    }
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

  if (isError) {
    return <div>Error occurred while fetching data.</div>;
  }

  return (
    <main
      className={`transition-all duration-300 ease-in-out pt-[108px]  ${
        isVisibleSideBar
          ? isSideBarOpen
            ? 'w-[calc(100vw-270px)] ml-[270px]'
            : 'w-[calc(100vw-88px)] ml-[88px]'
          : 'w-[calc(100vw)] ml-0'
      }`}
    >
      <section className="main-layout ">
        <div className="flex flex-col w-plan mt-[76px]">
          <div className="flex items-center mb-[18px]">
            <h3 className="font-bold text-gray_dark_1">{plan?.[0].title}</h3>
            <div className="bg-orange rounded-3xl w-[65px] h-[20px] text-[9px] flex-center font-normal text-white ml-[50px]">
              완료된 여행
            </div>
          </div>
          <EndingDate planDates={dates as string[]} />
          <Invite />
          <EndingPay pay={pay as number} />
          <div className="flex items-center my-[10px] text-normal font-semibold text-gray_dark_1 gap-[8px]">
            <IconLocationDefault w="20" h="20" />
            <label>여행지역</label>
          </div>
          <EndingMap />
          <div className="flex items-center">
            <IconCamera w="20" h="25" fill="#4E4F54" />
            <div className="w-full ml-[8px] mx-auto font-bold text-normal text-gray_dark_1 py-[13px]">
              추억할 사진 올리기
            </div>
          </div>
          <p className="text-gray">10개 까지 추가 가능합니다.</p>
          <AddPicture setUploadedFiles={setUploadedFiles} limit={10} />
          <div className="flex my-[100px] items-center justify-end gap-5">
            <span>여행 잘 다녀오셨나요?</span>
            <button
              onClick={handleButton}
              className="w-[130px] p-3 border border-blue rounded-lg font-bold text-blue"
            >
              여행 저장
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AddPhoto;
