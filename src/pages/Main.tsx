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
            ? 'sidebar-open sm:ml-[20px] md:ml-[270px]'
            : 'sidebar-close sm:ml-[0px]'
          : 'md:w-[calc(100vw)] md:ml-0 sm:ml-[0px]'
      }`}
    >
      <div
        className="absolute top-0 left-0 w-[100vw] bg-blue_dark z-[-1]
      sm:h-[313px]
      md:h-[363px]"
      ></div>
      <Profile />
      <section className="flex main-layout ">
        <button
          className="group flex items-center font-Bold justify-center rounded-[7px] hover:text-blue_dark gap-3 hover:bg-white
          sm:w-[310px] sm:h-[46px] sm:mt-[16px] sm:mb-[26px] sm:ml-auto sm:font-bold sm:text-sm sm:text-blue_dark  sm:bg-white 
          md:md:w-[160px] md:h-[45px] mt-[35px] md:ml-auto md:border md:border-white md:text-white md:bg-blue_dark md:fill-white"
          onClick={() => {
            navigate('/addPlan');
          }}
        >
          <IconAdd w="w-[16px]" h="h-[16px]" fill="#1A68DB" />
          여행 생성하기
        </button>
      </section>
      <CardSection />
    </main>
  );
};

export default Main;
