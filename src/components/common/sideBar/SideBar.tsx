import React, { useState } from 'react';

import { getPlans } from '@api/plans';
import { useQuery } from '@tanstack/react-query';
import { type PlanType } from 'types/supabase';

const SideBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);
  // supabase데이터 뿌려주기
  const { data, isLoading, isError } = useQuery<PlanType[] | null>(
    ['plans'],
    getPlans,
  );

  console.log('data=>', data);

  const toggleMenu: () => void = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const endPlans = data?.filter((plan) => plan.plan_state === 'end');

  const startPlans = data?.filter((plan) => plan.plan_state === 'planning');

  // 현재 여행중인것만 나타나게하는 filter 프로그래스바? 만들고 적용해보자.
  // const travelPlans = plans?.filter((plan) => plan.plan_state === 'traveling');

  if (isLoading) {
    return <div>로딩중 ..</div>;
  }
  if (isError) {
    return <div>오류</div>;
  }

  return (
    <>
      <div
        className={` h-[100vh] w-[250px] bg-white transition-transform duration-300 ease-in-out border-r-10 ${
          isMenuOpen ? 'transform translate-x-0' : ''
        }`}
      >
        <div className="text-2xl mb-4 flex items-center pr-4">
          <div className="cursor-pointer " onClick={toggleMenu}>
            ☰
          </div>
        </div>
        {isMenuOpen && (
          <div>
            <div>
              <div>여행 중</div>
            </div>
            <div>
              <div>즐겨찾기 한 목록</div>
              <div>장소 이름(기간)</div>
              <div>장소 이름(기간)</div>
              <div>장소 이름(기간)</div>
            </div>

            <div>
              <div>예정된 여행</div>
              {startPlans
                ?.slice()
                .sort(
                  (a, b) =>
                    new Date(a.dates[0]).getTime() -
                    new Date(b.dates[0]).getTime(),
                )
                .map((plan) => {
                  return (
                    <div key={plan.id}>
                      <div>{plan.title}</div>
                      {/* <div>{plan?.dates.join(',')}</div> */}
                      <div>
                        {plan.dates[0]} ~ {plan.dates[plan.dates.length - 1]}
                      </div>
                    </div>
                  );
                })}

              <div>다녀온 여행</div>
              {endPlans
                ?.slice()
                .sort(
                  (a, b) =>
                    new Date(a.dates[0]).getTime() -
                    new Date(b.dates[0]).getTime(),
                )
                .map((plan) => {
                  return (
                    <div key={plan.id}>
                      <div>{plan.title}</div>
                      {plan.dates[0]} ~ {plan.dates[plan.dates.length - 1]}
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default SideBar;
