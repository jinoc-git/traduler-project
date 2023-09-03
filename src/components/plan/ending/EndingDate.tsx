import React from 'react';

import IconCalendarDefault from '@assets/icons/IconCalendarDefault';

import PayLayout from '../PayLayout';

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
    <PayLayout>
      <div className="flex items-center ">
        <IconCalendarDefault w="20" h="20" fill="#4E4F54" />
        <p className="ml-2 font-semiBold text-gray_dark_1">여행 일정</p>
        <div className="font-semibold text-normal ml-[50px]">
          {startDate[0]}년 {startDate[1]}월 {startDate[2]}일 ({startDay})~{' '}
          {endDate[0]}년 {endDate[1]}월 {endDate[2]}일 ({endDay}), {nights}박{' '}
          {days}일
        </div>
      </div>
    </PayLayout>
  );
};

export default EndingDate;
