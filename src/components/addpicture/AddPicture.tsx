import React, { useRef, useState, useEffect } from 'react';

import imageCompression from 'browser-image-compression';

interface Props {
  data?: string[];
  limit?: number;
  handleFile: (val: File) => void;
  handleImgSrcList?: (val: string[]) => void;
}

const AddImg: React.FC<Props> = ({
  data,
  limit = 10,
  handleFile,
  handleImgSrcList,
}) => {
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
      const formData = new FormData();
      formData.append('image', compressedFile);
      handleFile(compressedFile);

      const fileReader = new FileReader();
      fileReader.readAsDataURL(compressedFile);
      fileReader.onload = (e) => {
        const result = e?.target?.result as string;
        const updatedImgSrcList = [...imgSrcList, result];
        setImgSrcList(updatedImgSrcList);
        handleImgSrcList?.(updatedImgSrcList);
      };
    }
  };

  useEffect(() => {
    if (data?.length != null) {
      setImgSrcList(data);
      handleImgSrcList?.(data);
    }
  }, [data?.length]);

  return (
    <div className="flex w-full overflow-auto scrollbar-hide">
      {imgSrcList?.map((el, i) => {
        return (
          <div
            key={i}
            className="relative min-w-[200px] max-w-[200px] min-h-[200px] max-h-[200px] bg-black mt-5 mr-5 flex items-center justify-center"
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
      {limit !== imgSrcList?.length ? (
        <div>
          <input
            accept="image/*"
            ref={fileRef}
            onChange={onFileChange}
            type="file"
            className="hidden"
          />
          <div
            onClick={() => {
              fileRef?.current?.click();
            }}
            className="cursor-pointer border-dashed text-[40px] w-[200px] h-[200px] border border-gray-200 mt-5 flex items-center justify-center font-jua text-gray-300"
          >
            +
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AddImg;
