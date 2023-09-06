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
import {
  ic_google_1x,
  ic_locked_default_1x,
  ic_message_default_1x,
  ic_name_1x,
  ic_visible_default_1x,
  ic_visible_solid_1x,
} from '@assets/icons/1x';
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
      <div className="absolute inset-0 bg-[url(https://github.com/jinoc-git/traduler-project/assets/131771098/127144e1-d63a-44e5-8622-5d429cb86586)] bg-left bg-cover bg-no-repeat w-[880px]"></div>
      <form
        onSubmit={handleSubmit(onSubmitSignUpHandler)}
        className="relative flex flex-col w-[450px] h-[540px] px-[50px] py-[37px] gap-y-2.5 rounded-xl bg-[#F9F9FB]"
      >
        <h2 className="text-blue border-blue border-b-2 w-[64px] text-lg font-semibold	">
          회원가입
        </h2>
        <div className="relative">
          <label htmlFor="nickname">
            <img
              src={ic_name_1x}
              alt="닉네임 아이콘"
              className="absolute top-[15px] left-[10px] w-[12px] h-[12px] cursor-pointer"
            />
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
            className="absolute top-[4px] right-[4px] h-[34px] p-1 text-sm text-white bg-blue hover:bg-blue_dark disabled:bg-gray_light_3 rounded"
          >
            중복확인
          </button>
          <p className="h-[20px] pt-1.5 text-center text-sm">
            {errors?.nickname?.message}
          </p>
        </div>
        <div className="relative">
          <label htmlFor="email">
            <img
              src={ic_message_default_1x}
              alt="이메일 아이콘"
              className="absolute top-[15px] left-[10px] w-[12px] h-[12px] cursor-pointer"
            />
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
            className="absolute top-[4px] right-[4px] h-[34px] p-1 text-sm text-white bg-blue hover:bg-blue_dark disabled:bg-gray_light_3 rounded"
          >
            중복확인
          </button>
          <p className="h-[20px] pt-1.5 text-center text-sm">
            {/* {showNicknameWarning} */}
            {errors?.email?.message}
          </p>
        </div>
        <div className="relative">
          <label htmlFor="password">
            <img
              src={ic_locked_default_1x}
              alt="비밀번호 아이콘"
              className="absolute top-[15px] left-[10px] w-[12px] h-[12px] cursor-pointer"
            />
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            {...register('password', passwordValidator)}
            placeholder="최소 6자리를 입력하세요"
            className="w-full h-[42px] px-8 rounded"
          />
          <img
            src={showPassword ? ic_visible_solid_1x : ic_visible_default_1x}
            alt="비밀번호 보기 아이콘"
            onClick={onClickShowPassword}
            className="absolute top-[15px] right-[10px] w-[14px] h-[14px] cursor-pointer"
          />
          <p className="h-[20px] pt-1.5 text-center text-sm">
            {errors?.password?.message}
          </p>
        </div>
        <div className="relative">
          <label htmlFor="confirmPassword">
            <img
              src={ic_locked_default_1x}
              alt="비밀번호 확인 아이콘"
              className="absolute top-[15px] left-[10px] w-[12px] h-[12px] cursor-pointer"
            />
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
          <img
            src={
              showCheckPassword ? ic_visible_solid_1x : ic_visible_default_1x
            }
            alt="비밀번호 보기 아이콘"
            onClick={onClickShowCheckPassword}
            className="absolute top-[15px] right-[10px] w-[14px] h-[14px] cursor-pointer"
          />
          <p className="h-[20px] pt-1.5 text-center text-sm">
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
        <p className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-[260px] text-sm ">
          이미 계정이 있나요?
          <span
            onClick={goToSignIn}
            className="ml-2 font-semibold underline cursor-pointer"
          >
            지금 로그인하세요!
          </span>
        </p>
      </form>
    </main>
  );
};

export default SignUpForm;
