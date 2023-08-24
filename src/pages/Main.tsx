import React from 'react';
import { useNavigate } from 'react-router';

import getPlans from '@api/plans';
import Profile from '@components/main/profile/Profile';
import Pay from '@components/pay/pay';
import { useQuery } from '@tanstack/react-query';

const Main = () => {
  const navigate = useNavigate();
  const { data } = useQuery(['plans'], getPlans);
  console.log(data);

  return (
    <main>
      <div className="absolute top-0 w-screen h-[363px] bg-[#393939] z-[-1]"></div>
      <Profile />
      <button
        className="p-5 bg-slate-500"
        onClick={() => {
          navigate('/addPlan');
        }}
      >
        계획 추가하기
      </button>
      <Pay />
    </main>
  );
};

export default Main;
