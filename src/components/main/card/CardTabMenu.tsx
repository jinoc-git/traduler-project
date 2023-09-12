import React from 'react';

import { usePlanStore } from '@store/usePlanStore';
import { type PlanCountList } from 'types/aboutPlan';

interface CardTabMenuProps {
  planCount: PlanCountList;
}

const CardTabMenu: React.FC<CardTabMenuProps> = (props) => {
  const { planCount } = props;
  const { selectedPlan, setSelectedPlan } = usePlanStore();

  return (
    <div
      className="flex flex-center justify-center 
    sm:gap-[10px] sm:w-[320px] 
    md:w-[800px]"
    >
      <p
        className={`cursor-pointer text-white hover:text-yellow_light_2 
        sm:text-[11px]
        md:text-[16px]
        ${
          selectedPlan === 'bookMark'
            ? 'text-yellow_light_2 font-SemiBold'
            : 'text-white'
        }`}
        onClick={() => {
          setSelectedPlan('bookMark');
        }}
      >
        즐겨찾기 ({planCount.bookMark})
      </p>
      <span className="text-white"> | </span>
      <p
        className={`cursor-pointer text-white hover:text-yellow_light_2 
        sm:text-[11px] 
        md:text-[16px]
        ${
          selectedPlan === 'traveling'
            ? 'text-yellow_light_2 font-SemiBold'
            : 'text-white'
        }`}
        onClick={() => {
          setSelectedPlan('traveling');
        }}
      >
        여행 중 ({planCount.traveling})
      </p>
      <span className="text-white"> | </span>
      <p
        className={`cursor-pointer text-white hover:text-yellow_light_2 
        sm:text-[11px] 
        md:text-[16px]
        ${
          selectedPlan === 'planning'
            ? 'text-yellow_light_2 font-SemiBold'
            : 'text-white'
        }`}
        onClick={() => {
          setSelectedPlan('planning');
        }}
      >
        예정된 여행 ({planCount.planning})
      </p>
      <span className="text-white"> | </span>
      <p
        className={`cursor-pointer text-white hover:text-yellow_light_2 
        sm:text-[11px] 
        md:text-[16px]
        ${
          selectedPlan === 'end'
            ? 'text-yellow_light_2 font-SemiBold'
            : 'text-white'
        }`}
        onClick={() => {
          setSelectedPlan('end');
        }}
      >
        다녀온 여행 ({planCount.end})
      </p>
    </div>
  );
};

export default CardTabMenu;
