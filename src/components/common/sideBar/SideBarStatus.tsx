/* eslint-disable @typescript-eslint/restrict-plus-operands */
import React, { useEffect, useState } from 'react';

import calcDateProgress from '@utils/calcDateProgress';
import {
  changeDotFormatOfDate,
  removeYearOfDate,
} from '@utils/changeFormatDay';
import { type PlanType } from 'types/supabase';

interface SideBarStatusProps {
  isOpen: boolean;
  activePlan: PlanType | undefined;
}

const SideBarStatus: React.FC<SideBarStatusProps> = (props) => {
  const [progressPercent, setProgressPercent] = useState('');
  const { isOpen, activePlan } = props;
  const hasActivePlan = activePlan !== undefined;

  const removedYearStartDay = removeYearOfDate(activePlan?.dates[0]);
  const changedFormatStartDay = changeDotFormatOfDate(activePlan?.dates[0]);

  useEffect(() => {
    if (hasActivePlan) {
      const startDay = activePlan.dates[0];
      const endDay = activePlan.dates[activePlan.dates.length - 1];
      const percent = calcDateProgress(startDay, endDay);
      setProgressPercent(percent);
    }
  }, []);

  return (
    <div className="flex flex-col items-center h-[202px] border-y-2 py-[20px] border-slate-200">
      <div
        className={`flex items-center justify-between mb-[15px] transition-all duration-300 ease-in-out ${
          isOpen ? 'w-[197px]' : 'w-[40px] flex-col'
        }`}
      >
        <span className=" text-sm">STATUS</span>
        <div
          className={`flex-center rounded-[30px]  bg-blue text-sm text-white ${
            isOpen ? 'w-[72.5px] h-[22px]' : 'w-[38px] h-[10px]'
          } ${hasActivePlan ? 'bg-blue' : ''}`}
        >
          {isOpen ? (hasActivePlan ? '여행중' : '대기중') : ''}
        </div>
      </div>
      <div
        className={` bg-blue_light_1 rounded-xl transition-all duration-300 ease-in-out ${
          isOpen ? 'w-[197px] h-[125px]' : 'w-[40px] h-[125px]'
        }`}
      >
        {!isOpen && hasActivePlan && (
          <p className="text-sm">{removedYearStartDay}</p>
        )}
        <p>{progressPercent}</p>
        {isOpen && hasActivePlan && (
          <p className="text-sm">{activePlan.title}</p>
        )}
        {isOpen && hasActivePlan && (
          <p className="text-sm">{changedFormatStartDay}</p>
        )}
      </div>
    </div>
  );
};

export default SideBarStatus;
