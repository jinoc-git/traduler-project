import React from 'react';

import IconChevronRight from '@assets/icons/IconChevronRight';

const CarouselRightArrow = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="flex-center rounded-full bg-orange absolute top-1/2 -translate-y-1/2 hover:bg-orange_dark
      md:right-[-60px] md:w-[46px] md:h-[46px] 
      sm:right-[-60px] sm:w-[24px] sm:h-[24px]"
    >
      <IconChevronRight w={'w-[16px]'} h={'h-[16px]'} fill="#fff" />
    </button>
  );
};

export default CarouselRightArrow;
