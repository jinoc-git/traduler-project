import React from 'react';

import PostPlan from '@components/plan/PostPlan';
import UpdatePlan from '@components/plan/updatePlan/UpdatePlan';

const Plan = () => {
  return (
    <div>
      <PostPlan />
      <div>친구 초대하기</div>
      <UpdatePlan />
    </div>
  );
};

export default Plan;
