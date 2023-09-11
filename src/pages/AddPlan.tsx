/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { type PinContentsType } from '@api/pins';
import { addPlan } from '@api/plans';
import DatePage from '@components/addPlan/datePage/DatePage';
import PlanLayout from '@components/addPlan/planLayout/PlanLayout';
import PostPlan from '@components/addPlan/postPlan/PostPlan';
import Invite from '@components/common/invite/Invite';
import Nav from '@components/common/nav/Nav';
import Pay from '@components/common/pay/Pay';
import AddPlanContents from '@components/plan/addPlan/AddPlanContents';
import useHandlePage from '@hooks/useHandlePage';
import { datesStore } from '@store/datesStore';
import { inviteUserStore } from '@store/inviteUserStore';
import { sideBarStore } from '@store/sideBarStore';
import { userStore } from '@store/userStore';
import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type PlanType, type UserType } from 'types/supabase';

export interface InputType {
  title: string;
  totalCost: number;
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
    setFocus,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<InputType>({
    mode: 'onChange',
    defaultValues: {
      totalCost: 0,
    },
  });

  const { invitedUser, inviteUser, syncInviteduser } = inviteUserStore();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plan_mates', userId] });
    },
    onError: () => {
      toast.error('여행 생성에 실패했습니다.');
    },
  });

  const submitPlan = async () => {
    if (userId !== null) {
      const newPlan: PlanType = {
        id: uuid(),
        users_id: userId as string,
        title: watch('title'),
        total_cost: watch('totalCost'),
        isDeleted: false,
        dates,
        plan_state: 'planning',
      };
      const addPlanObj = {
        newPlan,
        pins,
        invitedUser,
      };
      mutation.mutate(addPlanObj);
      toast.success('저장되었습니다.');
      navigate('/main');
    }
  };

  const buttonDisabled =
    isSubmitting ||
    watch('totalCost') === undefined ||
    watch('title')?.length === 0 ||
    dates.length === 0;

  const { currentPage, handleNextPage, handlePreviousPage, setCurrentPage } =
    useHandlePage();

  useEffect(() => {
    setFocus('title');
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
      className={`transition-all duration-300 ease-in-out sm:pt-[125px] md:pt-[60px] ${
        isSideBarOpen
          ? 'sidebar-open sm:ml-0 md:ml-[270px]'
          : 'sidebar-close sm:ml-0 md:ml-[88px]'
      }`}
    >
      <Nav
        isValid={isValid}
        page={'addPlan'}
        onClick={handleSubmit(submitPlan)}
        buttonDisabled={buttonDisabled}
        addInputSetFocus={setFocus}
        addInputWatch={watch}
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
            maxLength: {
              value: 12,
              message: '제목은 12글자 이하여야 합니다.',
            },
          })}
          className="border-b-[1px] border-gray w-full outline-none font-bold placeholder:text-gray  text-black
          sm:text-[20px]
          md:text-[24px] "
        />
        <p
          className="text-xs font-bold text-red-600
        sm:h-[8px] sm:w-[297px]
        md:h-[15px]"
        >
          {errors?.title?.message}
        </p>
        <div className="flex flex-col mx-auto w-[700px]">
          <PostPlan state={'addPlan'} />
          <Invite />
          <Pay register={register} errors={errors} />
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
