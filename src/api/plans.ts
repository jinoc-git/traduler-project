import {
  type PlanMatesType,
  type Json,
  type PlanType,
  type UserType,
} from 'types/supabase';

import { type PinContentsType } from './pins';
import { supabase } from './supabaseAuth';

interface addPlanObj {
  newPlan: PlanType;
  pins: PinContentsType[][];
  invitedUser: UserType[];
}

export const addPlan = async (addPlanObj: addPlanObj) => {
  const { newPlan, pins, invitedUser } = addPlanObj;

  const plan: PlanType = { ...newPlan };

  const { data, error } = await supabase.from('plans').insert(plan);

  for (let i = 0; i < newPlan.dates.length; i++) {
    const { error: errorPins } = await supabase.from('pins').insert({
      plan_id: newPlan.id,
      contents: pins[i] as Json[],
      date: newPlan.dates[i],
    });
    if (errorPins != null) {
      console.log(`오류발생 ${i}번째 pin`, errorPins);
    }
  }

  const newplanMates: PlanMatesType = {
    id: newPlan.id,
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
      throw new Error('계획 불러오던 중 오류가 발생했습니다.');
    }
    return data;
  }
};

export const deletePlan = async (planId: string) => {
  const { error } = await supabase
    .from('plans')
    .update({ isDeleted: true })
    .eq('id', planId);

  if (error != null) {
    throw new Error('계획 삭제 중 오류가 발생했습니다.');
  }
};

export const getPlanList = async (planIds: string[]) => {
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

export const getMatesByUserIds = async (matesUserId: string[]) => {
  const { data, error } = await supabase
    .from('users')
    .select()
    .in('id', matesUserId);

  if (error != null) {
    console.log('에러발생', matesUserId);
    throw new Error('getMatesByUserIds 에러발생');
  }
  return data;
};

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

export const getPlanIdAndUserIdListByLoginUserId = async (
  userId: string | undefined,
) => {
  if (userId === undefined) return;

  const { data: userPlanAndMateList, error: userPlanAndMateListError } =
    await supabase.from('plan_mates').select().contains('users_id', [userId]);

  if (userPlanAndMateListError !== null) {
    throw new Error('getPlanIdAndUserIdListByLoginUserId 오류');
  }

  if (userPlanAndMateList !== null) {
    return userPlanAndMateList;
  }
};

export const getPlanListAndMateList = async (userId: string | undefined) => {
  if (userId === undefined) return;

  const { data: matesData, error: matesError } = await supabase
    .from('plan_mates')
    .select()
    .contains('users_id', [userId]);

  if (matesError != null) {
    console.log('에러 발생', matesError);
    throw new Error('getPlansWithMates 에러 1발생');
  }

  const planIdList = matesData.map((data) => data.id).flat();
  const userIdList = matesData.map((data) => data.users_id);

  if (userIdList.length === 0) {
    return {
      planDataList: [],
      usersDataList: [],
    };
  }

  const planDataList = await getPlanList(planIdList);
  const usersDataList = [];
  for (let i = 0; i < userIdList.length; i++) {
    const users = await getMatesByUserIds(userIdList[i]);

    const userList = { [planIdList[i]]: users };
    usersDataList.push(userList);
  }

  return {
    planDataList,
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
