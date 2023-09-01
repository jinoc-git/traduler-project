/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useLayoutEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { changePlanState, getPlan, updatePlan } from '@api/plans';
import Comments from '@components/comments/Comments';
import Invite from '@components/common/invite/Invite';
import Nav from '@components/common/nav/Nav';
import PostPlan from '@components/plan/PostPlan';
import UpdatePlan from '@components/plan/updatePlan/UpdatePlan';
import { datesStore } from '@store/datesStore';
import { inviteUserStore } from '@store/inviteUserStore';
import { modifyStateStore } from '@store/modifyStateStore';
import { sideBarStore } from '@store/sideBarStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const Plan = () => {
  const isSideBarOpen = sideBarStore((state) => state.isSideBarOpen);
  const { resetInvitedUser } = inviteUserStore();
  const resetDates = datesStore((state) => state.resetDates);
  const { modifyState, setModify, setReadOnly } = modifyStateStore();
  const { id } = useParams();
  const planId: string = id as string;
  const { data, isLoading } = useQuery(
    ['plan', planId],
    async () => await getPlan(planId),
  );

  const [title, setTitle] = useState<string>('');
  const [cost, setCost] = useState<number>(0);
  const [planState, setPlanState] = useState<string>();

  const handleSubmitButton = () => {
    if (modifyState === 'modify') {
      setReadOnly();
    } else {
      setModify();
    }
    mutation.mutate([planId, title, cost]);
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

  useLayoutEffect(() => {
    if (data?.[0] !== undefined) {
      setTitle(data?.[0].title);
      setCost(data?.[0].total_cost);
      setPlanState(data[0].plan_state);
    }
    return () => {
      resetInvitedUser();
      resetDates();
    };
  }, [data]);

  if (isLoading) {
    return (
      <div className="felx-center text-[400px] text-center font-extrabold">
        로딩중...
      </div>
    );
  }

  return (
    <>
      {planState === 'end' ? (
        // plans_ending 없을 때
        <Navigate to={`/addPhoto/${planId}`} />
      ) : (
        <main
          className={`transition-all duration-300  ease-in-out py-[60px] ${
            isSideBarOpen
              ? 'w-[calc(100vw-270px)] ml-[270px]'
              : 'w-[calc(100vw-88px)] ml-[88px]'
          }`}
        >
          <Nav page={'plan'} onClick={handleSubmitButton} />
          <div className="flex flex-col gap-3 px-[210px] py-[100px]">
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              readOnly={modifyState === 'readOnly'}
              className="border-b-[1px] border-gray w-full outline-none text-xlg font-bold placeholder:text-gray  text-black read-only:cursor-default"
            />
            <div className="bg-orange rounded-3xl w-[65px] h-[20px] text-[9px] flex-center font-normal text-white">
              {planState === 'planning' ? '여행 계획 중' : '여행 중'}
            </div>
            <Invite />
            <PostPlan />
            <div className="flex items-center">
              <label className="text-[16px] font-semibold mr-[50px]">
                예산
              </label>
              <input
                type="number"
                value={cost}
                onChange={(e) => {
                  setCost(+e.target.value);
                }}
                readOnly={modifyState === 'readOnly'}
                className="outline-none text-[16px] font-bold placeholder:text-gray text-black read-only:cursor-default"
              />
            </div>
            <UpdatePlan />
            <div className="flex items-center justify-end gap-5">
              {planState === 'planning' ? (
                <>
                  <p>여행을 떠날 준비가 되셨나요?</p>
                  <button
                    onClick={handleChangePlanState}
                    className="p-3 border rounded-lg border-gray w-[130px]"
                  >
                    여행 시작
                  </button>
                </>
              ) : (
                <>
                  <p>여행 일정을 마치셨나요?</p>
                  <button
                    onClick={handleChangePlanState}
                    className="p-3 border rounded-lg border-gray w-[130px]"
                  >
                    여행 완료
                  </button>
                </>
              )}
            </div>
            <Comments />
          </div>
        </main>
      )}
    </>
  );
};

export default Plan;
