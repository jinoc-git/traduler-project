import React from 'react';

import { type PlanType } from 'types/supabase';

interface CardProps {
  data: PlanType[] | null;
}

const Card: React.FC<CardProps> = ({ data }) => {
  console.log('data=>', data);

  const [selectedPlan, setSelectedPlan] = React.useState<'planning' | 'end'>(
    'planning',
  );

  // 클릭할때마다 변경
  const filterData =
    // 이거왜 자동인포트가되는지는 모르겠지만 우선 같은 뜻이라서 사용은함 근데지금은필요가없음
    // data != null
    // ?
    data?.filter((plan) =>
      selectedPlan === 'planning'
        ? plan.plan_state === 'planning'
        : plan.plan_state === 'end',
    );
  // : [];

  return (
    <div>
      <div className="flex flex-row">
        <div
          className={`cursor-pointer ${
            selectedPlan === 'planning' ? 'font-bold' : ''
          }`}
          onClick={() => {
            setSelectedPlan('planning');
          }}
        >
          예정된 계획 ({})
        </div>
        <div>|</div>
        <div
          className={`cursor-pointer ${
            selectedPlan === 'end' ? 'font-bold' : ''
          }`}
          onClick={() => {
            setSelectedPlan('end');
          }}
        >
          다녀온 여행 ({})
        </div>
      </div>
      {filterData
        ?.slice()
        .sort(
          (a, b) =>
            new Date(a.dates[0]).getTime() - new Date(b.dates[0]).getTime(),
        )
        .map((plan) => {
          // console.log('plan=>', plan);
          return (
            <>
              <div className="flex mb-4 border-2 w-[1000px] h-[200px]">
                <div className="w-1/5 h-12">
                  {plan.plan_state === 'planning'
                    ? '예정된 여행'
                    : '다녀온 여행'}
                </div>
                {/* {filterData.map((plan) => { */}
                {/* // console.log('filterData=>', filterData);
            // return ( */}
                <div className="w-3/5 h-12">
                  <div>{plan.title}</div>
                  <div>
                    {plan.dates[0]} ~ {plan.dates[plan.dates.length - 1]}
                  </div>
                  <div>멤버</div>
                </div>
                {/* //   );
          // })} */}

                <div className="w-1/5 h-12">
                  <div>즐겨찾기아이콘</div>
                  <div>예정일</div>
                </div>
              </div>
            </>
          );
        })}
    </div>
  );
};

export default Card;
