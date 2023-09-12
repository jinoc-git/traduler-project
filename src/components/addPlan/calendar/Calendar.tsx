import React, { useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';

import IconCalendarDefault from '@assets/icons/IconCalendarDefault';
import { modifyStateStore } from '@store/modifyStateStore';
import { screenStore } from '@store/screenStore';
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
  const { modifyState, clearRequiredDates } = modifyStateStore();
  const today = new Date();
  const screenSize = screenStore((state) => state.screenSize);
  useEffect(() => {
    return () => {
      clearRequiredDates();
    };
  }, []);

  return (
    <div
      className="relative z-10 flex items-center 
    sm:w-[286px] sm:block sm:pt-[15px] sm:mx-auto sm:justify-between
    md:w-[680px] md:py-[10px] md:pr-[62px] md:flex md:mx-[6px]"
    >
      <div className="sm:flex sm:justify-between sm:w-[286px] md:w-[280px]">
        <div
          className="flex items-center font-semibold text-gray_dark_1
        sm:gap-[7px] sm:mb-[16px]
        md:gap-2 md:mr-[46px]"
        >
          <IconCalendarDefault w="w-[20px]" h="h-[20px]" fill="#4E4F54" />
          <label className="sm:text-sm sm:w-[63px] md:w-[80px] md:text-normal">
            여행 시작일
          </label>
        </div>
        <DatePicker
          dateFormat="yyyy년 MM월 dd일"
          shouldCloseOnSelect
          showIcon
          selected={startDate}
          onChange={(date) => {
            StartDateChangeHandler(date);
          }}
          minDate={today}
          maxDate={endDate}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          locale="ko"
          className="text-center react-datepicker read-only:cursor-default
          sm:w-[132px] sm:h-[28px]
          md:w-[120px] md:mr-[46px]"
          readOnly={modifyState === 'readOnly'}
          placeholderText="YYYY / MM / DD"
          required
          withPortal={screenSize === 'sm'}
          portalId="datepiker-portal"
        />
      </div>
      <div className="sm:flex sm:justify-between sm:w-[286px] md:w-[280px]">
        <div
          className="flex items-center font-semibold text-gray_dark_1
        sm:gap-[7px] sm:mb-[16px]
        md:gap-2 md:mr-[46px]"
        >
          <IconCalendarDefault w="w-[20px]" h="h-[20px]" fill="#4E4F54" />
          <label className="sm:text-sm sm:w-[63px] md:w-[80px] md:text-normal">
            여행 종료일
          </label>
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
          className="text-center react-datepicker read-only:cursor-default
        sm:w-[132px] sm:h-[28px]
        md:w-[120px]"
          readOnly={modifyState === 'readOnly'}
          placeholderText="YYYY / MM / DD"
          required
          withPortal={screenSize === 'sm'}
          portalId="datepiker-portal"
        />
      </div>
    </div>
  );
};

export default Calendar;
