import React, { useState } from 'react';

import { getPlans } from '@api/plans';
import {
  ic_chevron_down_1x,
  ic_chevron_up_1x,
  ic_favorite_default_1x,
  ic_planned_time_1x,
  ic_previous_time_1x,
} from '@assets/icons/1x';
import { useSidebarStore } from '@store/sidebarStore';
import { useQuery } from '@tanstack/react-query';
import { type PlanType } from 'types/supabase';

const SideBar: React.FC = () => {
  const isMenuOpen = useSidebarStore((state) => state.isMenuOpen);
  const [startPlansOpen, setStartPlansOpen] = useState(false);
  const [endPlansOpen, setEndPlansOpen] = useState(false);
  const [favoritePlansOpen, setFavoritePlansOpen] = useState(false);

  // supabase데이터 뿌려주기
  const { data, isLoading, isError } = useQuery<PlanType[] | null>(
    ['plans'],
    getPlans,
  );

  if (data === null) {
    return <div>로딩중 ...</div>;
  }

  if (isLoading) {
    return <div>로딩중 ..</div>;
  }
  if (isError) {
    return <div>오류</div>;
  }

  const sortedData = data.sort(
    (a, b) => new Date(a.dates[0]).getTime() - new Date(b.dates[0]).getTime(),
  );

  const endPlans = sortedData.filter((plan) => plan.plan_state === 'end');

  const startPlans = sortedData.filter(
    (plan) => plan.plan_state === 'planning',
  );

  return (
    <aside
      className={`fixed mt-[50px] h-[100vh] w-[250px] bg-gray-200 transition-all overflow-hidden duration-300 ease-in-out border-r-10 ${
        isMenuOpen ? 'w-[250px] ' : 'w-[50px]'
      }`}
      style={{ zIndex: 10 }}
    >
      <div className="flex flex-col gap-[20px]">
        <div>
          <div>여행 중</div>
        </div>
        <div>
          <div
            className="flex w-[250px] items-center cursor-pointer"
            onClick={() => {
              setFavoritePlansOpen(!favoritePlansOpen);
            }}
          >
            <img src={ic_favorite_default_1x} />{' '}
            <span className="ml-[35px]">즐겨찾기 한 목록 </span>
            <img src={ic_chevron_down_1x} alt="다운버튼" className="ml-2" />
          </div>
          {isMenuOpen && (
            <div className="pl-[65px]">
              <p className="text-sm"> 장소 이름(기간)</p>
              <p className="text-sm">장소 이름(기간)</p>
              <p className="text-sm">장소 이름(기간)</p>
            </div>
          )}
        </div>

        <div>
          <div
            className="flex w-[250px] items-center cursor-pointer"
            onClick={() => {
              setStartPlansOpen(!startPlansOpen);
            }}
          >
            <img src={ic_planned_time_1x} />
            <span className="ml-[35px]">예정된 여행 </span>
            <img
              src={
                isMenuOpen && startPlansOpen
                  ? ic_chevron_up_1x
                  : ic_chevron_down_1x
              }
              alt="다운버튼"
              className="ml-2"
            />
          </div>
          {isMenuOpen &&
            startPlansOpen &&
            startPlans.map((plan) => {
              return (
                <div className="w-[250px] pl-[65px] my-[5px] " key={plan.id}>
                  <p className="text-sm">{plan.title}</p>
                  <span className="text-sm">
                    {plan.dates[0]} ~ {plan.dates[plan.dates.length - 1]}
                  </span>
                </div>
              );
            })}
        </div>
        <div>
          <div
            className="flex w-[250px] items-center cursor-pointer"
            onClick={() => {
              setEndPlansOpen(!endPlansOpen);
            }}
          >
            <img src={ic_previous_time_1x} />
            <span className="ml-[35px]">다녀온 여행 </span>
            <img
              src={
                isMenuOpen && endPlansOpen
                  ? ic_chevron_up_1x
                  : ic_chevron_down_1x
              }
              alt="다운버튼"
              className="ml-2"
            />
          </div>
          {isMenuOpen &&
            endPlansOpen &&
            endPlans.map((plan) => {
              return (
                <div className="w-[250px] pl-[65px] my-[5px] " key={plan.id}>
                  <p className="text-sm">{plan.title}</p>
                  <span className="text-sm">
                    {plan.dates[0]} ~ {plan.dates[plan.dates.length - 1]}
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </aside>
  );
};
export default SideBar;
