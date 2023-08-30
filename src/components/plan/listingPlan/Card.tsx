import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { type GetPlans } from '@api/plans';
import Favorite from '@components/main/favorite/Favorite';

interface CardProps {
  data: GetPlans[];
}

const Card: React.FC<CardProps> = ({ data }) => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = React.useState<'planning' | 'end'>(
    'planning',
  );

  const [planningCount, setPlanningCount] = React.useState<number>(0);
  const [endCount, setEndCount] = React.useState<number>(0);
  // 요일 표시하기 위해

  // 클릭할때마다 변경
  const filterData = data?.filter((plan) =>
    selectedPlan === 'planning'
      ? plan.plan_state === 'planning'
      : plan.plan_state === 'end',
  );

  useEffect(() => {
    if (data != null) {
      setPlanningCount(
        data.filter((plan) => plan.plan_state === 'planning').length,
      );
      setEndCount(data.filter((plan) => plan.plan_state === 'end').length);
    }
  }, [data]);
  console.log('11111111', data);
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
          예정된 계획 ({planningCount})
        </div>
        <div> | </div>
        <div
          className={`cursor-pointer ${
            selectedPlan === 'end' ? 'font-bold' : ''
          }`}
          onClick={() => {
            setSelectedPlan('end');
          }}
        >
          다녀온 여행 ({endCount})
        </div>
      </div>
      {filterData
        ?.slice()
        .sort(
          (a, b) =>
            new Date(a.dates[0]).getTime() - new Date(b.dates[0]).getTime(),
        )
        .map((plan) => {
          const [startYear, startMonth, startDay] = plan.dates[0].split('-');
          const [endYear, endMonth, endDay] =
            plan.dates[plan.dates.length - 1].split('-');
          const startDate = new Date(plan.dates[0]);
          const endDate = new Date(plan.dates[plan.dates.length - 1]);

          // getDay 함수를 사용하여 요일을 추출합니다 (일요일: 0, 토요일: 6)
          const startDayOfWeek = startDate.getDay();
          const endDayOfWeek = endDate.getDay();
          // 요일을 한글로 변환합니다
          const daysInKorean = ['일', '월', '화', '수', '목', '금', '토'];
          const koreanStartDay = daysInKorean[startDayOfWeek];
          const koreanEndDay = daysInKorean[endDayOfWeek];

          const isFavorite = plan.book_mark.find(
            (bookMark) => bookMark.plan_id === plan.id,
          );

          return (
            <div key={plan.id}>
              <div
                className="flex mb-4 border-2 w-[800px] h-[200px]"
                onClick={() => {
                  navigate(`/plan/${plan.id}`);
                }}
              >
                <div className="w-1/5 h-12">
                  {plan.plan_state === 'planning'
                    ? '예정된 여행'
                    : '다녀온 여행'}
                </div>

                <div className="w-3/5 h-12">
                  <div>{plan.title}</div>
                  <div>
                    {startYear}년{startMonth}월{startDay}일 ({koreanStartDay}) ~{' '}
                    {endYear}년 {endMonth}월{endDay}일 ({koreanEndDay})
                    {plan.dates.length - 1}박 {plan.dates.length}일
                  </div>
                  <div>멤버</div>
                </div>

                <div className="w-1/5 h-12">
                  <Favorite isFavorite={Boolean(isFavorite)} planId={plan.id} />
                  <div>
                    {plan.plan_state === 'end'
                      ? null
                      : plan.dates[0] === new Date().toISOString().split('T')[0]
                      ? 'D-Day'
                      : `D-${Math.ceil(
                          (new Date(plan.dates[0]).getTime() -
                            new Date().getTime()) /
                            (1000 * 60 * 60 * 24),
                        )}`}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Card;
