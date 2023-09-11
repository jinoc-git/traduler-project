/* eslint-disable @typescript-eslint/dot-notation */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import IconChevronDown from '@assets/icons/IconChevronDown';
import IconChevronUp from '@assets/icons/IconChevronUp';
import IconFavoriteList from '@assets/icons/IconFavoriteList';
import IconPlannedTime from '@assets/icons/IconPlannedTime';
import IconPreviousTime from '@assets/icons/IconPreviousTime';
import { sideBarStore } from '@store/sideBarStore';
import { usePlanStore } from '@store/usePlanStore';
import { changeSideBarFormat } from '@utils/changeFormatDay';
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
  const setSelectedPlan = usePlanStore((state) => state.setSelectedPlan);
  const navigate = useNavigate();

  const iconList = {
    bookMark: <IconFavoriteList w="w-[20px]" h="h-[20px]" fill="#6E6F76" />,
    start: <IconPlannedTime w="w-[20px]" h="h-[20px]" />,
    end: <IconPreviousTime w="w-[19px]" h="h-[19px]" />,
  };

  const listName = {
    bookMark: '즐겨찾기 한 목록',
    start: '예정된 여행',
    end: '다녀온 여행',
  };

  const hoverColor = {
    bookMark: 'md:hover:bg-red_light_1',
    start: 'md:hover:bg-yellow_light_1',
    end: 'md:hover:bg-orange_light_1',
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

  const onClickMoreBtn = () => {
    if (filter === 'bookMark') {
      setSelectedPlan('bookMark');
    }
    if (filter === 'start') {
      setSelectedPlan('planning');
    }
    if (filter === 'end') {
      setSelectedPlan('end');
    }
    setFunc(false);
    navigate('/main');
  };

  const isDropDownOpen = isOpen && !isSideBarOpen;

  return (
    <div className=" relative">
      <div
        className={`flex justify-between items-center cursor-pointer rounded-lg 
        sm:w-[308px] 
        md:w-[222px]
        ${isSideBarOpen ? hoverColor[filter] : ''} ${
          isSideBarOpen && isOpen ? activeColor[filter] : ''
        } `}
        onClick={toggleFunc}
      >
        <button
          onBlur={() => {
            setFunc(false);
          }}
          className={`flex-center w-[40px] h-[40px] rounded-lg transition-all duration-300 ease-in-out 
          ${isOpen ? focusColor[filter] : ''} ${hoverColor[filter]} `}
        >
          {iconList[filter]}
        </button>
        <div className="flex items-center">
          <span
            className="font-bold text-sm text-gray_dark_1
          sm:w-[198px]  
          md:w-[110px]
          "
          >
            {listName[filter]}
          </span>
          <div className="w-[14px] mr-5">
            {isOpen ? (
              <IconChevronUp w="w-[14px]" h="h-[14px]" fill="#4E4F54" />
            ) : (
              <IconChevronDown w="w-[14px]" h="h-[14px]" fill="#4E4F54" />
            )}
          </div>
        </div>
      </div>
      <ul
        style={{ overflow: isDropDownOpen ? 'visible' : '' }}
        className={` flex flex-col md:w-[200px] sm:w-[285px] ${
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
              className="flex  p-2 rounded-lg hover:bg-[#F6F6F6] text-gray hover:text-gray_dark_2 cursor-pointer 
              md:w-[175px] md:my-[5px]
              sm:w-[234px] sm:mt-[5px]
              "
              key={plan.id}
            >
              <p
                className={`text-[13px]   ${
                  isDropDownOpen ? '' : 'md:max-w-[100px] truncate'
                }`}
              >
                {plan.title}
              </p>
              {!isDropDownOpen && (
                <span className="text-[13px] ml-[4px]">
                  ({changeSideBarFormat(plan.dates[0])})
                </span>
              )}
            </li>
          ))}

        {isOpen && planList.length > 3 && (
          <li
            onMouseDown={(e) => {
              e.preventDefault();
            }}
            onClick={onClickMoreBtn}
            style={{ overflow: isDropDownOpen ? 'visible' : '' }}
            className="md:w-[175px] sm:w-[234px] mb-[5px] p-2 rounded-lg hover:bg-[#F6F6F6] text-gray text-center hover:text-gray_dark_2 cursor-pointer "
          >
            <p className="text-[13px]">+ 더보기</p>
          </li>
        )}

        {isOpen && planList.length === 0 && (
          <li
            className="my-[5px] p-2 rounded-lg hover:bg-[#F6F6F6] text-gray hover:text-gray_dark_2 cursor-pointer 
            md:w-[175px]
            sm:w-[234px]
            "
          >
            <p className="text-[13px]">{listName[filter]}이 없습니다</p>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SideBarPlanList;
