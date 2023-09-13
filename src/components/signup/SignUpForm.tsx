/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  checkUserEmail,
  checkUserNickname,
  signInWithGoogle,
  signUpWithSB,
} from '@api/supabaseAuth';
import { ic_google_1x } from '@assets/icons/1x';
import IconHidden from '@assets/icons/IconHidden';
import IconLocked from '@assets/icons/IconLocked';
import IconMessage from '@assets/icons/IconMessage';
import IconName from '@assets/icons/IconName';
import IconVisible from '@assets/icons/IconVisible';
import { signUpBG } from '@assets/index';
import useBooleanState from '@hooks/useBooleanState';
import useFormValidator from '@hooks/useFormValidator';
import { AuthError } from '@supabase/supabase-js';

interface UserSignUpForm {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm = () => {
  const navigate = useNavigate();
  const { value: showPassword, toggleValue: onClickShowPassword } =
    useBooleanState(false);
  const { value: showCheckPassword, toggleValue: onClickShowCheckPassword } =
    useBooleanState(false);
  const { value: isNicknameDuplicate, setNeedValue: setIsNicknameDuplicate } =
    useBooleanState(true);
  const { value: isEmailDuplicate, setNeedValue: setIsEmailDuplicate } =
    useBooleanState(true);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<UserSignUpForm>({ mode: 'onChange' });

  const nicknameValue = watch('nickname');
  const emailValue = watch('email');

  const { nicknameValidator, emailValidator, passwordValidator } =
    useFormValidator();

  const onSubmitSignUpHandler: SubmitHandler<UserSignUpForm> = async (data) => {
    const { email, password, nickname } = data;
    const res = await signUpWithSB(email, password, nickname);

    if (res instanceof AuthError || res instanceof Error) {
      toast.error('회원가입에 실패하였습니다.');
      return false;
    }
    reset();

    toast.success('회원가입에 성공하였습니다');
    navigate('/main');
  };

  const checkNicknameDuplication = async () => {
    if (!nicknameValue) {
      toast.warning('닉네임을 확인해주세요.');
      return;
    }

    const res = await checkUserNickname(nicknameValue);

    if (res) {
      setIsNicknameDuplicate(!res);
      toast.success('사용 가능한 닉네임입니다.');
    } else {
      toast.warning('닉네임이 중복 되었습니다.');
    }
  };

  const checkEmailDuplication = async () => {
    if (!emailValue) {
      toast.warning('이메일을 확인해주세요.');
      return;
    }

    const res = await checkUserEmail(emailValue);
    if (res) {
      setIsEmailDuplicate(!res);
      toast.success('사용 가능한 이메일입니다.');
    } else {
      toast.warning('이메일이 중복 되었습니다.');
    }
  };

  const goToSignIn = () => {
    navigate('/signin');
  };

  useEffect(() => {
    setIsNicknameDuplicate(true);
  }, [nicknameValue]);

  useEffect(() => {
    setIsEmailDuplicate(true);
  }, [emailValue]);

