/* eslint-disable @typescript-eslint/dot-notation */
import React from 'react';

import {
  ic_chevron_down_1x,
  ic_chevron_up_1x,
  ic_favorite_default_1x,
  ic_planned_time_1x,
  ic_previous_time_1x,
} from '@assets/icons/1x';
import { type PlanType } from 'types/supabase';

interface SideBarPlanListProps {
  toggleFunc: () => void;
  planList: PlanType[];
  filter: 'bookMark' | 'start' | 'end';
  isOpen: boolean;
}

const SideBarPlanList: React.FC<SideBarPlanListProps> = (props) => {
  const { toggleFunc, planList, filter, isOpen } = props;

  const iconList = {
    bookMark: ic_favorite_default_1x,
    start: ic_planned_time_1x,
    end: ic_previous_time_1x,
  };
  
  const listName = {
    bookMark: '즐겨찾기 한 목록',
    start: '예정된 여행',
    end: '다녀온 여행',
  };

  return (
    <div>
      <div
        className="flex w-[222px] justify-between items-center cursor-pointer"
        onClick={toggleFunc}
      >
        <button className="flex justify-center items-center w-[40px] h-[40px] transition-all duration-300 ease-in-out">
          <img src={iconList[filter]} />
        </button>
        <div className="flex items-center">
          <span className="w-[110px] text-sm">{listName[filter]}</span>
          <img
            src={isOpen ? ic_chevron_up_1x : ic_chevron_down_1x}
            alt="다운버튼"
            className="mr-5"
          />
        </div>
      </div>
      <ul>
        {isOpen &&
          planList.map((plan) => (
            <li className="w-[270px] pl-[65px] my-[5px] " key={plan.id}>
              <p className="text-xs">{plan.title}</p>
              <span className="text-xs">
                {plan.dates[0]} ~ {plan.dates[plan.dates.length - 1]}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SideBarPlanList;
