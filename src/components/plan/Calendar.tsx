import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';

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
  // const today = new Date();

  return (
    <div className="relative z-10 flex items-center gap-3">
      <label>여행 시작날짜</label>
      &nbsp;
      <DatePicker
        dateFormat="yyyy년 MM월 dd일"
        shouldCloseOnSelect
        showIcon
        selected={startDate}
        maxDate={endDate}
        onChange={(date) => {
          StartDateChangeHandler(date);
        }}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        maxDate={endDate}
        locale="ko"
        className="outline-none cursor-pointer react-datepicker"
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
        className="outline-none cursor-pointer react-datepicker"
      />
    </div>
  );
};

export default Calendar;
