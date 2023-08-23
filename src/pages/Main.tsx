import React from 'react';
import { useNavigate } from 'react-router';

import getPlans from '@api/plans';
import AddPay from '@components/pay/AddPay';
import Pay from '@components/pay/Pay';
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
      <AddPay />
      <Pay />
    </div>
  );
};

export default Main;
