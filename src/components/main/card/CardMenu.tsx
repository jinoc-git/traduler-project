import React from 'react';

import { tabMenuStore } from '@store/tabMenuStore';
import { type PlanCountList } from 'types/aboutPlan';

interface CardMenuProps {
  name: 'bookMark' | 'traveling' | 'planning' | 'end';
  planCount: PlanCountList;
}

const CardMenu = ({ name, planCount }: CardMenuProps) => {
  const { selectedMenu, setSelectedMenu } = tabMenuStore();

  const menuName = {
    bookMark: '즐겨찾기',
    traveling: '여행 중',
    planning: '예정된 여행',
    end: '다녀온 여행',
  } as const;

  return (
    <p
      className={`cursor-pointer text-white hover:text-yellow_light_2 
        sm:text-[11px]
        md:text-[16px]
        ${
          name === selectedMenu
            ? 'text-yellow_light_2 font-SemiBold'
            : 'text-white'
        }`}
      onClick={() => {
        setSelectedMenu(name);
      }}
    >
      {menuName[name]} ({planCount[name]})
    </p>
  );
};

export default CardMenu;
