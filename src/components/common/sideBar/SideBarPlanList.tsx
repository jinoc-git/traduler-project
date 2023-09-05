/* eslint-disable @typescript-eslint/dot-notation */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ic_chevron_down_1x,
  ic_chevron_up_1x,
  ic_favorite_list_1x,
  ic_planned_time_1x,
  ic_previous_time_1x,
} from '@assets/icons/1x';
import { sideBarStore } from '@store/sideBarStore';
import { type PlanType } from 'types/supabase';

interface SideBarPlanListProps {
  toggleFunc: () => void;
  planList: PlanType[];
  filter: 'bookMark' | 'start' | 'end';
  isOpen: boolean;
}

const SideBarPlanList: React.FC<SideBarPlanListProps> = (props) => {
  const { toggleFunc, planList, filter, isOpen } = props;
  const isSideBarOpen = sideBarStore((state) => state.isSideBarOpen);
  const navigate = useNavigate();

  const iconList = {
    bookMark: ic_favorite_list_1x,
    start: ic_planned_time_1x,
    end: ic_previous_time_1x,
  };

  const listName = {
    bookMark: '즐겨찾기 한 목록',
    start: '예정된 여행',
    end: '다녀온 여행',
  };

  const hoverColor = {
    bookMark: 'hover:bg-red_light_1',
    start: 'hover:bg-yellow_light_1',
    end: 'hover:bg-orange_light_1',
  };

  const focusColor = {
    bookMark: 'focus:bg-red_light_1',
    start: 'focus:bg-yellow_light_1',
    end: 'focus:bg-orange_light_1 ',
  };

  const activeColor = {
    bookMark: 'bg-red_light_1',
    start: 'bg-yellow_light_1',
    end: 'bg-orange_light_1',
  };

  const onClickListItem = (state: string, id: string) => {
    if (state === 'planning') navigate(`/plan/${id}`);
    if (state === 'traveling') navigate(`/plan/${id}`);
    if (state === 'recording') navigate(`/addPhoto/${id}`);
    if (state === 'end') navigate(`/ending/${id}`);
  };

  return (
    <div>
      <div
        className={`flex w-[222px] justify-between items-center cursor-pointer rounded-lg ${
          isSideBarOpen ? hoverColor[filter] : ''
        } ${isOpen ? activeColor[filter] : ''} `}
        onClick={isSideBarOpen ? toggleFunc : () => {}}
      >
        <button
          className={`flex justify-center items-center w-[40px] h-[40px] rounded-lg transition-all duration-300 ease-in-out 
          ${focusColor[filter]} ${hoverColor[filter]} `}
        >
          <img src={iconList[filter]} />
        </button>
        <div className="flex items-center">
          <span className="w-[110px] font-bold text-sm text-gray_dark_1">
            {listName[filter]}
          </span>
          <img
            src={isOpen ? ic_chevron_up_1x : ic_chevron_down_1x}
            alt="다운버튼"
            className="w-[14px] mr-5"
          />
        </div>
      </div>
      <ul className="flex flex-col items-end">
        {isOpen &&
          planList.length > 0 &&
          planList.slice(0, 3).map((plan) => (
            <li
              onClick={() => {
                onClickListItem(plan.plan_state, plan.id);
              }}
              className="w-[175px] my-[5px] p-2 rounded-lg hover:bg-[#F6F6F6] text-gray hover:text-gray_dark_2 cursor-pointer "
              key={plan.id}
            >
              <p className="text-[13px]">{plan.title}</p>
              <span className="text-[13px]">
                {plan.dates[0]} ~ {plan.dates[plan.dates.length - 1]}
              </span>
            </li>
          ))}
        {isOpen && planList.length === 0 && (
          <li className="w-[175px] my-[5px] p-2 rounded-lg hover:bg-[#F6F6F6] text-gray hover:text-gray_dark_2 cursor-pointer ">
            <p className="text-[13px]">{listName[filter]}이 없습니다</p>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SideBarPlanList;
