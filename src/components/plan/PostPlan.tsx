/* eslint-disable no-unmodified-loop-condition */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPlan } from '@api/plans';
import Calendar from '@components/plan/Calendar';
import { datesStore } from '@store/datesStore';
import { useQuery } from '@tanstack/react-query';

export interface PlanFormData {
  date: string | null;
}

const PostPlan: React.FC = () => {
  const { id } = useParams();
  const planId: string = id as string;
  // eslint-disable-next-line @typescript-eslint/return-await
  const { data: plan } = useQuery(['plan'], async () => await getPlan(planId));
  const dataDates: string[] = plan?.[0].dates as string[];
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { setDates } = datesStore();

  useEffect(() => {
    if (plan != null) {
      console.log(dataDates);
      setStartDate(new Date(dataDates[0]));
      setEndDate(new Date(dataDates[dataDates.length - 1]));
    }
  }, [plan]);

  const StartDateChangeHandler = (date: Date | null) => {
    setStartDate(date);
  };
  const EndDateChangeHandler = (date: Date | null) => {
    setEndDate(date);
  };

  const allPlanDates = (startDate: Date, endDate: Date): string[] => {
    const dates: string[] = [];
    const koreaOffset = 9 * 60 * 60 * 1000;
    const currentDate = new Date(startDate.getTime() + koreaOffset);
    const lastDate = new Date(endDate.getTime() + koreaOffset);

    while (currentDate <= lastDate) {
      dates.push(currentDate.toISOString().slice(0, 10));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  useEffect(() => {
    if (startDate != null && endDate != null) {
      console.log('allPlanDates', allPlanDates(startDate, endDate));
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
