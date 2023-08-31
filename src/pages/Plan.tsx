/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPlan, updatePlan } from '@api/plans';
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
  const { data } = useQuery(
    ['plan', planId],
    async () => await getPlan(planId),
  );

  const [title, setTitle] = useState<string>('');
  const [cost, setCost] = useState<number>(0);

  useEffect(() => {
    return () => {
      resetInvitedUser();
      resetDates();
    };
  }, []);

  const handleSubmitButton = () => {
    if (modifyState === 'modify') {
      setReadOnly();
    } else {
      setModify();
    }
    // 제목이랑 예산 수정한 값 data에 update하기
    mutation.mutate([planId, title, cost]);
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

  useEffect(() => {
    console.log(modifyState);
  }, [modifyState]);

  useEffect(() => {
    if (data?.[0] !== undefined) {
      setTitle(data?.[0].title);
      setCost(data?.[0].total_cost);
    }
  }, [data]);

  return (
    <main
      className={`transition-all duration-300  ease-in-out py-[60px] ${
        isSideBarOpen
          ? 'w-[calc(100vw-250px)] ml-[250px]'
          : 'w-[calc(100vw-50px)] ml-[50px]'
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
        <Invite />
        <PostPlan />
        <div className="flex items-center">
          <label className="text-[16px] font-semibold mr-[50px]">예산</label>
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
      </div>
    </main>
  );
};

export default Plan;
