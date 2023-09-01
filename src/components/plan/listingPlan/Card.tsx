/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ic_profile_3x } from '@assets/icons/3x';
import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import { formatPlanDates } from '@utils/changeFormatDay';
import Favorite from 'components/main/favorite/Favorite';
import {
  type BookMarkType,
  type UserType,
  type PlanType,
} from 'types/supabase';

type UsersDataList = Record<string, UserType[]>;

interface CardProps {
  bookMarkData: BookMarkType[];
  plansData: PlanType[] | undefined;
  usersDataList: UsersDataList[];
}
const Card: React.FC<CardProps> = ({
  usersDataList,
  plansData,
  bookMarkData,
}) => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<'planning' | 'end'>(
    'planning',
  );

  // console.log('usersDataList=>', usersDataList);

  // const user = userStore.getState().user;

  const [planningCount, setPlanningCount] = useState<number>(0);
  const [endCount, setEndCount] = useState<number>(0);

  // 클릭할때마다 변경
  const filterData = plansData?.filter((plan) =>
    selectedPlan === 'planning'
      ? plan.plan_state === 'planning'
      : plan.plan_state === 'end',
  );

  // 계획에 참여한 모든 사용자

  // const participants = usersDataList
  //   ?.flat()
  //   .filter((participant) => participant.plan_id === plan.id);

  useEffect(() => {
    if (plansData != null) {
      setPlanningCount(
        plansData.filter((plan) => plan.plan_state === 'planning').length,
      );
      setEndCount(plansData.filter((plan) => plan.plan_state === 'end').length);
    }
  }, [plansData]);

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
          const { startDate, endDate } = formatPlanDates(plan);

          const isFavorite = bookMarkData.find(
            (bookMark) => bookMark.plan_id === plan.id,
          );

          // usersDataList에서 객체의 key값이 plan의 id인것을 find함
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const participants = usersDataList.find((users) => users[plan.id])!; // {planid: user[]}
          const participantsAvatarList = participants[plan.id].map(
            (user) => user.avatar_url,
          );
          const participantsNicknameList = participants[plan.id].map(
            (user) => user.nickname,
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
                    {startDate}~{endDate} {plan.dates.length - 1}박{' '}
                    {plan.dates.length}일
                  </div>
                  <div className="flex gap-3">
                    <div className="flex">
                      {participantsAvatarList.map((avatar, i) => {
                        let gap = '';
                        if (i > 0) {
                          gap = '-translate-x-1/2';
                        }

                        return (
                          <img
                            key={uuid()}
                            src={avatar ?? ic_profile_3x}
                            alt="유저아바타"
                            className={`${'w-[20px]'} ${'h-[20px]'} rounded-full ${gap}`}
                          />
                        );
                      })}
                    </div>
                    <div>
                      {/* 유저 닉네임 */}
                      {participantsNicknameList.map((name) => `${name} `)}
                    </div>
                  </div>
                </div>

                <div className="w-1/5 h-12">
                  <Favorite
                    isFavorite={Boolean(isFavorite)}
                    planId={plan.id}
                    bookMarkId={
                      isFavorite?.id !== undefined ? isFavorite.id : ''
                    }
                  />
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
