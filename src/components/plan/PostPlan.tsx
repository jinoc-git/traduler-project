/* eslint-disable no-unmodified-loop-condition */
import React, { useEffect, useState } from 'react';

// import { addPlan } from '@api/supabasePlans';
import Calendar from '@components/plan/Calendar';
import { datesStore } from '@store/datesStore';

export interface PlanFormData {
  date: string | null;
}

const PostPlan: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { setDates } = datesStore();

  const StartDateChangeHandler = (date: Date | null) => {
    setStartDate(date);
  };
  const EndDateChangeHandler = (date: Date | null) => {
    setEndDate(date);
  };

  const allPlanDates = (startDate: Date, endDate: Date): string[] => {
    const dates: string[] = [];
    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);
    currentDate.setDate(currentDate.getDate() + 1);
    lastDate.setDate(lastDate.getDate() + 1);

    while (currentDate <= lastDate) {
      dates.push(currentDate.toISOString().slice(0, 10));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  useEffect(() => {
    if (startDate != null && endDate != null) {
      // console.log('allPlanDates', allPlanDates(startDate, endDate));
      const dates = allPlanDates(startDate, endDate);
      setDates(dates);
    }
  }, [startDate, endDate]);

  return (
    <div className="h-[300px]">
      <Calendar
        startDate={startDate}
        endDate={endDate}
        StartDateChangeHandler={StartDateChangeHandler}
        EndDateChangeHandler={EndDateChangeHandler}
      />
    </div>
  );
};

export default PostPlan;
