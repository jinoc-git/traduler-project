import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
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

export const uploadProfileImg = async (avatarFile: File, email: string) => {
  const { data, error: storageError } = await supabase.storage
    .from('profile_img')
    .upload(`${email}/${uuid()}`, avatarFile, {
      cacheControl: '3600',
      upsert: false,
    });

  const isStorageError = Boolean(storageError);
  if (isStorageError) {
    return storageError;
  }
  if (data !== null) {
    return data.path;
  }
};

export const updateUserProfileImage = async (path: string, userId: string) => {
  const URL = `${process.env.REACT_APP_SB_STORAGE_URL as string}/${path}`;
  const { data } = await supabase.auth.updateUser({
    data: { profileImg: URL },
  });

  const { error } = await supabase
    .from('users')
    .update({ avatar_url: URL })
    .eq('id', userId)
    .select();

  const isUserTableError = Boolean(error);
  if (isUserTableError) {
    console.log(error);
    return null;
  }

  const isSuccess = Boolean(data);
  if (isSuccess) {
    return data.user;
  }
};
