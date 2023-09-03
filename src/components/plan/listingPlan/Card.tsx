/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { deletePlan } from '@api/plans';
import { ic_delete_default_1x } from '@assets/icons/1x';
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
  const [selectedPlan, setSelectedPlan] = useState<
    'traveling' | 'planning' | 'end'
  >('traveling');
  // console.log('bookMarkData=>', bookMarkData);
  // console.log('plansData=>', plansData);
  const [planningCount, setPlanningCount] = useState<number>(0);
  const [endCount, setEndCount] = useState<number>(0);
  const [travelingCount, setTravelingCount] = useState<number>(0);
  const [deletedPlans, setDeletedPlans] = useState<string[]>([]);

  // const filterData = plansData
  //   ?.filter((plan) =>
  //     selectedPlan === 'planning'
  //       ? plan.plan_state === 'planning' || plan.plan_state === 'traveling'
  //       : plan.plan_state === 'end',
  //   )
  //   .filter((plan) => !plan.isDeleted);

  const filterData = plansData
    ?.filter((plan) => {
      if (selectedPlan === 'traveling') {
        return plan.plan_state === 'traveling';
      } else if (selectedPlan === 'planning') {
        return plan.plan_state === 'planning';
      } else {
        // selectedPlan이 'end'인 경우
        return plan.plan_state === 'end';
      }
    })
    .filter((plan) => !plan.isDeleted);

  // 삭제된 계획

  // const deletePlanMutation = useMutation(async (planId: string) => {
  //   await deletePlan(planId);
  // });

  const handleDeletePlan = async (planId: string) => {
    try {
      const shouldDelete = window.confirm('정말로 삭제하시겠습니까?');

      if (shouldDelete) {
        await deletePlan(planId);

        setDeletedPlans([...deletedPlans, planId]);
      }
    } catch (error) {
      console.log('계획 삭제 오류', error);
      alert('계획 삭제 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    if (plansData != null) {
      setPlanningCount(
        plansData.filter((plan) => plan.plan_state === 'planning').length,
      );
      setEndCount(plansData.filter((plan) => plan.plan_state === 'end').length);

      setTravelingCount(
        plansData.filter((plan) => plan.plan_state === 'traveling').length,
      );
    }
  }, [plansData]);

  return (
    <div>
      <div className="flex flex-row mt-[4px]">
        <div
          className={`cursor-pointer ${
            selectedPlan === 'traveling' ? 'font-bold' : ''
          }`}
          onClick={() => {
            setSelectedPlan('traveling');
          }}
        >
          여행중 ({travelingCount})
        </div>
        <div> | </div>
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
          {selectedPlan === 'planning' ? (
            <div>
              <p>아직 예정된 여행 일정이 없으시군요!</p>
              <p>새로운 Tra-dule을 만들어보세요 :)</p>
            </div>
          ) : selectedPlan === 'traveling' ? (
            <div>
              <p>아직 여행중인 일정이 없으시군요!</p>
              <p>새로운 Tra-dule을 만들어보세요 :)</p>
            </div>
          ) : (
            <div>
              <p>다녀온 여행 일정이 없으시군요!</p>
              <p>새로운 Tra-dule을 만들어보세요 :)</p>
            </div>
          )}
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
                  className="flex bg-white mb-4  w-[800px] h-[150px] mt-[25px] shadow-lg"
                  onClick={() => {
                    navigate(`/plan/${plan.id}`);
                  }}
                >
                  <div className="w-1/5 h-12">
                    <Favorite
                      isFavorite={Boolean(isFavorite)}
                      planId={plan.id}
                      bookMarkId={
                        isFavorite?.id !== undefined ? isFavorite.id : ''
                      }
                    />
                    <div>
                      {plan.plan_state === 'end' ? null : plan.dates[0] ===
                        new Date().toISOString().split('T')[0] ? (
                        <span className="text-yellow">D-Day</span>
                      ) : (
                        <span className="text-yellow">
                          D-
                          {Math.ceil(
                            (new Date(plan.dates[0]).getTime() -
                              new Date().getTime()) /
                              (1000 * 60 * 60 * 24),
                          )}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="w-3/5 h-12">
                    <div className="flex">
                      {plan.title}
                      {plan.plan_state === 'planning' ? (
                        <div className="bg-yellow rounded-3xl w-[65px] h-[20px] text-[9px] flex-center font-normal text-white">
                          예정된 여행
                        </div>
                      ) : plan.plan_state === 'traveling' ? (
                        <div className="bg-blue rounded-3xl w-[65px] h-[20px] text-[9px] flex-center font-normal text-white">
                          여행중
                        </div>
                      ) : (
                        <div className="bg-orange rounded-3xl w-[65px] h-[20px] text-[9px] flex-center font-normal text-white">
                          다녀온 여행
                        </div>
                      )}
                    </div>
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

                  <div className="w-1/5 h-12 flex item-center justify-end">
                    <img
                      src={ic_delete_default_1x}
                      className="w-[20px] h-[20px] cursor-pointer"
                      onClick={async () => {
                        await handleDeletePlan(plan.id);
                        navigate('/main');
                      }}
                    />
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
