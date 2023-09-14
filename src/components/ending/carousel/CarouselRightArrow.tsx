import React from 'react';

import IconChevronRight from '@assets/icons/IconChevronRight';

const CarouselRightArrow = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button
      aria-label="carousel-chevron-right-btn"
      onClick={onClick}
      className="flex-center rounded-full bg-orange absolute top-1/2 -translate-y-1/2 hover:bg-orange_dark
      md:right-[-60px] md:w-[46px] md:h-[46px] 
      sm:right-[-15px] sm:w-[16px] sm:h-[16px]"
    >
      <IconChevronRight
        w={'md:w-[16px] sm:w-[12px]'}
        h={'md:h-[16px] sm:h-[12px]'}
        fill="#fff"
      />
    </button>
  );
};

export default CarouselRightArrow;
