import { supabase } from './supabaseAuth';

export const findusers = async (input: string) => {
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

  // const res = [];
  // if (nickname != null && email != null) {
  //   res.push(nickname[0]?.nickname);
  //   res.push(email[0]?.email);
  // }

  return { nickname, email };
};
