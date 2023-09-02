import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  calcAllPath,
  calcCostAndInsertPlansEnding,
  getCoordinate,
  getEndingCost,
  insertPlanEnding,
} from '@api/endingData';
import { addPicture } from '@api/picture';
import { type PinContentsType } from '@api/pins';
import { getMates } from '@api/planMates';
import { useQuery } from '@tanstack/react-query';
import AddPicture from 'components/addpicture/AddPicture';

const AddPhoto = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const { id } = useParams();
  const planId: string = id as string;
  const [distancePin, setDistancePin] = useState<PinContentsType[][]>([]);
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery(
    [planId],
    async () => await getCoordinate(planId),
  );

  const calcDutchPay = async () => {
    try {
      const realResult = await calcCostAndInsertPlansEnding(planId);
      console.log('가격 배열:', realResult);

      const budget = await getEndingCost(); // 예산을 가져오는 비동기 함수
      const invitees = await getMates(planId);
      const inviteesNumber = invitees.length;

      if (
        realResult !== null &&
        realResult !== undefined &&
        budget !== null &&
        budget !== undefined &&
        typeof budget.totalCost === 'number' &&
        invitees !== null &&
        invitees !== undefined
      ) {
        const totalCost = realResult.reduce((acc, val) => acc + val, 0);
        const perPersonCost = totalCost / inviteesNumber;
        const remainingBudget = budget.totalCost - perPersonCost;

        console.log('예산:', budget.totalCost);
        console.log('초대 인원:', invitees);
        console.log('총 비용:', totalCost);
        console.log('1인당 비용:', perPersonCost);
        console.log('남은 예산:', remainingBudget);
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  calcDutchPay();
  const handleButton = async () => {
    // 전체 거리 계산 데이터
    console.log('=>', distancePin);
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
        console.log('detailData.contents:', item);
        return item;
      });
      console.log(response);
      setDistancePin(response as PinContentsType[][]);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중일 때 보여줄 내용
  }

  if (isError) {
    return <div>Error occurred while fetching data.</div>; // 에러 발생 시 보여줄 내용
  }

  return (
    <>
      newContents
      <h2> 사진</h2>
      <h3>10개 까지 추가 가능합니다.</h3>
      <AddPicture setUploadedFiles={setUploadedFiles} limit={10} />
      <button
        style={{ marginLeft: '200px' }}
        onClick={handleButton}
        className="p-3 border rounded-lg border-gray w-[130px]"
      >
        사진 저장
      </button>
    </>
  );
};

export default AddPhoto;
