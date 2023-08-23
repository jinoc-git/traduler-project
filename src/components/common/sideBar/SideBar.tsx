import React, { useEffect, useState } from 'react';

import getPlans, { type Plan } from '@api/supabaseSidebar';

const SideBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);
  // supabase데이터 뿌려주기
  const [plans, setPlans] = useState<Plan[] | null>(null);

  const toggleMenu: () => void = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 데이터뿌리기위해

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fechedPlans = await getPlans();
        // console.log('fechedPlans=>', fechedPlans);
        setPlans(fechedPlans);
      } catch (error) {
        console.log('Error', error);
      }
    };

    void fetchData();
  }, []);

  // const filterPlans = plans?.filter((plan) => {
  //   const nowDate = new Date();
  //   const endDate = new Date(plan.dates[1]);
  //   return (
  //     endDate < nowDate && endDate !== nowDate && plan.plan_state === 'end'
  //   );
  // });
  const endPlans = plans?.filter((plan) => plan.plan_state === 'end');
  // console.log('endPlans=>', endPlans);
  const startPlans = plans?.filter((plan) => plan.plan_state === 'planning');

  // 현재 여행중인것만 나타나게하는 filter 프로그래스바? 만들고 적용해보자.
  // const travelPlans = plans?.filter((plan) => plan.plan_state === 'traveling');

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
              {/* <div>장소이름(기간)</div>
              <div>장소이름(기간)</div> */}
            </div>
            <div>
              {/* 데이터가 들어와서 date의 날짜가 현재날짜를 지났을때 여기에 뿌려줘야되나..? */}
              {/* {plans != null ? (
                <div>
                  {plans.title} ({plans.dates[0]} ~ {plans.dates[1]}){' '}
                </div>
              ) : (
                <div>다녀온 여행이없습니다.</div>
              )} */}
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
              {/* <div>전주 (23.06.06 ~2306.07)</div>
              <div>다낭 (23.06.06 ~2306.07)</div> */}
            </div>
            {/* <div className="border-r border-red-400 h-full mx-20"></div> */}
          </div>
        )}
      </div>
    </>
  );
};
export default SideBar;
