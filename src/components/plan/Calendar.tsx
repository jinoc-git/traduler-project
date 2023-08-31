import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';

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
    <div className="relative z-10 flex items-center gap-3">
      <label>여행 시작날짜</label>
      &nbsp;
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
        className="text-sm outline-none cursor-pointer react-datepicker read-only:cursor-default w-[150px] h-[30px]"
        readOnly={modifyState === 'readOnly'}
        placeholderText="YYYY / MM / DD"
      />
      <label>여행 마지막날짜</label>
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
        className="text-sm outline-none cursor-pointer react-datepicker read-only:cursor-default w-[150px] h-[30px]"
        readOnly={modifyState === 'readOnly'}
        placeholderText="YYYY / MM / DD"
      />
    </div>
  );
};

export default Calendar;
