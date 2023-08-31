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
  } = useForm<InputType>();

  const [totalCost, setTotalCost] = useState('');
  const { invitedUser, inviteUser, resetInvitedUser, syncInviteduser } =
    inviteUserStore();

  const submitPlan = async () => {
    if (userId !== null) {
      await addPlan(
        userId as string,
        watch('title') as string,
        parseInt(totalCost, 10),
        pins,
        dates,
        invitedUser,
      );
      navigate('/main');
    }
  };

  const [currentPage, setCurrentPage] = useState(0);
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    resetDates();
    resetInvitedUser();
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
      className={`transition-all duration-300  ease-in-out p-32 ${
        isSideBarOpen
          ? 'w-[calc(100vw-250px)] ml-[250px]'
          : 'w-[calc(100vw-50px)] ml-[50px]'
      }`}
    >
      <Nav />
      <button
        type="submit"
        disabled={isSubmitting}
        className="p-3 bg-slate-500"
        onClick={handleSubmit(submitPlan)}
      >
        저장하기
      </button>
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
          className="border-b-2 w-full border-#AdAdAd outline-none text-[24px] font-bold"
        />
        <p>{errors?.title?.message}</p>
        <Invite />
        <PostPlan state={'addPlan'} />
        <div className="flex items-center">
          <div className="text-[16px] font-semibold mr-[50px]">전체 예산</div>
          <input
            className="text-[14px] font-medium border rounded-lg p-1"
            type="number"
            value={totalCost}
            placeholder="예산을 입력하세요."
            onChange={(event) => {
              setTotalCost(event.target.value);
            }}
          />
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
