import { createClient } from '@supabase/supabase-js';
import { type Database } from 'types/supabase';

const supabase = createClient<Database>(
  'https://rkdykaeilrlrtrowawoe.supabase.co',
  process.env.REACT_APP_SB_API_KEY as string,
);

export { supabase };

export const signUpWithSB = async (
  email: string,
  password: string,
  nickname: string,
) => {
  const { data, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nickname,
      },
    },
  });

  const isAuthError = Boolean(authError);
  if (isAuthError) {
    return authError;
  }

  const id = data.user?.id;
  const { error: usersError } = await supabase.from('users').insert({
    id: id as string,
    email,
    password,
    nickname,
  });

  const isUsersError = Boolean(usersError);
  if (isUsersError) {
    return usersError;
  }
};

export const signInWithSB = async (email: string, password: string) => {
  const { error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  const isAuthError = Boolean(authError);
  if (isAuthError) {
    return authError;
  }
};

export const signOutForSB = async () => {
    await supabase.auth.signOut();
};
