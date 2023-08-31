import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getCoordinate, getCost, insertPlanEnding } from '@api/endingData';
// import { getPath } from '@api/path';
import { getPath } from '@api/path';
import { addPicture } from '@api/picture';
// import { type PinContentsType } from '@api/pins';
import { type PinContentsType } from '@api/pins';
import { useQuery } from '@tanstack/react-query';
import AddPicture from 'components/addpicture/AddPicture';
// import { useQuery } from '@tanstack/react-query';

const AddPhoto = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // useNavigate랑 짝
  // const { state } = useLocation();
  // console.log(state);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (uploadedFiles.length === 0) {
      console.log('No files to upload');
      return;
    }
    const planId = '6f4618d8-bd99-47a8-b3a8-43c1d545cbd6';

    await addPicture(uploadedFiles, planId);

    setUploadedFiles([]);
  };
  const { id } = useParams();
  const planId: string = id as string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [distancePin, setDistancePin] = useState<PinContentsType[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [distanceData, setDistanceData] = useState<string[]>([]);

  const { data } = useQuery([planId], async () => await getCoordinate(planId));
  console.log('data: ', data);

  // 거리 계산하기
  const calcPath = async () => {
    const convertParameters = distancePin.map(({ lng, lat }) => {
      if (lat !== undefined && lng !== undefined) {
        return `${lng},${lat}`;
      }
      return undefined;
    });

    console.log('convertParameters', convertParameters);
    const newData: string[] = [];

    for (let i = 0; i < convertParameters.length; i += 1) {
      if (i === convertParameters.length - 1) {
        break;
      }

      try {
        const data = await getPath({
          origin: convertParameters[i] as string,
          destination: convertParameters[i + 1] as string,
        });

        const distanceInKm = data / 1000;
        newData.push(distanceInKm.toFixed(1));
      } catch (err) {
        console.log(err);
      }
    }

    setDistanceData(newData);
  };

  useEffect(() => {
    void calcPath();
  }, []);
  // useEffect(() => {
  //   if (pin != null && pin.length !== 0) {
  //     setPinArr(pin?.[0].contents as []);
  //   }
  // }, [pin]);

  // 날짜별 합산하기
  const calcCostAndInsertPlansEnding = async () => {
    const response = await getCost(planId);

    if (response !== null && response !== undefined) {
      const datesCost: number[] = [];

      response.forEach((value) => {
        let cost = 0;

        value.contents.forEach((content) => {
          cost += content.cost;
        });

        datesCost.push(cost);
      });

      console.log('datesCost: ', datesCost);

      void insertPlanEnding({
        id: planId,
        dates_cost: datesCost,
      });
    }
  };

  useEffect(() => {
    void calcCostAndInsertPlansEnding();
  }, []);

  useEffect(() => {
    console.log(uploadedFiles);
  }, [uploadedFiles]);

  return (
    <>
      newContents
      <h2> 사진</h2>
      <h3>10개 까지 추가 가능합니다.</h3>
      <form onSubmit={handleSubmit}>
        <AddPicture setUploadedFiles={setUploadedFiles} limit={10} />
        <button type="submit">사진 업로드</button>
      </form>
    </>
  );
};

export default AddPhoto;
