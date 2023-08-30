import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getCost, insertPlanEnding } from '@api/datesPay';
import { addPicture } from '@api/picture';
import AddPicture from 'components/addpicture/AddPicture';

const AddPhoto = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

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

  // 08-30
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

      console.log('result: ', datesCost);

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
