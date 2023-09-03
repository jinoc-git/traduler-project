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
import IconCamera from '@assets/icons/IconCamera';
import Invite from '@components/common/invite/Invite';
import Loading from '@components/loading/Loading';
import EndingMap from '@components/plan/ending/EndingMap';
import { sideBarStore } from '@store/sideBarStore';
import { useQuery } from '@tanstack/react-query';
import AddPicture from 'components/addpicture/AddPicture';

const AddPhoto = () => {
  const { isSideBarOpen, isVisibleSideBar } = sideBarStore();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const { id } = useParams();
  const planId: string = id as string;
  const [distancePin, setDistancePin] = useState<PinContentsType[][]>([]);
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery(
    [planId],
    async () => await getCoordinate(planId),
  );

  const handleButton = async () => {
    // 전체 거리 계산 데이터
    const distanceDataList = await calcAllPath(distancePin);
    // 전체 비용 계산 데이터
    const datesCostList = await calcCostAndInsertPlansEnding(planId);

    // 마지막 데이터 베이스에 넣기
    if (datesCostList !== undefined) {
      // 전체 사진 데이터 저장
      const pictures = await addPicture(uploadedFiles, planId);
      await insertPlanEnding({
        id: planId,
        distance: distanceDataList,
        dates_cost: datesCostList,
        pictures,
      });

      navigate(`/ending/${planId}`);
    }
  };

  useEffect(() => {
    if (data !== undefined && data !== null) {
      const response = data.map((item) => {
        return item;
      });
      setDistancePin(response as PinContentsType[][]);
    }
  }, [data]);

  if (isLoading) {
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
        <Invite />
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
      </section>
    </main>
  );
};

export default AddPhoto;
