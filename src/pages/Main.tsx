import React from 'react';
import { useNavigate } from 'react-router';

import { getPlans } from '@api/plans';
import Pay from '@components/pay/pay';
import CardSection from '@components/plan/listingPlan/CardSection';
import { useQuery } from '@tanstack/react-query';

const Main = () => {
  const navigate = useNavigate();
  const { data } = useQuery(['plans'], getPlans);
  console.log(data);

  return (
    <div>
      <button
        className="p-5 bg-slate-500"
        onClick={() => {
          navigate('/addPlan');
        }}
      >
        계획 추가하기
      </button>
      <CardSection />
      <Pay />
    </div>
  );
};

export default Main;
