import React, { useRef, useState } from 'react';

import IconUploadPicture from '@assets/icons/IconUploadPicture';
import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import { changeFormatAndCompression } from '@utils/changeImageFormat';

interface TypePicture {
  limit: number;
  setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const AddPicture = ({ setUploadedFiles, limit }: TypePicture) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const [imgSrcList, setImgSrcList] = useState<string[]>([]);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file != null) {
      const { compressedFile, url } = await changeFormatAndCompression(file);

      setImgSrcList((prev) => [...prev, url]);
      setUploadedFiles((prev) => [...prev, compressedFile]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImgSrcList((prev) => {
      const removed = [...prev];
      removed.splice(index, 1);
      return removed;
    });
    setUploadedFiles((prev) => {
      const removed = [...prev];
      removed.splice(index, 1);
      return removed;
    });
  };

  return (
    <div
      className="flex flex-wrap mt-5
    sm:w-[267px] sm:mx-auto sm:gap-[10px]
    md:w-[640px] md:gap-[20px] "
    >
      {limit !== imgSrcList?.length ? (
        <div className="sm:mx-auto md:mx-0">
          <input
            accept=".jpg, .jpeg, .png .heic .heif .HEIC .HEIF "
            ref={fileRef}
            onChange={onFileChange}
            type="file"
            name="addpicture-input"
            className="hidden"
          />
          <div
            onClick={() => {
              fileRef?.current?.click();
            }}
            className="cursor-pointer border-dashed text-[40px] border border-gray-200 flex items-center justify-center font-Regular text-gray-300
            sm:w-[268px] sm:h-[56px] sm:rounded-lg sm:mr-[0px]
            md:w-[200px] md:h-[200px] "
          >
            <div className="flex items-center">
              <IconUploadPicture w="w-[24px]" h="h-[24px]" fill="#4E4F54" />
              <div className="w-full ml-[8px] mx-auto font-bold text-normal text-gray_dark_1 py-[13px]">
                사진업로드
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {imgSrcList?.map((el, i) => {
        return (
          <div
            key={uuid()}
            className="relative  bg-black  flex-center
            sm:w-[128px] sm:h-[128px] sm:mt-0 sm:mr-0
            md:w-[200px] md:h-[200px] "
          >
            <button
              className="absolute top-0 right-0 bg-[#444040b8] text-white w-8 h-8 flex justify-center items-center"
              onClick={() => {
                handleRemoveImage(i);
              }}
              name="addpicture-delete-photo-btn"
            >
              X
            </button>
            <img
              alt={'이미지'}
              src={el}
              className="w-full h-full object-cover "
            />
          </div>
        );
      })}
    </div>
  );
};

export default AddPicture;
