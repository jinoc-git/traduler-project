/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { changePlanState, getPlan, updatePlan } from '@api/plans';
import PlanLayout from '@components/addPlan/planLayout/PlanLayout';
import PostPlan from '@components/addPlan/postPlan/PostPlan';
import Invite from '@components/common/invite/Invite';
import Nav from '@components/common/nav/Nav';
import Pay from '@components/common/pay/Pay';
import Loading from '@components/loading/Loading';
import UpdatePlan from '@components/plan/updatePlan/UpdatePlan';
import useConfirm from '@hooks/useConfirm';
import { datesStore } from '@store/datesStore';
import { modifyStateStore } from '@store/modifyStateStore';
import { sideBarStore } from '@store/sideBarStore';
import { userStore } from '@store/userStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import ErrorPage from './ErrorPage';

interface InputType {
  totalCost?: number;
}

const Plan = () => {
  const isSideBarOpen = sideBarStore((state) => state.isSideBarOpen);
  const user = userStore((state) => state.user);
  const resetDates = datesStore((state) => state.resetDates);
  const { modifyState, setModify, setReadOnly } = modifyStateStore();
  const { id } = useParams();
  const { confirm } = useConfirm();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [planState, setPlanState] = useState<string>();
  const [isPossibleStart, setIsPossibleStart] = useState<boolean>(false);
  const [isPossibleEnd, setIsPossibleEnd] = useState<boolean>(false);
  const isModifying = modifyState === 'modify';
  const planId: string = id as string;
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const planStateColor = planState === 'planning' ? 'bg-yellow' : 'bg-blue';

  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<InputType>({
    mode: 'onChange',
  });

  const { data, isLoading, isError } = useQuery(
    ['plan', planId],
    async () => await getPlan(planId),
  );

  const handleSubmitButton = () => {
    if (modifyState === 'modify') {
      setReadOnly();
    } else {
      setModify();
    }
    mutation.mutate([planId, title, watch('totalCost') as number]);
  };

  const handleChangePlanState = () => {
    if (planState === 'planning') {
      const confTitle = '여행 중으로 변경';
      const confDesc =
        '여행 중으로 변경할 경우 다시 계획 중으로 되돌릴 수 없습니다. 변경하시겠습니까?';
      const confFunc = () => {
        changeMutation.mutate([planId, 'traveling']);
        scrollTop();
      };
      confirm.default(confTitle, confDesc, confFunc);
    } else {
      const confTitle = '여행 완료로 변경';
      const confDesc =
        '여행을 완료하시면 더 이상 여행 내용을 수정하실 수 없습니다. 완료하시겠습니까?';
      const confFunc = () => {
        changeMutation.mutate([planId, 'recording']);
        navigate(`/addPhoto/${planId}`);
      };
      confirm.default(confTitle, confDesc, confFunc);
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
      console.error(error);
      toast.error('계획 수정하기 오류 발생');
    },
  });
  
  const changeMutation = useMutation({
    mutationFn: changePlanState,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['plan', planId] });
      void queryClient.invalidateQueries({
        queryKey: ['plan_mates', user?.id],
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error('오류 발생');
    },
  });

  useEffect(() => {
    if (data?.[0] !== undefined) {
      setTitle(data?.[0].title);
      setValue('totalCost', data?.[0].total_cost);
      setPlanState(data[0].plan_state);
    }

    const today = new Date();
    const startDate = new Date(data?.[0].dates[0] as string);
    const endDate = new Date(
      data?.[0].dates[data?.[0].dates.length - 1] as string,
    );
    if (today >= startDate) {
      setIsPossibleStart(true);
    } else {
      setIsPossibleStart(false);
    }
    if (today >= endDate) {
      setIsPossibleEnd(true);
    } else {
      setIsPossibleEnd(false);
    }

    return () => {
      resetDates();
    };
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorPage />;
  }

  return (
    <main
      className={`transition-all duration-300  ease-in-out py-[60px] ${
        isSideBarOpen
          ? 'w-[calc(100vw-270px)] ml-[270px]'
          : 'w-[calc(100vw-88px)] ml-[88px]'
      }`}
    >
      <Nav isValid={isValid} page={'plan'} onClick={handleSubmitButton} />
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
        <Pay
          total_Cost={watch('totalCost')}
          register={register}
          errors={errors}
        />
        <UpdatePlan />
        <div className="flex items-center justify-end gap-5 mt-16">
          {planState === 'planning' ? (
            <div className="flex my-[100px] items-center justify-end gap-5">
              <p>
                {isPossibleStart
                  ? isModifying
                    ? '상단의 저장 버튼을 눌러주세요.'
                    : '여행을 떠날 준비가 되셨나요?'
                  : '아직 시작일이 되지 않았습니다!'}
              </p>
              <button
                disabled={!isPossibleStart || isModifying}
                onClick={handleChangePlanState}
                className="p-3 border rounded-lg font-bold border-blue w-[130px] text-blue hover:bg-blue_light_1 duration-200 disabled:border-gray_dark_1 disabled:cursor-default disabled:bg-gray_light_3 disabled:text-gray_dark_1"
              >
                여행 시작
              </button>
            </div>
          ) : (
            <div className="flex my-[100px] items-center justify-end gap-5">
              <p>
                {isPossibleEnd
                  ? isModifying
                    ? '상단의 저장 버튼을 눌러주세요.'
                    : '여행 일정을 마치셨나요?'
                  : '아직 종료일이 되지 않았습니다!'}
              </p>
              <button
                disabled={!isPossibleEnd || isModifying}
                onClick={handleChangePlanState}
                className="p-3 border rounded-lg font-bold border-blue w-[130px] text-blue hover:bg-blue_light_1 duration-200 disabled:border-gray_dark_1 disabled:cursor-default disabled:bg-gray_light_3 disabled:text-gray_dark_1"
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
