import React from 'react';

import IconChevronLeft from '@assets/icons/IconChevronLeft';

const CarouselLeftArrow = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="flex-center rounded-full bg-orange absolute top-1/2 left-[-60px] -translate-y-1/2 md:w-[46px] md:h-[46px]"
    >
      <IconChevronLeft w={'w-[16px]'} h={'h-[16px]'} fill="#fff" />
    </button>
  );
};

export default CarouselLeftArrow;
