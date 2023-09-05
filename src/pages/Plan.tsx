/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { changePlanState, getPlan, updatePlan } from '@api/plans';
import Invite from '@components/common/invite/Invite';
import Nav from '@components/common/nav/Nav';
import Loading from '@components/loading/Loading';
import Pay from '@components/plan/Pay';
import PlanLayout from '@components/plan/PlanLayout';
import PostPlan from '@components/plan/PostPlan';
import UpdatePlan from '@components/plan/updatePlan/UpdatePlan';
import { datesStore } from '@store/datesStore';
import { modifyStateStore } from '@store/modifyStateStore';
import { sideBarStore } from '@store/sideBarStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface InputType {
  totalCost?: number;
}

const Plan = () => {
  const isSideBarOpen = sideBarStore((state) => state.isSideBarOpen);
  const resetDates = datesStore((state) => state.resetDates);
  const { modifyState, setModify, setReadOnly } = modifyStateStore();
  const { id } = useParams();
  const planId: string = id as string;
  const { data, isLoading } = useQuery(
    ['plan', planId],
    async () => await getPlan(planId),
  );

  const [title, setTitle] = useState<string>('');
  const [planState, setPlanState] = useState<string>();
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InputType>({
    mode: 'onChange',
  });

  const handleSubmitButton = () => {
    if (modifyState === 'modify') {
      setReadOnly();
    } else {
      setModify();
    }
    mutation.mutate([planId, title, watch('totalCost') as number]);
  };

  const navigate = useNavigate();
  const handleChangePlanState = () => {
    if (planState === 'planning') {
      const conf = window.confirm(
        '여행 중으로 변경하시겠습니까? 계획 중으로 다시 되돌릴 수 없습니다.',
      );
      if (conf) {
        changeMutation.mutate([planId, 'traveling']);
      }
    } else {
      const conf = window.confirm(
        `여행을 완료하시면 더 이상 여행 내용을 수정하실 수 없습니다. 정말 완료하시겠습니까?`,
      );
      if (conf) {
        changeMutation.mutate([planId, 'end']);
        navigate(`/addPhoto/${planId}`);
      }
    }
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ([planId, title, cost]: [string, string, number]) => {
      await updatePlan(planId, title, cost);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['plan', planId] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const changeMutation = useMutation({
    mutationFn: changePlanState,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['plan', planId] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (data?.[0] !== undefined) {
      setTitle(data?.[0].title);
      setValue('totalCost', data?.[0].total_cost);
      setPlanState(data[0].plan_state);
    }
    return () => {
      resetDates();
    };
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  const planStateColor = planState === 'planning' ? 'bg-yellow' : 'bg-blue';

  return (
    <main
      className={`transition-all duration-300  ease-in-out py-[60px] ${
        isSideBarOpen
          ? 'w-[calc(100vw-270px)] ml-[270px]'
          : 'w-[calc(100vw-88px)] ml-[88px]'
      }`}
    >
      <Nav page={'plan'} onClick={handleSubmitButton} />
      <PlanLayout>
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          readOnly={modifyState === 'readOnly'}
          className="border-b-[1px] border-gray w-full outline-none text-xlg font-bold placeholder:text-gray  text-black read-only:cursor-default"
        />
        <div
          className={` ${planStateColor} rounded-3xl w-[65px] h-[20px] text-[9px] flex-center font-normal text-white mt-[16px]`}
        >
          {planState === 'planning' ? '여행 계획 중' : '여행 중'}
        </div>
        <PostPlan />
        <Invite />
        <Pay register={register} errors={errors} />
        <UpdatePlan />
        <div className="flex items-center justify-end gap-5 mt-16">
          {planState === 'planning' ? (
            <div className="flex my-[100px] items-center justify-end gap-5">
              <p>여행을 떠날 준비가 되셨나요?</p>
              <button
                onClick={handleChangePlanState}
                className="p-3 border rounded-lg font-bold border-blue w-[130px] text-blue hover:bg-blue_light_1 duration-200"
              >
                여행 시작
              </button>
            </div>
          ) : (
            <div className="flex my-[100px] items-center justify-end gap-5">
              <p>여행 일정을 마치셨나요?</p>
              <button
                onClick={handleChangePlanState}
                className="p-3 border rounded-lg font-bold border-blue w-[130px] text-blue hover:bg-blue_light_1 duration-200"
              >
                여행 완료
              </button>
            </div>
          )}
        </div>
      </PlanLayout>
    </main>
  );
};

export default Plan;
