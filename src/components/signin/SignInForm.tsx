import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { signInWithSB } from '@api/supabaseAuth';
import { AuthError } from '@supabase/supabase-js';

interface UserSignInForm {
  email: string;
  password: string;
}

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm<UserSignInForm>();

  const onSubmitSignInHandler: SubmitHandler<UserSignInForm> = async (data) => {
    const { email, password } = data;
    const res = await signInWithSB(email, password);
    if (res instanceof AuthError) {
      console.log('로그인 오류');
      return false;
    }

    reset();
    console.log('로그인 성공');
  };

  return (
    <form onSubmit={handleSubmit(onSubmitSignInHandler)}>
      <label htmlFor="signin-email">이메일</label>
      <input
        type="text"
        id="signin-email"
        {...register('email', {
          minLength: 4,
        })}
        className="border"
      />
      <label htmlFor="signin-password">비밀번호</label>
      <input
        type="text"
        id="signin-password"
        {...register('password')}
        className="border"
      />
      <button disabled={isSubmitting || !isValid}>로그인</button>
    </form>
  );
};

export default SignInForm;
