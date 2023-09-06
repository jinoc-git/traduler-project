import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';

import IconCalendarDefault from '@assets/icons/IconCalendarDefault';
import { modifyStateStore } from '@store/modifyStateStore';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ko', ko);

interface CalendarProps {
  startDate: Date | null;
  endDate: Date | null;
  StartDateChangeHandler: (date: Date | null) => void;
  EndDateChangeHandler: (date: Date | null) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  startDate,
  endDate,
  StartDateChangeHandler,
  EndDateChangeHandler,
}) => {
  const modifyState = modifyStateStore((state) => state.modifyState);

  return (
    <div className="relative z-10 flex items-center py-[10px] pr-[62px] w-[638px]">
      <div className="flex items-center mr-[46px] gap-2 text-normal font-semibold text-gray_dark_1">
        <IconCalendarDefault w="20" h="20" fill="#4E4F54" />
        <label className="text-normal">여행 시작일</label>
      </div>
      <DatePicker
        dateFormat="yyyy년 MM월 dd일"
        shouldCloseOnSelect
        showIcon
        selected={startDate}
        onChange={(date) => {
          StartDateChangeHandler(date);
        }}
        maxDate={endDate}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        locale="ko"
        className="text-center w-[118px] react-datepicker read-only:cursor-default mr-[46px]"
        readOnly={modifyState === 'readOnly'}
        placeholderText="YYYY / MM / DD"
      />
      <div className="flex items-center mr-[46px] gap-2 text-normal font-semibold text-gray_dark_1">
        <IconCalendarDefault w="20" h="20" fill="#4E4F54" />
        <label>여행 종료일</label>
      </div>
      <DatePicker
        dateFormat="yyyy년 MM월 dd일"
        shouldCloseOnSelect
        showIcon
        selected={endDate}
        onChange={EndDateChangeHandler}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        locale="ko"
        className="text-center w-[120px] react-datepicker read-only:cursor-default"
        readOnly={modifyState === 'readOnly'}
        placeholderText="YYYY / MM / DD"
      />
    </div>
  );
};

export default Calendar;
