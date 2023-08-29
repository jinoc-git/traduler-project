import React from 'react';

import Invite from '@components/common/invite/Invite';
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
      <Invite />
      <UpdatePlan />
    </main>
  );
};

export default Plan;
