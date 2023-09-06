import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import IconAdd from '@assets/icons/IconAdd';
import CardSection from '@components/main/card/CardSection';
import Profile from '@components/main/profile/Profile';
import { sideBarStore } from '@store/sideBarStore';

const Main = () => {
  const isSideBarOpen = sideBarStore((state) => state.isSideBarOpen);
  const isVisibleSideBar = sideBarStore((state) => state.isVisibleSideBar);

  const [hovered, setHovered] = useState(false);

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
      <section className="main-layout flex">
        <button
          className={`mt-[35px] ml-auto w-[160px] h-[45px] border border-white rounded-[7px] flex items-center justify-center 
          ${
            hovered
              ? 'bg-white text-blue_dark hover:bg-white hover:text-blue_dark'
              : ''
          }`}
          onMouseEnter={() => {
            setHovered(true);
          }}
          onMouseLeave={() => {
            setHovered(false);
          }}
          onClick={() => {
            navigate('/addPlan');
          }}
        >
          <IconAdd w="16" h="16" fill={hovered ? '#116DB3' : 'white'} />

          <span
            className={`ml-[10px] ${hovered ? 'text-blue_dark' : 'text-white'}`}
          >
            여행 생성하기
          </span>
        </button>
      </section>
      <CardSection />
    </main>
  );
};

export default Main;
