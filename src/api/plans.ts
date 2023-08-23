import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import { type Json, type PlanType } from 'types/supabase';

import { type PinContentsType } from './pins';
import { supabase } from './supabaseAuth';

export const addPlan = async (
  userId: string,
  title: string,
  totalCost: number,
  pins: PinContentsType[][],
  dates: string[],
) => {
  const planId = uuid();

  const plan: PlanType = {
    id: planId,
    users_id: userId,
    title,
    total_cost: totalCost,
    isDeleted: false,
    dates,
    plan_state: 'planning',
  };
  const { data, error } = await supabase.from('plans').insert(plan);
  const { data: pinsdata, error: errorPins } = await supabase
    .from('pins')
    .insert({
      plan_id: planId,
      contents: pins as Json[],
      date: '2023-08-21',
    });

  if (error != null || errorPins != null) {
    console.log(error);
    console.log(errorPins);
  }

  if (data !== null || pinsdata !== null) {
    return { data, pinsdata };
  }
};

export const getPlans = async () => {
  const { data, error } = await supabase.from('plans').select();
  if (error != null) {
    console.log('에러 발생', error);
  }
  return data;
};
