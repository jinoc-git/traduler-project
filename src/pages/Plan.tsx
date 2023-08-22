import React from 'react';

import PostPlan from '@components/plan/PostPlan';
import Map from '@components/plan/updatePlan/Map';
import Pins from '@components/plan/updatePlan/Pins';

const Plan = () => {
  return (
    <div>
      <PostPlan />
      <div>날짜 선택하기</div>
      <div>친구 초대하기</div>
      <Map />
      <Pins />
    </div>
  );
};

export default Plan;
