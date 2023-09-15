import React, { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { signInWithGoogle, signInWithSB } from '@api/supabaseAuth';
import IconGoogle from '@assets/icons/IconGoogle';
import IconHidden from '@assets/icons/IconHidden';
import IconLocked from '@assets/icons/IconLocked';
import IconMessage from '@assets/icons/IconMessage';
import IconVisible from '@assets/icons/IconVisible';
import { signInBG } from '@assets/index';
import useFormValidator from '@hooks/useFormValidator';
import { sideBarStore } from '@store/sideBarStore';
import { AuthError } from '@supabase/supabase-js';

interface UserSignInForm {
  email: string;
  password: string;
  keep: boolean;
}

const SignInForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const setVisibilityIcon = sideBarStore((state) => state.setVisibilityIcon);

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
      toast.error('로그인에 실패하였습니다.');
      return false;
    }

    setVisibilityIcon(true);
    reset();
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
    <main className="flex relative w-screen h-screen">
      <img
        src={signInBG}
        alt="sign-in-background-img"
        className="absolute inset-0 object-cover h-[100vh]"
      />
      <div className="flex items-center justify-center flex-grow">
        <form
          onSubmit={handleSubmit(onSubmitSignInHandler)}
          name="signin-form"
          className="relative flex flex-col   gap-y-2.5 rounded-xl bg-[#F9F9FB]
            md:w-[450px] md:h-[410px] md:px-[50px] md:py-[37px]
            sm:w-[320px] sm:px-[30px] sm:py-[22px]
          "
        >
          <h3 className="border-b-2 w-[48px] text-lg font-semibold	text-blue border-blue">
            로그인
          </h3>
          <div className="relative">
            <label
              htmlFor="signin-email"
              className="absolute top-1/2 -translate-y-1/2 left-[5px] w-[24px] h-[24px] flex-center cursor-pointer"
            >
              <IconMessage w="w-[12px]" h="h-[12px]" />
            </label>
            <input
              type="text"
              id="signin-email"
              {...register('email', emailValidator)}
              className="w-full h-[42px] px-8 rounded"
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="signin-password"
              className="absolute top-1/2 -translate-y-1/2 left-[5px] w-[24px] h-[24px] flex-center cursor-pointer"
            >
              <IconLocked w="w-[12px]" h="h-[12px]" />
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="signin-password"
              {...register('password')}
              className="w-full h-[42px] px-8 rounded"
              placeholder="비밀번호를 입력하세요"
            />
            <button
              type="button"
              aria-label="signin-toggle-show-password-btn"
              onClick={onClickShowPassword}
              className="absolute top-1/2 -translate-y-1/2 flex-center right-[10px] w-[24px] h-[24px]"
            >
              {showPassword ? (
                <IconVisible w="w-[14px]" h="h-[14px]" />
              ) : (
                <IconHidden w="w-[14px]" h="h-[14px]" />
              )}
            </button>
          </div>
          <div className="flex justify-between">
            <label className="text-sm text-slate-400 cursor-pointer flex items-center">
              <input
                type="checkbox"
                name="keep-login"
                className="mr-2"
                defaultChecked
              />
              로그인 상태 유지
            </label>
            <span className="text-sm underline cursor-pointer text-orange font-semibold">
              비밀번호를 잊으셨나요?
            </span>
          </div>
          <button
            type="submit"
            name="signin-submit-btn"
            disabled={isSubmitting || !isValid}
            className="bg-blue text-white h-[45px] rounded-lg hover:bg-blue_dark disabled:bg-gray_light_3"
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
            name="signin-with-google-btn"
            onClick={signInWithGoogle}
            className="h-[45px] border rounded-lg border-gray_light_3 hover:bg-gray_dark_1 hover:text-white"
          >
            <div className="flex justify-center items-center ">
              <IconGoogle w="w-[18px]" h="h-[18px]" />

              <span className="ml-1">구글 계정으로 로그인 하기</span>
            </div>
          </button>
          <p
            className="absolute left-1/2 -translate-x-1/2 w-[190px] text-sm p-2 rounded-lg font-semibold text-gray_dark_1
            md:bottom-[-50px] md:bg-white/20
            sm:bottom-[-60px] sm:bg-white/50
          "
          >
            처음이신가요?
            <span
              onClick={goToSignUp}
              className="ml-2 underline text-black cursor-pointer "
            >
              지금 등록하세요!
            </span>
          </p>
        </form>
      </div>
    </main>
  );
};

export default SignInForm;
