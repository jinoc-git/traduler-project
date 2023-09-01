/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ic_profile_3x } from '@assets/icons/3x';
import { defaultMainPlan } from '@assets/index';
import Favorite from '@components/main/favorite/Favorite';
import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import { formatPlanDates } from '@utils/changeFormatDay';
import {
  type PlanType,
  type BookMarkType,
  type UserType,
} from 'types/supabase';

// 다른 임포트들...

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

  const [planningCount, setPlanningCount] = useState<number>(0);
  const [endCount, setEndCount] = useState<number>(0);

  const filterData = plansData?.filter((plan) =>
    selectedPlan === 'planning'
      ? plan.plan_state === 'planning' || 'traveling'
      : plan.plan_state === 'end',
  );

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
      {filterData?.length === 0 ? (
        <div className="flex flex-col items-center">
          <div>
            <img
              src={defaultMainPlan}
              alt="사진"
              className="w-[125px] h-[100px]"
            />
          </div>
          <p>아직 예정된 여행 일정이 없으시군요!</p>
          <p>새로운 Tra-dule을 만들어보세요 :)</p>
        </div>
      ) : (
        filterData
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
            const participants = usersDataList.find((users) => users[plan.id])!;
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
                        : plan.dates[0] ===
                          new Date().toISOString().split('T')[0]
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
          })
      )}
    </div>
  );
};

export default Card;
