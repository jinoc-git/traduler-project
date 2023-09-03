import React from 'react';

// import Carousel from '@components/carousel/Carousel';
import Carousel from '@components/carousel/Carousel';
import Comments from '@components/comments/Comments';
import Invite from '@components/common/invite/Invite';
import PlaceList from '@components/ending/PlaceList';
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
            ? 'w-[calc(100vw-270px)] ml-[270px]'
            : 'w-[calc(100vw-88px)] ml-[88px]'
          : 'w-[calc(100vw)] ml-0'
      }`}
    >
      <Invite />
      <EndingMap />
      <Carousel />
      <PlaceList />
      <TotalPay />
      <Comments />
    </main>
  );
};

export default Ending;
