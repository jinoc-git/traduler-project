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
  const today = new Date();

  return (
    <>
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
        selectsStart
        startDate={startDate}
        endDate={endDate}
        minDate={today}
        locale="ko"
        className="react-datepicker"
      />
      &nbsp;
      <label>여행 마지막날짜</label>
      &nbsp;
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
        className="react-datepicker"
      />
    </>
  );
};

export default Calendar;
