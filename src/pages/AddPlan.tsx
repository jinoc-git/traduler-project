import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { type PinContentsType } from '@api/pins';
import { addPlan } from '@api/plans';
import Invite from '@components/common/invite/Invite';
import Nav from '@components/common/nav/Nav';
import AddPlanContents from '@components/plan/addPlan/AddPlanContents';
import DatePage from '@components/plan/DatePage';
import Pay from '@components/plan/Pay';
import PayLayout from '@components/plan/PayLayout';
import PlanLayout from '@components/plan/PlanLayout';
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
  } = useForm<InputType>({ mode: 'onChange' });
  const { invitedUser, inviteUser, syncInviteduser } = inviteUserStore();

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
      toast.success('저장되었습니다.');
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
          ? 'w-[calc(100vw-270px)] ml-[270px]'
          : 'w-[calc(100vw-88px)] ml-[88px]'
      }`}
    >
      <Nav
        page={'addPlan'}
        onClick={handleSubmit(submitPlan)}
        buttonDisabled={buttonDisabled}
      />
      <PlanLayout>
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
        <p className="h-[15px] text-sm text-red-400">
          {errors?.title?.message}
        </p>
        <div className="flex flex-col mx-auto w-[700px]">
          <PostPlan state={'addPlan'} />
          <Invite />
          <PayLayout>
            <Pay register={register} errors={errors} />
          </PayLayout>
          <DatePage
            dates={dates}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            currentPage={currentPage}
          />
          <AddPlanContents
            currentPage={currentPage}
            pins={pins}
            setPins={setPins}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </PlanLayout>
    </main>
  );
};

export default AddPlan;
