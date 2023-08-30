/* eslint-disable no-unmodified-loop-condition */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { newDatePin } from '@api/pins';
import { getPlan, updateDatePlan } from '@api/plans';
import Calendar from '@components/plan/Calendar';
import { datesStore } from '@store/datesStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type PinInsertType } from 'types/supabase';

export interface PlanFormData {
  date: string | null;
}

interface PropsType {
  state?: string;
}

const PostPlan: React.FC<PropsType> = ({ state }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { setDates } = datesStore();
  let dataDates: string[] = [];
  const { id } = useParams();
  const planId: string = id as string;
  if (state !== 'addPlan') {
    const { data: plan } = useQuery(
      ['plan', planId],
      async () => await getPlan(planId),
    );
    dataDates = plan?.[0].dates as string[];
  }

  useEffect(() => {
    if (state !== 'addPlan' && dataDates != null) {
      setStartDate(new Date(dataDates[0]));
      setEndDate(new Date(dataDates[dataDates.length - 1]));
    }
  }, [dataDates]);

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
    setDates(dates);
    return dates;
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ([planId, dates]: [string, string[]]) => {
      await updateDatePlan(planId, dates);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['plan'] });
    },
  });

  useEffect(() => {
    if (startDate != null && endDate != null) {
      const dates = allPlanDates(startDate, endDate);
      const newDates = dates?.filter((date) => !dataDates?.includes(date));
      if (newDates.length !== 0 && state !== 'addPlan') {
        newDates.forEach((date) => {
          const newPin: PinInsertType = {
            plan_id: planId,
            contents: [],
            date,
          };
          void newDatePin(newPin);
        });
      }
      if (state !== 'addPlan') {
        mutation.mutate([planId, dates]);
      }
    }
  }, [startDate, endDate]);

  return (
    <>
      <Calendar
        startDate={startDate}
        endDate={endDate}
        StartDateChangeHandler={StartDateChangeHandler}
        EndDateChangeHandler={EndDateChangeHandler}
      />
    </>
  );
};

export default PostPlan;
