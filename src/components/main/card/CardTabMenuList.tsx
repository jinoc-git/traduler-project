import React from 'react';

import { type PlanCountList } from 'types/aboutPlan';

import CardMenu from './CardMenu';

interface CardTabMenuProps {
  planCount: PlanCountList;
}

const CardTabMenuList = ({ planCount }: CardTabMenuProps) => {
  return (
    <div
      className="flex flex-center justify-center 
    sm:gap-[10px] sm:w-[320px] 
    md:w-[800px]"
    >
      <CardMenu name="bookMark" planCount={planCount} />
      <span className="text-white"> | </span>
      <CardMenu name="traveling" planCount={planCount} />
      <span className="text-white"> | </span>
      <CardMenu name="planning" planCount={planCount} />
      <span className="text-white"> | </span>
      <CardMenu name="end" planCount={planCount} />
    </div>
  );
};

export default CardTabMenuList;
