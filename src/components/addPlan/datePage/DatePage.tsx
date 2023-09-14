import React from 'react';

import IconChevronLeft from '@assets/icons/IconChevronLeft';
import IconChevronRight from '@assets/icons/IconChevronRight';

interface PropsType {
  dates: string[];
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  currentPage: number;
}

const DatePage = ({
  dates,
  handleNextPage,
  handlePreviousPage,
  currentPage,
}: PropsType) => {
  return (
    <div
      className="flex-center mb-[10px] text-sm font-semibold text-gray_dark_1
    sm:w-[310px] sm:mt-[36px] sm:mb-[31px]
    md:w-[700px] md:mt-[24px] md:gap-[190px]"
    >
      {dates.length !== 0 ? (
        <div className="sm:flex sm:justify-center sm:w-[310px] sm:gap-[14px]">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
            className="cursor-pointer disabled:cursor-none disabled:opacity-0"
            name="date-page-previous-page-btn"
          >
            <IconChevronLeft w="w-[14px]" h="h-[22px]" />
          </button>
          <h1>{dates[currentPage]}</h1>
          <button
            onClick={handleNextPage}
            disabled={currentPage === dates.length - 1}
            className="cursor-pointer disabled:cursor-none disabled:opacity-0"
            name="date-page-next-page-btn"
          >
            <IconChevronRight w="w-[14px]" h="h-[22px]" />
          </button>
        </div>
      ) : (
        <div>날짜를 선택하세요</div>
      )}
    </div>
  );
};

export default DatePage;
