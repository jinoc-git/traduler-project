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
    <div className="flex-center gap-[190px] mb-10 text-[14px] font-semibold ">
      {dates.length !== 0 ? (
        <>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
            className="cursor-pointer disabled:cursor-none disabled:opacity-0"
          >
            <IconChevronLeft />
          </button>
          <h1>{dates[currentPage]}</h1>
          <button
            onClick={handleNextPage}
            disabled={currentPage === dates.length - 1}
            className="cursor-pointer disabled:cursor-none disabled:opacity-0"
          >
            <IconChevronRight />
          </button>
        </>
      ) : (
        <div>날짜를 선택하세요</div>
      )}
    </div>
  );
};

export default DatePage;
