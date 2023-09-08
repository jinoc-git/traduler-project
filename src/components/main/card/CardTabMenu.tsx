import React from 'react';

import { usePlanStore } from '@store/usePlanStore';

import { type PlanCountList } from './Card';

interface CardTabMenuProps {
  planCount: PlanCountList;
}

const CardTabMenu: React.FC<CardTabMenuProps> = (props) => {
  const { planCount } = props;
  const { selectedPlan, setSelectedPlan } = usePlanStore();

  return (
    <div className="flex gap-[25px] mt-[20px] justify-center sm:w-[320px] md:w-[800px]">
      <p
        className={`cursor-pointer text-white sm:text-[11px] md:text-[16px] hover:text-yellow_light_2 ${
          selectedPlan === 'bookMark' ? 'text-yellow_light_2' : 'text-white'
        }`}
        onClick={() => {
          setSelectedPlan('bookMark');
        }}
      >
        즐겨찾기 ({planCount.bookMark})
      </p>
      <span className="text-white"> | </span>
      <p
        className={`cursor-pointer text-white sm:text-[11px] md:text-[16px] hover:text-yellow_light_2 ${
          selectedPlan === 'traveling' ? 'text-yellow_light_2' : 'text-white'
        }`}
        onClick={() => {
          setSelectedPlan('traveling');
        }}
      >
        여행 중 ({planCount.traveling})
      </p>
      <span className="text-white"> | </span>
      <p
        className={`cursor-pointer ml-[25px] text-white sm:text-[11px] md:text-[16px] hover:text-yellow_light_2 ${
          selectedPlan === 'planning' ? 'text-yellow_light_2' : 'text-white'
        }`}
        onClick={() => {
          setSelectedPlan('planning');
        }}
      >
        예정된 여행 ({planCount.planning})
      </p>
      <span className="text-white"> | </span>
      <p
        className={`cursor-pointer text-white sm:text-[11px] md:text-[16px] hover:text-yellow_light_2 ${
          selectedPlan === 'end' ? 'text-yellow_light_2' : 'text-white'
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
