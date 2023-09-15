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

export interface ModifyInputType {
  title: string;
  totalCost: string;
}

const Plan = () => {
  const isSideBarOpen = sideBarStore((state) => state.isSideBarOpen);
  const user = userStore((state) => state.user);
  const resetDates = datesStore((state) => state.resetDates);

  const { modifyState, setModify, setReadOnly } = modifyStateStore();
  const { confirm } = useConfirm();

  const { id } = useParams();
  const navigate = useNavigate();

  const [planState, setPlanState] = useState<string>();
  const [isPossibleStart, setIsPossibleStart] = useState<boolean>(false);
  const [isPossibleEnd, setIsPossibleEnd] = useState<boolean>(false);

  const isModifying = modifyState === 'modify';

  const planId = id as string;

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const planStateColor = planState === 'planning' ? 'bg-yellow' : 'bg-blue';

  const {
    register,
    setFocus,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<ModifyInputType>({
    mode: 'onChange',
    defaultValues: {
      totalCost: '0',
    },
  });

  const { data, isLoading, isError } = useQuery(
    ['plan', planId],
    async () => await getPlan(planId),
  );

  const handleSubmitOrStateChangeBtn = () => {
    if (modifyState === 'modify') {
      mutation.mutate([planId, watch('title'), watch('totalCost')]);
      setReadOnly();
    } else {
      setModify();
    }
  };

  const onChangeCost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const removeString = e.target.value.replace(/[^0-9]+/g, '');
    const addComma = removeString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setValue('totalCost', addComma);
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
    mutationFn: async ([planId, title, cost]: [string, string, string]) => {
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
      setValue('title', data?.[0].title);
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
    navigate('/error');
    return;
  }

  return (
    <main
      className={`transition-all duration-300 ease-in-out sm:pt-[125px] md:pt-[70px] ${
        isSideBarOpen
          ? 'sidebar-open sm:ml-0 md:ml-[270px]'
          : 'sidebar-close sm:ml-0 md:ml-[88px]'
      }`}
    >
      <Nav
        isValid={isValid}
        page={'plan'}
        onClick={handleSubmitOrStateChangeBtn}
        modifyInputSetFocus={setFocus}
        modifyInputWatch={watch}
      />
      <PlanLayout>
        <div className="flex items-center md:justify-normal sm:justify-between ">
          <input
            id="title"
            aria-label="title"
            type="text"
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
            readOnly={modifyState === 'readOnly'}
            className=" border-b-[1px] border-gray outline-none font-bold placeholder:text-gray  text-#484848 read-only:cursor-default
            sm:w-[235px] sm:text-[20px] sm:read-only:border-b-0
            md:w-[260px] md:text-[24px] md:read-only:border-b-0"
          />
          <div
            className={` ${planStateColor} rounded-3xl w-[65px] h-[20px] flex items-center flex-center font-normal text-white
          sm:flex sm:text-[10px]
          md:flex md:text-[12px]`}
          >
            {planState === 'planning' ? '여행 계획 중' : '여행 중'}
          </div>
        </div>
        <PostPlan dataPlanDates={data?.[0].dates} />
        <Invite />
        <Pay
          onChangeCost={onChangeCost}
          total_Cost={watch('totalCost')}
          register={register}
          errors={errors}
        />
        <UpdatePlan dataPlanDates={data?.[0].dates as string[]} />
        <div
          className="flex  sm:mb-[60px]
        md:justify-end md:mt-[100px]  md:mr-[30px]
        sm:justify-start sm:mt-[82px] sm:ml-[4px]
        "
        >
          {planState === 'planning' ? (
            <div
              className="flex items-center gap-5 
            sm:w-[286px]  sm:h-[41px] sm:justify-normal
            md:w-[300px] md:h-[43px] md:justify-end"
            >
              <p
                className="text-gray_dark_1 font-Regular 
              sm:w-[200px] sm:text-sm
              md:w-[200px] md:text-noraml"
              >
                {isPossibleStart
                  ? isModifying
                    ? '상단의 저장 버튼을 눌러주세요.'
                    : '여행을 떠날 준비가 되셨나요?'
                  : '아직 시작일이 되지 않았습니다!'}
              </p>
              <button
                disabled={!isPossibleStart || isModifying}
                onClick={handleChangePlanState}
                className="flex-center p-3 border rounded-lg font-semibold border-blue text-blue hover:bg-blue_light_1 duration-200 disabled:border-gray_dark_1 disabled:cursor-default disabled:bg-gray_light_3 disabled:text-gray_dark_1
                sm:w-[114px] sm:h-[41px] sm:text-sm
                md:w-[130px] md:h-[43px] md:text-normal"
              >
                여행 시작
              </button>
            </div>
          ) : (
            <div
              className="flex items-center gap-5
              sm:w-[286px]  sm:h-[41px] sm:justify-normal
              md:w-[300px] md:h-[43px] md:justify-end"
            >
              <p
                className="text-gray_dark_1 font-Regular 
              sm:w-[200px] sm:text-sm
              md:w-[200px] md:text-normal"
              >
                {isPossibleEnd
                  ? isModifying
                    ? '상단의 저장 버튼을 눌러주세요.'
                    : '여행 일정을 마치셨나요?'
                  : '아직 종료일이 되지 않았습니다!'}
              </p>
              <button
                disabled={!isPossibleEnd || isModifying}
                onClick={handleChangePlanState}
                className="flex-center p-3 border rounded-lg font-semibold border-blue w-[130px] text-blue hover:bg-blue_light_1 duration-200 disabled:border-gray_dark_1 disabled:cursor-default disabled:bg-gray_light_3 disabled:text-gray_dark_1
                sm:w-[114px] sm:h-[41px] sm:text-sm
                md:w-[130px] md:h-[43px] md:text-normal"
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
