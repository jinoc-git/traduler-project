import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { type PinContentsType } from '@api/pins';
import { addPlan } from '@api/plans';
import Invite from '@components/common/invite/Invite';
import Nav from '@components/common/nav/Nav';
import AddPlanContents from '@components/plan/addPlan/AddPlanContents';
import PostPlan from '@components/plan/PostPlan';
import { datesStore } from '@store/datesStore';
import { inviteUserStore } from '@store/inviteUserStore';
import { sideBarStore } from '@store/sideBarStore';
import { userStore } from '@store/userStore';
import { type UserType } from 'types/supabase';

interface InputType {
  title?: string;
  totalCost?: number;
}

const AddPlan = () => {
  const isSideBarOpen = sideBarStore((state) => state.isSideBarOpen);
  const user = userStore((state) => state.user);
  const userId = user?.id;
  const { dates, resetDates } = datesStore();
  const [pins, setPins] = useState<PinContentsType[][]>([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({ mode: 'onChange', defaultValues: { totalCost: 0 } });
  const { invitedUser, inviteUser, syncInviteduser, resetInvitedUser } =
    inviteUserStore();

  const submitPlan = async () => {
    if (userId !== null) {
      const totalCost = watch('totalCost') as number;
      await addPlan(
        userId as string,
        watch('title') as string,
        parseInt(totalCost.toString(), 10),
        pins,
        dates,
        invitedUser,
      );
      alert('저장되었습니다.');
      navigate('/main');
    }
  };
  const buttonDisabled =
    isSubmitting ||
    watch('totalCost') === undefined ||
    watch('title')?.length === 0 ||
    dates.length === 0;

  const [currentPage, setCurrentPage] = useState(0);
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    return () => {
      resetDates();
      resetInvitedUser();
    };
  }, []);

  useEffect(() => {
    if (user !== null) {
      const curUser: UserType = {
        avatar_url: user?.profileImg,
        email: user?.email,
        id: user?.id,
        nickname: user?.nickname,
      };
      inviteUser(curUser);
      syncInviteduser();
    }
  }, [user]);

  return (
    <main
      className={`transition-all duration-300  ease-in-out py-[60px] ${
        isSideBarOpen
          ? 'w-[calc(100vw-250px)] ml-[250px]'
          : 'w-[calc(100vw-50px)] ml-[50px]'
      }`}
    >
      <Nav
        page={'addPlan'}
        onClick={handleSubmit(submitPlan)}
        buttonDisabled={buttonDisabled}
      />
      <div className="px-[210px] py-[100px]">
        <input
          id="title"
          type="text"
          placeholder="여행 제목을 입력하세요."
          {...register('title', {
            required: '제목은 필수입니다.',
            minLength: {
              value: 2,
              message: '제목은 2글자 이상이어야 합니다.',
            },
          })}
          className="border-b-[1px] border-gray w-full outline-none text-[24px] font-bold placeholder:text-gray  text-black"
        />
        <p className="h-[20px] pt-1.5 text-sm">{errors?.title?.message}</p>
        <Invite />
        <PostPlan state={'addPlan'} />
        <div className="flex items-center">
          <div className="text-[16px] font-semibold mr-[50px]">전체 예산</div>
          <input
            id="totalCost"
            type="number"
            placeholder="예산을 입력하세요."
            {...register('totalCost', {
              required: '예산은 필수입니다.',
            })}
            className="text-[14px] font-medium border rounded-lg p-1"
          />
          <p className="h-[20px] pt-1.5 text-sm">
            {errors?.totalCost?.message}
          </p>
        </div>
        <div className="flex justify-center gap-5 mb-10 text-[14px] font-semibold">
          {dates.length !== 0 ? (
            <>
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
                className="cursor-pointer disabled:text-transparent disabled:cursor-none"
              >
                ⬅️
              </button>
              <h1>{dates[currentPage]}</h1>
              <button
                onClick={handleNextPage}
                disabled={currentPage === dates.length - 1}
                className="cursor-pointer disabled:text-transparent disabled:cursor-none"
              >
                ➡️
              </button>
            </>
          ) : (
            <div>날짜를 선택하세요</div>
          )}
        </div>
        <AddPlanContents
          currentPage={currentPage}
          pins={pins}
          setPins={setPins}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </main>
  );
};

export default AddPlan;
