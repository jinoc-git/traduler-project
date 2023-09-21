/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unmodified-loop-condition */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getAllPinsDate, newDatePin } from '@api/pins';
import { updateDatePlan } from '@api/plans';
import Calendar from '@components/addPlan/calendar/Calendar';
import { datesStore } from '@store/datesStore';
import { modifyStateStore } from '@store/modifyStateStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type PinInsertType } from 'types/supabase';

export interface PlanFormData {
  date: string | null;
}

interface PropsType {
  state?: string;
  dataPlanDates?: string[];
}

const PostPlan = ({ state, dataPlanDates }: PropsType) => {
  const { id } = useParams();

  const { setDates } = datesStore();
  const setRequiredDates = modifyStateStore((state) => state.setRequiredDates);

  let dataPinDates: string[] = [];
  const planId: string = id as string;

  if (state !== 'addPlan' && planId !== undefined) {
    const { data } = useQuery(
      ['pinDate', planId],
      async () => await getAllPinsDate(planId),
    );
    dataPinDates = data as string[];
  }

  const planStartDate = new Date(dataPlanDates?.[0] as string);
  const planEndDate = new Date(
    dataPlanDates?.[dataPlanDates.length - 1] as string,
  );
  const [startDate, setStartDate] = useState<Date | null>(
    state === 'addPlan' ? null : planStartDate,
  );
  const [endDate, setEndDate] = useState<Date | null>(
    state === 'addPlan' ? null : planEndDate,
  );

  const StartDateChangeHandler = (date: Date | null) => {
    setRequiredDates('start');
    setStartDate(date);
  };
  const EndDateChangeHandler = (date: Date | null) => {
    setRequiredDates('end');
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
      void queryClient.invalidateQueries({ queryKey: ['pinDate', planId] });
      void queryClient.invalidateQueries({ queryKey: ['plan', planId] });
    },
  });

  useEffect(() => {
    if (
      startDate != null &&
      endDate != null &&
      dataPinDates !== null &&
      dataPinDates !== undefined
    ) {
      const dates = allPlanDates(startDate, endDate);
      const newDates = dates?.filter((date) => !dataPinDates?.includes(date));
      if (newDates.length !== 0 && state !== 'addPlan') {
        newDates.forEach(async (date) => {
          const newPin: PinInsertType = {
            plan_id: planId,
            contents: [],
            date,
          };
          await newDatePin(newPin);
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
