import React, { useEffect } from 'react';

import Invite from '@components/common/invite/Invite';
import Nav from '@components/common/nav/Nav';
import PostPlan from '@components/plan/PostPlan';
import UpdatePlan from '@components/plan/updatePlan/UpdatePlan';
import { datesStore } from '@store/datesStore';
import { inviteUserStore } from '@store/inviteUserStore';
import { sideBarStore } from '@store/sideBarStore';

const Plan = () => {
  const isSideBarOpen = sideBarStore((state) => state.isSideBarOpen);
  const { resetInvitedUser } = inviteUserStore();
  const resetDates = datesStore((state) => state.resetDates);

  useEffect(() => {
    return () => {
      resetInvitedUser();
      resetDates();
    };
  }, []);

  return (
    <main
      className={`transition-all duration-300  ease-in-out p-32 ${
        isSideBarOpen
          ? 'w-[calc(100vw-250px)] ml-[250px]'
          : 'w-[calc(100vw-50px)] ml-[50px]'
      }`}
    >
      <Nav />
      <div className="px-[210px] py-[100px]">
        <div>여행제목</div>
        <Invite />
        <PostPlan />
        <div className="flex items-center">
          <div className="text-[16px] font-semibold mr-[50px]">예산</div>
        </div>
        <UpdatePlan />
      </div>
    </main>
  );
};

export default Plan;
