import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { signUpWithSB } from '@api/supabaseAuth';
import useSignUpFormValidator from '@hooks/useSignUpFormValidator';
import { AuthError } from '@supabase/supabase-js';

interface UserSignUpForm {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<UserSignUpForm>({ mode: 'onChange' });

  const { nicknameValidator, emailValidator, passwordValidator } =
    useSignUpFormValidator();

  const onSubmitSignUpHandler: SubmitHandler<UserSignUpForm> = async (data) => {
    const { email, password, nickname } = data;
    const res = await signUpWithSB(email, password, nickname);

    if (res instanceof AuthError || res instanceof Error) {
      console.log('회원가입 에러');
      return false;
    }
    reset()
    console.log('성공');
  };

  return (
    <form onSubmit={handleSubmit(onSubmitSignUpHandler)}>
      <label htmlFor="nickname">닉네임</label>
      <input
        type="text"
        id="nickname"
        {...register('nickname', nicknameValidator)}
        className="border"
      />
      {errors.nickname !== null && <p>{errors?.nickname?.message}</p>}

      <label htmlFor="email">이메일</label>
      <input
        type="text"
        id="email"
        {...register('email', emailValidator)}
        className="border"
      />
      {errors.email !== null && <p>{errors?.email?.message}</p>}

      <label htmlFor="password">비밀번호</label>
      <input
        type="text"
        id="password"
        {...register('password', passwordValidator)}
        className="border"
      />
      {errors.password !== null && <p>{errors?.password?.message}</p>}

      <label htmlFor="confirmPassword">비밀번호 확인</label>
      <input
        type="text"
        id="confirmPassword"
        {...register('confirmPassword', {
          required: true,
          validate: (v, fv) => fv.password === v,
        })}
        className="border"
      />
      {errors.confirmPassword !== undefined && <p>비밀번호를 확인해 주세요</p>}

      <button disabled={isSubmitting || !isValid} className="border rounded">
        회원가입
      </button>
    </form>
  );
};

export default SignUpForm;
