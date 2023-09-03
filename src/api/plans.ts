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

  const { data, error } = await supabase.from('plans').insert(plan);

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

// 삭제함수
export const deletePlan = async (planId: string) => {
  console.log('planId=>', planId);
  try {
    const { error } = await supabase
      .from('plans')
      .update({ isDeleted: true })
      .eq('id', planId);

    if (error != null) {
      console.error('계획 삭제 오류', error);
      throw new Error('계획 삭제 중 오류가 발생했습니다.');
    }

    // if (data === null || data.length === 0) {
    //   throw new Error('해당 계획을 찾을 수 없습니다.');
    // }
  } catch (error) {
    console.error('계획 삭제 오류', error);
    throw error;
  }
};

export const getPlans = async (planIds: string[]) => {
  if (planIds.length === 0) {
    return;
  }
  const { data: plans, error } = await supabase
    .from('plans')
    .select()
    .eq('isDeleted', false)
    .in('id', planIds);

  if (error !== null) {
    console.log(error);
    throw new Error('오류발생');
  }
  if (plans !== null) {
    return plans;
  }
};

export const getTotalCost = async (planId: string): Promise<number | null> => {
  const { data, error } = await supabase
    .from('plans')
    .select('total_cost')
    .eq('id', planId);

  if (error !== null) {
    console.log(error);
    throw new Error('오류발생');
  }
  if (data !== null && data.length > 0) {
    const totalCost = data[0].total_cost;
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

// book_mark와 plans 테이블을 조인하여 plans 데이터를 가져오는 함수
export const getPlansWithBookmarks = async (userId: string) => {
  const { data: bookMarkData, error: bookMarkError } = await supabase
    .from('book_mark')
    .select('plan_id')
    .eq('user_id', userId);

  if (bookMarkError !== null) {
    console.error('book_mark 데이터 불러오기 오류', bookMarkError);
    throw new Error('book_mark 데이터 불러오기 오류');
  }

  if (bookMarkData === null || bookMarkData.length === 0) {
    // book_mark 데이터가 없을 경우
    return [];
  }

  const planIds = bookMarkData.map((item) => item.plan_id);

  const { data: bookMarkPlanData, error: plansError } = await supabase
    .from('plans')
    .select()
    .eq('isDeleted', false)
    .in('id', planIds);

  if (plansError !== null) {
    console.error('plans 데이터 불러오기 오류', plansError);
    throw new Error('plans 데이터 불러오기 오류');
  }

  return bookMarkPlanData;
};

// users테이블과 plan_mates테이블 연결

export const getMatesByUserIds = async (matesUserId: string[]) => {
  const { data, error } = await supabase
    .from('users')
    .select()
    .in('id', matesUserId);
  // console.log('MatesData=>', data);
  if (error != null) {
    console.log('에러발생', matesUserId);
    throw new Error('getMatesByUserIds 에러발생');
  }
  return data;
};

// 여기부터
export const getPlansByUserIds = async (userIds: string[]) => {
  const { data, error } = await supabase
    .from('plans')
    .select()
    .eq('isDeleted', false)
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

  // if (userIds.length === 0) {
  //   throw new Error('getPlansWithMates 에러 2발생');
  // }
  // 윗부분떄문에 오류가나서 수정함
  if (userIds.length === 0) {
    return {
      plansData: [],
      usersDataList: [],
    };
  }

  const plansData = await getPlans(planIds);
  const usersDataList = [];
  for (let i = 0; i < userIds.length; i++) {
    const users = await getMatesByUserIds(userIds[i]);

    const userList = { [planIds[i]]: users };
    usersDataList.push(userList);
  }

  return {
    plansData,
    // 배열로 가져오던걸 객체로 바꾸기위해서
    usersDataList,
  };
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

export const getPlanEnding = async (planId: string) => {
  const { data, error } = await supabase
    .from('plans_ending')
    .select()
    .eq('id', planId);
  if (error !== null) {
    console.log(error);
    throw new Error('plans_ending 불러오기 오류발생');
  }
  return data;
};

export const getPlansDate = async (planId: string) => {
  const { data, error } = await supabase
    .from('plans')
    .select('dates')
    .eq('id', planId);

  if (error !== null) {
    console.log(error);
    throw new Error('plans_ending 불러오기 오류발생');
  }
  
  return data;
};