  return (
    <main className="flex-center w-screen h-screen">
      <img
        src={signUpBG}
        alt="back-ground-img"
        className="absolute inset-0 object-cover h-[100vh]"
      />
      <form
        onSubmit={handleSubmit(onSubmitSignUpHandler)}
        className="relative flex flex-col   rounded-xl bg-[#F9F9FB]
          md:w-[450px] md:h-[540px] md:px-[50px] md:py-[37px] md:gap-y-2.5
          sm:w-[320px] sm:px-[30px] sm:py-[22px] sm:gap-y-2
        "
      >
        <h2 className="text-blue border-blue border-b-2 w-[64px] text-lg font-semibold	">
          회원가입
        </h2>
        <div className="relative">
          <label
            htmlFor="nickname"
            className="absolute top-[21px] -translate-y-1/2 left-[5px] w-[24px] h-[24px] flex-center cursor-pointer"
          >
            <IconName w="w-[12px]" h="h-[12px]" />
          </label>
          <input
            type="text"
            id="nickname"
            {...register('nickname', nicknameValidator)}
            placeholder="닉네임을 입력하세요"
            className="w-full h-[42px] px-8 rounded"
          />
          <button
            type="button"
            onClick={checkNicknameDuplication}
            disabled={
              Boolean(errors?.nickname?.message) ||
              Boolean(nicknameValue?.length < 2) ||
              nicknameValue === undefined
            }
            className="absolute top-[4px] right-[4px] w-[68px] h-[34px] p-1 text-sm border text-[#6E6F76] bg-white  hover:font-semibold disabled:bg-gray_light_3 disabled:text-white rounded"
          >
            중복확인
          </button>
          <p className="h-[20px] pt-1.5 text-center text-sm text-red-400">
            {errors?.nickname?.message}
          </p>
        </div>
        <div className="relative">
          <label
            htmlFor="email"
            className="absolute top-[21px] -translate-y-1/2 left-[5px] w-[24px] h-[24px] flex-center cursor-pointer"
          >
            <IconMessage w="w-[12px]" h="h-[12px]" />
          </label>
          <input
            type="text"
            id="email"
            {...register('email', emailValidator)}
            placeholder="이메일을 입력하세요"
            className="w-full h-[42px] px-8 rounded"
          />
          <button
            type="button"
            onClick={checkEmailDuplication}
            disabled={
              Boolean(errors?.email?.message) ||
              emailValue === undefined ||
              emailValue === ''
            }
            className="absolute top-[4px] right-[4px] w-[68px] h-[34px] p-1 text-sm border text-[#6E6F76] bg-white  hover:font-semibold disabled:bg-gray_light_3 disabled:text-white rounded"
          >
            중복확인
          </button>
          <p className="h-[20px] pt-1.5 text-center text-sm text-red-400">
            {/* {showNicknameWarning} */}
            {errors?.email?.message}
          </p>
        </div>
        <div className="relative">
          <label
            htmlFor="password"
            className="absolute top-[21px] -translate-y-1/2 left-[5px] w-[24px] h-[24px] flex-center cursor-pointer"
          >
            <IconLocked w="w-[12px]" h="h-[12px]" />
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            {...register('password', passwordValidator)}
            placeholder="최소 6자리를 입력하세요"
            className="w-full h-[42px] px-8 rounded"
          />
          <button
            onClick={onClickShowPassword}
            className="absolute top-[20px] -translate-y-1/2 flex-center right-[10px] w-[24px] h-[24px]"
          >
            {showPassword ? (
              <IconVisible w="w-[14px]" h="h-[14px]" />
            ) : (
              <IconHidden w="w-[14px]" h="h-[14px]" />
            )}
          </button>
          <p className="h-[20px] pt-1.5 text-center text-sm text-red-400">
            {errors?.password?.message}
          </p>
        </div>
        <div className="relative">
          <label
            htmlFor="confirmPassword"
            className="absolute top-[21px] -translate-y-1/2 left-[5px] w-[24px] h-[24px] flex-center cursor-pointer"
          >
            <IconLocked w="w-[12px]" h="h-[12px]" />
          </label>
          <input
            type={showCheckPassword ? 'text' : 'password'}
            id="confirmPassword"
            {...register('confirmPassword', {
              required: true,
              validate: (v, fv) => fv.password === v,
            })}
            placeholder="비밀번호를 다시 입력하세요"
            className="w-full h-[42px] px-8 rounded"
          />
          <button
            onClick={onClickShowCheckPassword}
            className="absolute top-[20px] -translate-y-1/2 flex-center right-[10px] w-[24px] h-[24px]"
          >
            {showCheckPassword ? (
              <IconVisible w="w-[14px]" h="h-[14px]" />
            ) : (
              <IconHidden w="w-[14px]" h="h-[14px]" />
            )}
          </button>
          <p className="h-[20px] pt-1.5 text-center text-sm text-red-400">
            {errors.confirmPassword !== undefined && '비밀번호를 확인해 주세요'}
          </p>
        </div>
        <button
          disabled={
            isSubmitting || !isValid || isNicknameDuplicate || isEmailDuplicate
          }
          className="h-[45px] rounded-lg text-white bg-blue hover:bg-blue_dark disabled:bg-gray_light_3"
        >
          회원가입
        </button>
        <div className="flex justify-between items-center my-2">
          <span className="block w-5/12 h-px bg-slate-400" />
          <span className="text-slate-400">또는</span>
          <span className="block w-5/12 h-px bg-slate-400" />
        </div>
        <button
          type="button"
          onClick={signInWithGoogle}
          className="h-[45px] border rounded-lg border-gray_light_3 hover:bg-gray_dark_1 hover:text-white"
        >
          <div className="flex-center">
            <img
              src={ic_google_1x}
              alt="구글"
              className="w-[18px] h-[18px] mr-1"
            />
            <span>구글 계정으로 로그인 하기</span>
          </div>
        </button>
        <p
          className="absolute left-1/2 -translate-x-1/2 w-[235px] text-sm p-2 rounded-lg font-semibold text-gray_dark_1 
          md:bottom-[-50px] md:bg-white/20
          sm:bottom-[-50px] sm:bg-white/50
        "
        >
          이미 계정이 있나요?
          <span
            onClick={goToSignIn}
            className="ml-2 underline text-black cursor-pointer"
          >
            지금 로그인하세요!
          </span>
        </p>
      </form>
    </main>
  );
};

export default SignUpForm;
