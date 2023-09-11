import React from 'react';

import IconChevronRight from '@assets/icons/IconChevronRight';

const CarouselRightArrow = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="flex-center rounded-full bg-orange absolute top-1/2 right-[-50px] -translate-y-1/2 md:w-[46px] md:h-[46px] "
    >
      <IconChevronRight w={'w-[16px]'} h={'h-[16px]'} fill="#fff" />
    </button>
  );
};

export default CarouselRightArrow;
