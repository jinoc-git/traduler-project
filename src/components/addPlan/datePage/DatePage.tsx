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
    <div className="flex-center gap-[190px] mt-[24px] mb-[10px] text-sm font-semibold text-gray_dark_1 ">
      {dates.length !== 0 ? (
        <>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
            className="cursor-pointer disabled:cursor-none disabled:opacity-0"
          >
            <IconChevronLeft w="w-[14px]" h="h-[22px]" />
          </button>
          <h1>{dates[currentPage]}</h1>
          <button
            onClick={handleNextPage}
            disabled={currentPage === dates.length - 1}
            className="cursor-pointer disabled:cursor-none disabled:opacity-0"
          >
            <IconChevronRight w="w-[14px]" h="h-[22px]" />
          </button>
        </>
      ) : (
        <div>날짜를 선택하세요</div>
      )}
    </div>
  );
};

export default DatePage;
