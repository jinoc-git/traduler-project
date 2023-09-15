import React, { useEffect } from 'react';

import IconClose from '@assets/icons/IconClose';
import { disableScrollLock, enableScrollLock } from '@utils/withScrollLock';

interface CarouselModalProps {
  url: string;
  closeFunc: () => void;
}

const CarouselModal: React.FC<CarouselModalProps> = ({ url, closeFunc }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    enableScrollLock();

    return () => {
      document.body.style.overflow = 'auto';
      disableScrollLock();
    };
  });

  return (
    <div className="flex-center fixed top-0 left-0 w-screen h-screen z-[40] bg-black/40">
      <div className="relative ">
        <button
          name="carousel-close-btn"
          onClick={closeFunc}
          className=" absolute top-[0px] right-[-25px] p-2 rounded-xl bg-white opacity-20 hover:opacity-50"
        >
          <IconClose
            w={'md:w-[24px] sm:w-[16px]'}
            h={'md:h-[24px] sm:h-[16px]'}
            fill="#222"
          />
        </button>
        <img
          src={url}
          alt="확대한 사진"
          className="object-contain rounded-3xl md:w-[60vh] md:h-[60vh] sm:w-[80vw] sm:h-[80vw]"
        />
      </div>
    </div>
  );
};

export default CarouselModal;
