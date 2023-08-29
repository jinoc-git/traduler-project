import React from 'react';

import PostPlan from '@components/plan/PostPlan';
import UpdatePlan from '@components/plan/updatePlan/UpdatePlan';
import { sideBarStore } from '@store/sideBarStore';

const Plan = () => {
  const isSideBarOpen = sideBarStore((state) => state.isSideBarOpen);

  return (
    <main
      className={`transition-all duration-300  ease-in-out p-32 ${
        isSideBarOpen
          ? 'w-[calc(100vw-250px)] ml-[250px]'
          : 'w-[calc(100vw-50px)] ml-[50px]'
      }`}
    >
      <PostPlan />
      <div>친구 초대하기</div>
      <UpdatePlan />
    </main>
  );
};

export default Plan;
