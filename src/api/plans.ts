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

export const getPlans = async (planIds: string[]) => {
  if (planIds.length === 0) {
    return;
  }
  const { data: plans, error } = await supabase
    .from('plans')
    .select()
    .in('id', planIds);

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

// users테이블과 plan_mates테이블 연결

export const getMatesByUserIds = async (MatesUserId: string[]) => {
  const { data, error } = await supabase
    .from('users')
    .select()
    .in('id', MatesUserId);
  // console.log('MatesData=>', data);
  if (error != null) {
    console.log('에러발생', MatesUserId);
    throw new Error('getMatesByUserIds 에러발생');
  }
  return data;
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
    throw new Error('getPlansByUserIds 에러발생');
  }

  return data;
};

export const getPlansWithMates = async (userId: string) => {
  const { data: matesData, error: matesError } = await supabase
    .from('plan_mates')
    .select()
    // 배열의 비교는 contains 연산자를 사용
    .contains('users_id', [userId]);

  if (matesError != null) {
    console.log('에러 발생', matesError);
    throw new Error('getPlansWithMates 에러 1발생');
  }
  // flatMap을 사용하면 중복 구조로 되어있는 리스트를 하나의 스트림처럼 다룰 수 있다.
  const userIds = matesData.map((data) => data.users_id);
  const planIds = matesData.map((data) => data.id).flat();

  if (userIds.length === 0) {
    throw new Error('getPlansWithMates 에러 2발생');
  }

  const plansData = await getPlans(planIds);
  const usersDataList = [];
  for (const plan of userIds) {
    const users = await getMatesByUserIds(plan);
    usersDataList.push(users);
  }

  console.log('plansData=>', plansData);
  console.log('userData=>', usersDataList);

  return {
    plansData,
    // 배열로 가져오던걸 객체로 바꾸기위해서
    usersDataList,
  };
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

export const changePlanState = async (data: any) => {
  const [planId, planState] = data;
  const { error } = await supabase
    .from('plans')
    .update({ plan_state: planState })
    .eq('id', planId);
  if (error !== null) {
    console.log(error);
    throw new Error('planState 변경 오류발생');
  }
};
