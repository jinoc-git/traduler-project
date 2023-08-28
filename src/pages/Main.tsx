import React from 'react';
import { useNavigate } from 'react-router';

import { getPlans } from '@api/plans';
import Profile from '@components/main/profile/Profile';
// import Pay from '@components/pay/pay';
import CardSection from '@components/plan/listingPlan/CardSection';
import { useSidebarStore } from '@store/sidebarStore';
import { useQuery } from '@tanstack/react-query';

const Main = () => {
  const isMenuOpen = useSidebarStore((state) => state.isMenuOpen);
  console.log('isMenuOpen=>', isMenuOpen);
  const navigate = useNavigate();
  const { data } = useQuery(['plans'], getPlans);
  console.log(data);

  return (
    <main
      className={`transition-all duration-300  ease-in-out ${
        isMenuOpen
          ? 'w-[calc(100vw-250px)] ml-[250px]'
          : 'w-[calc(100vw-50px)] ml-[50px]'
      }`}
    >
      <div className="absolute top-0 left-0 w-[100vw] h-[363px] bg-[#393939] z-[-1]"></div>
      <Profile />
      <button
        className="p-5 bg-slate-500"
        onClick={() => {
          navigate('/addPlan');
        }}
      >
        계획 추가하기
      </button>
      <CardSection />
      {/* <Pay /> */}
    </main>
  );
};

export default Main;
