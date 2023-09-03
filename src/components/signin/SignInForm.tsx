import React, { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { signInWithGoogle, signInWithSB } from '@api/supabaseAuth';
import {
  ic_google_1x,
  ic_locked_default_1x,
  ic_message_default_1x,
  ic_visible_default_1x,
  ic_visible_solid_1x,
} from '@assets/icons/1x';
import useFormValidator from '@hooks/useFormValidator';
import { AuthError } from '@supabase/supabase-js';

interface UserSignInForm {
  email: string;
  password: string;
  keep: boolean;
}

const SignInForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm<UserSignInForm>();

  const { emailValidator } = useFormValidator();

  const onSubmitSignInHandler: SubmitHandler<UserSignInForm> = async (data) => {
    const { email, password } = data;
    const res = await signInWithSB(email, password);
    if (res instanceof AuthError) {
      // console.log('로그인 오류');
      toast.error('로그인에 실패하였습니다.');
      return false;
    }

    reset();
    // console.log('로그인 성공');
    toast.success('로그인에 성공하였습니다.');
    navigate('/main');
  };

  const goToSignUp = () => {
    navigate('/signup');
  };

  const onClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <main className="flex-center w-screen h-screen">
      <form
        onSubmit={handleSubmit(onSubmitSignInHandler)}
        className="relative flex flex-col w-[450px] h-[410px] px-[50px] py-[37px] border gap-y-2.5 rounded-xl"
      >
        <h2 className="border-black border-b-2 w-[54px] text-lg font-semibold	">
          로그인
        </h2>
        <div className="relative">
          <label htmlFor="signin-email">
            <img
              src={ic_message_default_1x}
              alt="이메일 아이콘"
              className="absolute top-1/2 -translate-y-1/2 left-[10px] w-[12px] h-[12px] cursor-pointer"
            />
          </label>
          <input
            type="text"
            id="signin-email"
            {...register('email', emailValidator)}
            className="border w-full h-[42px] px-8 rounded"
            placeholder="이메일을 입력하세요"
          />
        </div>
        <div className="relative">
          <label htmlFor="signin-password">
            <img
              src={ic_locked_default_1x}
              alt="비밀번호 아이콘"
              className="absolute top-1/2 -translate-y-1/2 left-[10px] w-[12px] h-[12px] cursor-pointer"
            />
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="signin-password"
            {...register('password')}
            className="border w-full h-[42px] px-8 rounded"
            placeholder="비밀번호를 입력하세요"
          />
          <img
            src={showPassword ? ic_visible_solid_1x : ic_visible_default_1x}
            alt="비밀번호 보기 아이콘"
            onClick={onClickShowPassword}
            className="absolute top-1/2 -translate-y-1/2 right-[10px] w-[14px] h-[14px] cursor-pointer"
          />
        </div>
        <div className="flex justify-between">
          <label className="text-sm text-slate-400 cursor-pointer">
            <input type="checkbox" name="keep" className="mr-2" />
            로그인 상태 유지
          </label>
          <span className="text-sm underline text-slate-400 cursor-pointer">
            비밀번호를 잊으셨나요?
          </span>
        </div>
        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="bg-black text-white h-[45px] rounded-lg"
        >
          로그인
        </button>
        <div className="flex justify-between items-center my-2">
          <span className="block w-5/12 h-px bg-slate-400" />
          <span className="text-slate-400">또는</span>
          <span className="block w-5/12 h-px bg-slate-400" />
        </div>
        <button
          type="button"
          onClick={signInWithGoogle}
          className="h-[45px] border rounded-lg"
        >
          <div className="flex justify-center items-center">
            <img
              src={ic_google_1x}
              alt="구글"
              className="w-[18px] h-[18px] mr-1"
            />
            <span>구글 계정으로 로그인 하기</span>
          </div>
        </button>
        <p className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 text-sm ">
          처음이신가요?
          <span
            onClick={goToSignUp}
            className="ml-2 font-semibold underline cursor-pointer"
          >
            지금 등록하세요!
          </span>
        </p>
      </form>
    </main>
  );
};

export default SignInForm;
