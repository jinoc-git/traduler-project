import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { signInWithGoogle, signInWithSB } from '@api/supabaseAuth';
import useFormValidator from '@hooks/useFormValidator';
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

  const { emailValidator } = useFormValidator();

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
    <main className="flex justify-center items-center w-screen h-screen">
      <form
        onSubmit={handleSubmit(onSubmitSignInHandler)}
        className="flex flex-col w-[450px] h-[410px] px-[50px] py-[37px] border gap-y-2.5 rounded-xl"
      >
        <h2 className="border-black border-b-2 w-[54px] text-lg font-semibold	">
          로그인
        </h2>
        <div className="relative">
          <svg
            width="10"
            height="12"
            viewBox="0 0 10 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-1/2 -translate-y-1/2 left-[10px]"
          >
            <g clipPath="url(#clip0_1_206)">
              <path
                d="M9.15242 2.52707C9.11455 2.52239 9.07639 2.52239 9.03853 2.52707H1.26075C1.2109 2.52799 1.16138 2.53696 1.11353 2.55374L5.12741 7.3504L9.15242 2.52707Z"
                fill="#828282"
              />
              <path
                d="M9.56357 2.99042L5.51912 7.82375C5.41503 7.94792 5.27422 8.01761 5.12745 8.01761C4.98068 8.01761 4.83988 7.94792 4.73579 7.82375L0.727452 3.02708C0.71513 3.08143 0.708596 3.13743 0.708008 3.19375V9.86042C0.708008 10.0372 0.766539 10.2068 0.870726 10.3318C0.974913 10.4568 1.11622 10.5271 1.26356 10.5271H9.04134C9.18869 10.5271 9.32999 10.4568 9.43418 10.3318C9.53837 10.2068 9.5969 10.0372 9.5969 9.86042V3.19375C9.59469 3.1243 9.58344 3.0557 9.56357 2.99042ZM1.64412 9.86042H1.25801V9.38375L3.27745 6.98042L3.66912 7.45042L1.64412 9.86042ZM9.03579 9.86042H8.6469L6.6219 7.45042L7.01356 6.98042L9.03301 9.38375L9.03579 9.86042Z"
                fill="#828282"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_206">
                <rect
                  width="9.16667"
                  height="11"
                  fill="white"
                  transform="translate(0.171875 0.5271)"
                />
              </clipPath>
            </defs>
          </svg>
          <input
            type="text"
            id="signin-email"
            {...register('email', emailValidator)}
            className="border w-full h-[42px] px-7 rounded"
            placeholder="이메일을 입력하세요"
          />
        </div>
        <div className="relative">
          <svg
            width="10"
            height="13"
            viewBox="0 0 10 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-1/2 -translate-y-1/2 left-[10px]"
          >
            <path
              d="M4.7119 9.30802C4.99947 9.30802 5.27526 9.19764 5.4786 9.00117C5.68195 8.80471 5.79618 8.53824 5.79618 8.2604C5.79618 7.98255 5.68195 7.71608 5.4786 7.51962C5.27526 7.32315 4.99947 7.21278 4.7119 7.21278C4.42433 7.21278 4.14854 7.32315 3.94519 7.51962C3.74185 7.71608 3.62761 7.98255 3.62761 8.2604C3.62761 8.53824 3.74185 8.80471 3.94519 9.00117C4.14854 9.19764 4.42433 9.30802 4.7119 9.30802ZM7.96476 4.59373C8.25233 4.59373 8.52812 4.7041 8.73146 4.90057C8.9348 5.09704 9.04904 5.3635 9.04904 5.64135V10.8794C9.04904 11.1573 8.9348 11.4238 8.73146 11.6202C8.52812 11.8167 8.25233 11.9271 7.96476 11.9271H1.45904C1.17147 11.9271 0.895679 11.8167 0.692336 11.6202C0.488993 11.4238 0.374756 11.1573 0.374756 10.8794V5.64135C0.374756 5.3635 0.488993 5.09704 0.692336 4.90057C0.895679 4.7041 1.17147 4.59373 1.45904 4.59373H2.00118V3.54611C2.00118 2.8515 2.28678 2.18533 2.79513 1.69416C3.30349 1.203 3.99297 0.927063 4.7119 0.927063C5.06787 0.927063 5.42037 0.994807 5.74924 1.12643C6.07812 1.25805 6.37695 1.45096 6.62866 1.69416C6.88038 1.93737 7.08005 2.22609 7.21627 2.54384C7.3525 2.8616 7.42261 3.20217 7.42261 3.54611V4.59373H7.96476ZM4.7119 1.97468C4.28054 1.97468 3.86685 2.14024 3.56184 2.43494C3.25683 2.72964 3.08547 3.12934 3.08547 3.54611V4.59373H6.33833V3.54611C6.33833 3.12934 6.16697 2.72964 5.86196 2.43494C5.55694 2.14024 5.14325 1.97468 4.7119 1.97468Z"
              fill="#828282"
            />
          </svg>
          <input
            type="password"
            id="signin-password"
            {...register('password')}
            className="border w-full h-[42px] px-7 rounded"
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <div className="flex justify-between">
          <label className="text-sm text-slate-400 cursor-pointer">
            <input type="checkbox" className="mr-2" />
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
          구글 계정으로 로그인 하기
        </button>
      </form>{' '}
    </main>
  );
};

export default SignInForm;
