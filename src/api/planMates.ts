import { type UserType } from 'types/supabase';

import { supabase } from './supabaseAuth';

export const findUsers = async (input: string) => {
  const { data: nickname, error } = await supabase
    .from('users')
    .select()
    .like('nickname', `%${input}%`);
  const { data: email, error: emailerror } = await supabase
    .from('users')
    .select()
    .like('email', `%${input}%`);

  if (error != null || emailerror != null) {
    console.log('에러발생');
  }

  return { nickname, email };
};

export const getMates = async (planId: string) => {
  const { data: matesId, error } = await supabase
    .from('plan_mates')
    .select('users_id')
    .eq('id', planId);
  if (error != null) {
    console.log(error);
  }

  const matesInfo: UserType[] = [];
  if (matesId != null) {
    const matesIdArr = matesId?.[0].users_id;
    for (let i = 0; i < matesIdArr.length; i++) {
      const { data, error } = await supabase
        .from('users')
        .select()
        .eq('id', matesIdArr[i]);
      if (error != null) {
        console.log(`${i}번째 오류 발생`, error);
      }
      if (data != null) {
        matesInfo.push(data[0]);
      }
    }
  }
  return matesInfo;
};

export const updateMates = async (newMates: string[], planId: string) => {
  const { data, error } = await supabase
    .from('plan_mates')
    .update({ users_id: newMates })
    .eq('id', planId)
    .select();

  if (error != null) {
    console.log('친구 초대 오류 발생', error);
  }
  console.log('planMates update api', data);
};
