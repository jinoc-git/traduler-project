import React from 'react';

import IconCalendarDefault from '@assets/icons/IconCalendarDefault';

interface PropsType {
  planDates: string[];
}

const EndingDate = ({ planDates }: PropsType) => {
  if (planDates === undefined) return;
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const startDate = planDates?.[0].split('-');
  const endDate = planDates?.[planDates.length - 1].split('-');
  const startDay = daysOfWeek[new Date(planDates[0]).getDay()];
  const endDay = daysOfWeek[new Date(planDates[planDates.length - 1]).getDay()];

  const nights = planDates?.length - 1;
  const days = planDates?.length;
  return (
    <div>
      <div className="flex md:mx-[6px] sm:mx-auto mb-[17px] md:justify-normal md:w-full sm:justify-between sm:w-[286px]">
        <div className="flex">
          <IconCalendarDefault w="w-[20px]" h="h-[20px]" fill="#4E4F54" />
          <p
            className="ml-2 font-SemiBold text-gray_dark_1
          sm:text-sm
          md:text-normal"
          >
            여행 일정
          </p>
        </div>
        <div
          className="font-semibold ml-[50px] text-right text-gray_dark_1
        sm:text-[12px] sm:block
        md:text-normal md:hidden"
        >
          시작일:{startDate[0]}년 {startDate[1]}월 {startDate[2]}일 ({startDay})
          <br />
          종료일:{endDate[0]}년 {endDate[1]}월 {endDate[2]}일 ({endDay})<br />
          {nights}박 {days}일
        </div>
        <div
          className="font-semibold ml-[50px] text-right text-gray_dark_1
        sm:text-[12px] sm:hidden
        md:text-normal md:block"
        >
          {startDate[0]}년 {startDate[1]}월 {startDate[2]}일 ({startDay}) -{' '}
          {endDate[0]}년 {endDate[1]}월 {endDate[2]}일 ({endDay}), {nights}박{' '}
          {days}일
        </div>
      </div>
    </div>
  );
};

export default React.memo(EndingDate);
