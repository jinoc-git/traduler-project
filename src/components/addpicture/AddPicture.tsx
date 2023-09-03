import React, { useRef, useState } from 'react';

import IconUploadPicture from '@assets/icons/IconUploadPicture';
import imageCompression from 'browser-image-compression';

interface TypePicture {
  limit: number;
  setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const AddPicture = ({ setUploadedFiles, limit }: TypePicture) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const [imgSrcList, setImgSrcList] = useState<string[]>([]);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1920,
    };

    if (file != null) {
      const compressedFile = await imageCompression(file, options);
      const url = URL.createObjectURL(compressedFile);

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
    <div className="flex w-full overflow-auto scrollbar-hide flex-wrap">
      {limit !== imgSrcList?.length ? (
        <div>
          <input
            accept=".jpg, .jpeg, .png"
            ref={fileRef}
            onChange={onFileChange}
            type="file"
            className="hidden"
          />
          <div
            onClick={() => {
              fileRef?.current?.click();
            }}
            className="cursor-pointer border-dashed text-[40px] w-[200px] h-[200px] border border-gray-200 mt-5 mr-[20px] flex items-center justify-center font-Regular text-gray-300"
          >
            <div className="flex items-center">
              <IconUploadPicture fill="#4E4F54" />
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
            key={i}
            className="relative w-[33.33%] min-w-[200px] max-w-[200px] min-h-[200px] max-h-[200px] bg-black mt-5 mr-5 flex items-center justify-center"
          >
            <button
              className="absolute top-0 right-0 bg-[#444040b8] text-white w-8 h-8 flex justify-center items-center"
              onClick={() => {
                handleRemoveImage(i);
              }}
            >
              X
            </button>
            <img
              alt={'이미지'}
              src={el}
              className="w-full h-full object-contain"
            />
          </div>
        );
      })}
    </div>
  );
};

export default AddPicture;
