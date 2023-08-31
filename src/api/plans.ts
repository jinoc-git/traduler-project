/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import {
  type PlanMatesType,
  type Json,
  type PlanType,
  type UserType,
} from 'types/supabase';

import { type PinContentsType } from './pins';
import { supabase } from './supabaseAuth';

export const addPlan = async (
  userId: string,
  title: string,
  totalCost: number,
  pins: PinContentsType[][],
  dates: string[],
  invitedUser: UserType[],
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

  // plan data 추가
  const { data, error } = await supabase.from('plans').insert(plan);

  // 날짜별 pins data 추가
  for (let i = 0; i < dates.length; i++) {
    const { error: errorPins } = await supabase.from('pins').insert({
      plan_id: planId,
      contents: pins[i] as Json[],
      date: dates[i],
    });
    if (errorPins != null) {
      console.log(`오류발생 ${i}번째 pin`, errorPins);
    }
  }

  // plan_mates data 추가
  const newplanMates: PlanMatesType = {
    id: planId,
    users_id: invitedUser.map((user) => user.id),
  };
  const { error: planMatesError } = await supabase
    .from('plan_mates')
    .insert(newplanMates);

  if (error != null || planMatesError != null) {
    console.log(error);
    console.log(planMatesError);
  }
  if (data !== null) {
    return { data };
  }
};

export const getPlan = async (planId: string) => {
  if (planId !== undefined) {
    const { data, error } = await supabase
      .from('plans')
      .select()
      .eq('id', planId);
    if (error != null) {
      console.log('에러 발생', error);
    }
    return data;
  }
};

interface Book_mark {
  plan_id: string;
  user_id: string;
}

export interface GetPlans extends PlanType {
  book_mark: Book_mark[];
}

export const getPlans = async (userId: string | undefined) => {
  if (userId === undefined) {
    return;
  }
  const { data: plans, error } = await supabase
    .from('plans')
    .select(`*, book_mark(* )`)
    .match({
      'book_mark.user_id': userId,
    });

  if (error !== null) {
    console.log(error);
    throw new Error('오류발생');
  }
  if (plans !== null) {
    return plans;
  }
};

export const getTotalCost = async (userId: string): Promise<number | null> => {
  const { data, error } = await supabase
    .from('plans')
    .select('total_cost')
    .eq('users_id', userId);

  if (error !== null) {
    console.log(error);
    throw new Error('오류발생');
  }
  if (data !== null && data.length > 0) {
    const totalCost = data[0].total_cost;
    console.log('api통신', data);
    return totalCost;
  }

  return null;
};

export const updateDatePlan = async (planId: string, dates: string[]) => {
  const { error } = await supabase
    .from('plans')
    .update({ dates })
    .eq('id', planId);

  if (error !== null) {
    console.log(error);
  }
};

// 여기부터
export const getPlansByUserIds = async (userIds: string[]) => {
  // 중복된 아이디값이들어와서 분류
  const { data, error } = await supabase
    .from('plans')
    .select()
    // .in는 특정 열의 값이 지정된 배열의 값과 일치하는 행을 필터링
    .in('users_id', userIds);

  if (error != null) {
    console.log('에러 발생', error);
    return null;
  }

  return data;
};

export const getPlansWithMates = async (userId: string) => {
  const { data: matesData, error: matesError } = await supabase
    .from('plan_mates')
    .select('users_id')
    // 배열의 비교는 contains 연산자를 사용
    .contains('users_id', [userId]);

  if (matesError != null) {
    console.log('에러 발생', matesError);
    return null;
  }
  // flatMap을 사용하면 중복 구조로 되어있는 리스트를 하나의 스트림처럼 다룰 수 있다.
  const userIds = matesData?.flatMap((mate) => mate.users_id);

  if (!userIds?.length) {
    return null;
  }

  const plansData = await getPlansByUserIds(userIds);

  return plansData;
};

// 여기까지
export const addBookMark = async (
  newBookMarkId: string,
  planId: string,
  userId: string,
) => {
  const { error } = await supabase.from('book_mark').insert({
    id: newBookMarkId,
    plan_id: planId,
    user_id: userId,
  });
  if (error !== null) {
    console.log(error);
    throw new Error('오류발생');
  }
};

export const deleteBookMark = async (id: string, planId: string) => {
  const { error } = await supabase.from('book_mark').delete().eq('id', planId);
  if (error !== null) {
    console.log(error);
    throw new Error('오류발생');
  }
};

export const updatePlan = async (
  planId: string,
  newTitle: string,
  newCost: number,
) => {
  const { error } = await supabase
    .from('plans')
    .update({ title: newTitle, total_cost: newCost })
    .eq('id', planId);
  if (error !== null) {
    console.log(error);
    throw new Error('오류발생');
  }
};
