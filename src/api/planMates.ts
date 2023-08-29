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
  const { data, error } = await supabase
    .from('plan_mates')
    .select('users_id')
    .eq('id', planId);
  if (error != null) {
    console.log(error);
  }
  console.log('api', data);
  return data;
};
