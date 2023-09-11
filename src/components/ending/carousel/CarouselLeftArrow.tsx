import React from 'react';

import IconChevronLeft from '@assets/icons/IconChevronLeft';

const CarouselLeftArrow = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="flex-center rounded-full bg-orange absolute top-1/2 -translate-y-1/2 hover:bg-orange_dark
      md:left-[-60px] md:w-[46px] md:h-[46px] 
      sm:left-[-15px] sm:w-[16px] sm:h-[16px]"
    >
      <IconChevronLeft w={'md:w-[16px] sm:w-[12px]'} h={'md:h-[16px] sm:h-[12px]'} fill="#fff" />
    </button>
  );
};

export default CarouselLeftArrow;
