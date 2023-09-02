import React from 'react';

import Comments from '@components/comments/Comments';
import Invite from '@components/common/invite/Invite';
import TotalPay from '@components/pay/TotalPay';
import EndingMap from '@components/plan/ending/EndingMap';
import { sideBarStore } from '@store/sideBarStore';

const Ending = () => {
  const isSideBarOpen = sideBarStore((state) => state.isSideBarOpen);
  const isVisibleSideBar = sideBarStore((state) => state.isVisibleSideBar);

  return (
    <main
      className={`transition-all duration-300 ease-in-out pt-[50px] mx-auto flex-col flex-center ${
        isVisibleSideBar
          ? isSideBarOpen
            ? 'w-[calc(100vw-250px)] ml-[250px]'
            : 'w-[calc(100vw-50px)] ml-[50px]'
          : 'w-[calc(100vw)] ml-0'
      }`}
    >
      <Invite />
      <TotalPay />
      <EndingMap />
      <Comments />
    </main>
  );
};

export default Ending;
