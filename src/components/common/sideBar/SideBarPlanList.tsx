/* eslint-disable @typescript-eslint/dot-notation */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import IconChevronDown from '@assets/icons/IconChevronDown';
import IconChevronUp from '@assets/icons/IconChevronUp';
import IconFavoriteList from '@assets/icons/IconFavoriteList';
import IconPlannedTime from '@assets/icons/IconPlannedTime';
import IconPreviousTime from '@assets/icons/IconPreviousTime';
import { sideBarStore } from '@store/sideBarStore';
import { type PlanType } from 'types/supabase';

interface SideBarPlanListProps {
  toggleFunc: () => void;
  setFunc: (val: boolean) => void;
  planList: PlanType[];
  filter: 'bookMark' | 'start' | 'end';
  isOpen: boolean;
}

const SideBarPlanList: React.FC<SideBarPlanListProps> = (props) => {
  const { toggleFunc, setFunc, planList, filter, isOpen } = props;
  const isSideBarOpen = sideBarStore((state) => state.isSideBarOpen);
  const navigate = useNavigate();

  const iconList = {
    bookMark: <IconFavoriteList w="w-[24px]" h="h-[24px]" fill="#6E6F76" />,
    start: <IconPlannedTime />,
    end: <IconPreviousTime />,
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

  const isDropDownOpen = isOpen && !isSideBarOpen;

  return (
    <div className=" relative">
      <div
        className={`flex w-[222px] justify-between items-center cursor-pointer rounded-lg ${
          isSideBarOpen ? hoverColor[filter] : ''
        } ${isSideBarOpen && isOpen ? activeColor[filter] : ''} `}
        onClick={toggleFunc}
      >
        <button
          onBlur={() => {
            setFunc(false);
          }}
          className={`flex justify-center items-center w-[40px] h-[40px] rounded-lg transition-all duration-300 ease-in-out 
          ${focusColor[filter]} ${hoverColor[filter]} `}
        >
          {iconList[filter]}
        </button>
        <div className="flex items-center">
          <span className="w-[110px] font-bold text-sm text-gray_dark_1">
            {listName[filter]}
          </span>
          <div className="w-[14px] mr-5">
            {isOpen ? <IconChevronUp /> : <IconChevronDown />}
          </div>
        </div>
      </div>
      <ul
        style={{ overflow: isDropDownOpen ? 'visible' : '' }}
        className={` flex flex-col  w-[200px] ${
          isDropDownOpen
            ? ' fixed flex-center ml-[68px] mt-[-40px] w-[190px] border border-gray_light_3 rounded-lg  bg-white'
            : 'items-end ml-[22px]'
        } `}
      >
        {isOpen &&
          planList.length > 0 &&
          planList.slice(0, 3).map((plan) => (
            <li
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              onClick={() => {
                onClickListItem(plan.plan_state, plan.id);
              }}
              style={{ overflow: isDropDownOpen ? 'visible' : '' }}
              className="w-[175px] my-[5px] p-2 rounded-lg hover:bg-[#F6F6F6] text-gray hover:text-gray_dark_2 cursor-pointer "
              key={plan.id}
            >
              <p className="text-[13px]">{plan.title}</p>
              {!isDropDownOpen && (
                <span className="text-[13px]">
                  {plan.dates[0]} ~ {plan.dates[plan.dates.length - 1]}
                </span>
              )}
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
