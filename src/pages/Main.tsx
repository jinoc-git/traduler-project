import React from 'react';
import { useNavigate } from 'react-router';

import Profile from '@components/main/profile/Profile';
// import Pay from '@components/pay/pay';
import CardSection from '@components/plan/listingPlan/CardSection';
import { sideBarStore } from '@store/sideBarStore';

const Main = () => {
  const isSideBarOpen = sideBarStore((state) => state.isSideBarOpen);
  const isVisibleSideBar = sideBarStore((state) => state.isVisibleSideBar);

  const navigate = useNavigate();

  return (
    <main
      className={`transition-all duration-300 ease-in-out pt-[50px]  ${
        isVisibleSideBar
          ? isSideBarOpen
            ? 'w-[calc(100vw-250px)] ml-[250px]'
            : 'w-[calc(100vw-50px)] ml-[50px]'
          : 'w-[calc(100vw)] ml-0'
      }`}
    >
      <div className="absolute top-0 left-0 w-[100vw] h-[363px] bg-[#393939] z-[-1]"></div>
      <Profile />
      <section className="main-layout">
        <button
          className="p-5 bg-slate-500"
          onClick={() => {
            navigate('/addPlan');
          }}
        >
          계획 추가하기
        </button>
      </section>
      <CardSection />
      {/* <Pay /> */}
    </main>
  );
};

export default Main;
