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
  }, [activePlan]);

  return (
    <div className="flex flex-col items-center h-[202px] border-y-2 py-[20px] border-slate-200">
      <div
        className={`flex items-center justify-between mb-[15px] transition-all duration-300 ease-in-out ${
          isOpen ? 'w-[197px]' : 'w-[40px] flex-col'
        }`}
      >
        <span className=" text-sm">STATUS</span>
        <div
          className={`flex-center rounded-[30px] text-sm text-white ${
            isOpen ? 'w-[72.5px] h-[22px]' : 'w-[38px] h-[10px]'
          } ${hasActivePlan ? 'bg-blue' : 'bg-yellow_light_3'}`}
        >
          {isOpen ? (hasActivePlan ? '여행중' : '대기중') : ''}
        </div>
      </div>
      <div
        className={`flex flex-col items-center gap-3 bg-blue_light_1 rounded-xl overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? 'w-[197px] h-[125px] flex-center flex-col'
            : 'w-[40px] h-[125px]'
        } ${hasActivePlan ? 'pt-3' : ''}`}
      >
        {!isOpen && hasActivePlan && (
          <p className="text-sm">{removedYearStartDay}</p>
        )}
        {hasActivePlan && (
          <p className=" bg-gradient-to-r from-blue_light_3 to-blue_light_0 text-transparent bg-clip-text font-bold text-4xl">
            {progressPercent}
          </p>
        )}
        {isOpen && !hasActivePlan && (
          <p className=" text-4xl">진행중인 여행이 없어요!</p>
        )}
        {isOpen && hasActivePlan && (
          <div className="text-center">
            <p className="w-[170px] text-sm truncate">{activePlan.title}</p>
            <p className="text-sm">{changedFormatStartDay}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBarStatus;
