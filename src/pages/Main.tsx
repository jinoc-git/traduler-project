import React from 'react';
import { useNavigate } from 'react-router';

import IconAdd from '@assets/icons/IconAdd';
import CardSection from '@components/main/card/CardSection';
import Profile from '@components/main/profile/Profile';
import { sideBarStore } from '@store/sideBarStore';

const Main = () => {
  const isSideBarOpen = sideBarStore((state) => state.isSideBarOpen);
  const isVisibleSideBar = sideBarStore((state) => state.isVisibleSideBar);

  const navigate = useNavigate();

  return (
    <main
      className={`transition-all duration-300 ease-in-out pt-[108px]  ${
        isVisibleSideBar
          ? isSideBarOpen
            ? 'w-[calc(100vw-270px)] ml-[270px]'
            : 'w-[calc(100vw-88px)] ml-[88px]'
          : 'w-[calc(100vw)] ml-0'
      }`}
    >
      <div className="absolute top-0 left-0 w-[100vw] h-[363px] bg-blue_dark z-[-1]"></div>
      <Profile />
      <section className="flex main-layout ">
        <button
          className="group mt-[35px] ml-auto w-[160px] h-[45px] border border-white rounded-[7px] flex items-center justify-center  text-white hover:bg-white hover:text-blue_dark gap-3 fill-white "
          onClick={() => {
            navigate('/addPlan');
          }}
        >
          <IconAdd w="16" h="16" fill="#1A68DB" />
          여행 생성하기
        </button>
      </section>
      <CardSection />
    </main>
  );
};

export default Main;
