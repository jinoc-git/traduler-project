import { type UserType } from 'types/supabase';

import { supabase } from './supabaseAuth';

// 친구 검색
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

// 초대한 목록 가져오기
export const getMates = async (planId: string) => {
  const { data: matesId, error } = await supabase
    .from('plan_mates')
    .select('users_id')
    .eq('id', planId);
  if (error != null) {
    console.log(error);
  }

  // data에는 userId 배열
  // user에 대한 정보는 users table에서 가져와야함
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

// 친구 초대
export const updateMates = async (newMates: string[], planId: string) => {
  const { data, error } = await supabase
    .from('plan_mates')
    .update({ users_id: newMates })
    .eq('id', planId)
    .select();

  if (error != null) {
    console.log('친구 초대 오류 발생', error);
  }
  console.log('들어온 새 data', newMates);
  console.log('planMates update api', data);
};
