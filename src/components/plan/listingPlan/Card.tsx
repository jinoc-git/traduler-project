/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { deletePlan } from '@api/plans';
import IconAdd from '@assets/icons/IconAdd';
import IconDeleteDefault from '@assets/icons/IconDeleteDefault';
import IconUserDefault from '@assets/icons/IconUserDefault';
import { defaultMainPlan } from '@assets/index';
import Favorite from '@components/main/favorite/Favorite';
import useConfirm from '@hooks/useConfirm';
import { usePlanStore } from '@store/usePlanStore';
import { userStore } from '@store/userStore';
import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatPlanDates } from '@utils/changeFormatDay';
import { calculateDday } from '@utils/dateFormat';
import {
  type PlanType,
  type BookMarkType,
  type UserType,
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

  const queryClient = useQueryClient();
  const user = userStore((state) => state.user);

  const [planningCount, setPlanningCount] = useState<number>(0);
  const [endCount, setEndCount] = useState<number>(0);
  const [travelingCount, setTravelingCount] = useState<number>(0);
  const [deletedPlans, setDeletedPlans] = useState<string[]>([]);
  const [hovered, setHovered] = useState(false);

  // 전역상태관리
  const { selectedPlan, setSelectedPlan } = usePlanStore();

  // deletePlan mutation 함수정의
  const deletePlanMutation = useMutation(deletePlan, {
    onSuccess: () => {
      queryClient.invalidateQueries(['plan_mates', user?.id]);
    },
  });

  const filterData = plansData
    ?.filter((plan) => {
      if (selectedPlan === 'traveling') {
        return plan.plan_state === 'traveling';
      } else if (selectedPlan === 'planning') {
        return plan.plan_state === 'planning';
      } else {
        // selectedPlan이 'end'인 경우
        return plan.plan_state === 'end' || plan.plan_state === 'recording';
      }
    })
    .filter((plan) => !plan.isDeleted);

  // 삭제된 계획
  const { confirm } = useConfirm();

  const handleDeletePlan = async (planId: string) => {
    try {
      const confTitle = '여행 삭제';
      const confDesc =
        '삭제한 여행은 다시 복구할 수 없습니다. 정말로 삭제하시겠습니까?';
      const confFunc = () => {
        deletePlanMutation.mutate(planId);
      };
      confirm.delete(confTitle, confDesc, confFunc);
      setDeletedPlans(() => [...deletedPlans, planId]);
    } catch (error) {
      alert('계획 삭제 중 오류가 발생했습니다.');
    }
  };

  const onClickListItem = (state: string, id: string) => {
    if (state === 'planning') navigate(`/plan/${id}`);
    if (state === 'traveling') navigate(`/plan/${id}`);
    if (state === 'recording') navigate(`/addPhoto/${id}`);
    if (state === 'end') navigate(`/ending/${id}`);
  };

  useEffect(() => {
    if (plansData != null) {
      setPlanningCount(
        plansData.filter((plan) => plan.plan_state === 'planning').length,
      );
      setEndCount(
        plansData.filter(
          (plan) =>
            plan.plan_state === 'end' || plan.plan_state === 'recording',
        ).length,
      );

      setTravelingCount(
        plansData.filter((plan) => plan.plan_state === 'traveling').length,
      );
    }
  }, [plansData]);

  return (
    <div>
      <div className="flex flex-row mt-[4px] justify-center">
        <div
          className={`cursor-pointer mr-[25px] text-white hover:text-yellow_light_2 ${
            selectedPlan === 'traveling' ? 'text-yellow_light_2' : 'text-white'
          }`}
          onClick={() => {
            setSelectedPlan('traveling');
          }}
        >
          여행중 ({travelingCount})
        </div>
        <div> | </div>
        <div
          className={`cursor-pointer ml-[25px] mr-[25px] text-white hover:text-yellow_light_2 ${
            selectedPlan === 'planning' ? 'text-yellow_light_2' : 'text-white'
          }`}
          onClick={() => {
            setSelectedPlan('planning');
          }}
        >
          예정된 여행 ({planningCount})
        </div>
        <div> | </div>
        <div
          className={`cursor-pointer ml-[25px] text-white hover:text-yellow_light_2 ${
            selectedPlan === 'end' ? 'text-yellow_light_2' : 'text-white'
          }`}
          onClick={() => {
            setSelectedPlan('end');
          }}
        >
          다녀온 여행 ({endCount})
        </div>
      </div>
      {filterData?.length === 0 ? (
        <div className="flex flex-col items-center mt-[125px]">
          <div>
            <img
              src={defaultMainPlan}
              alt="사진"
              className="w-[125px] h-[100px]"
            />
          </div>
          {selectedPlan === 'planning' ? (
            <div className="mt-[12px]">
              <p>아직 예정된 여행 일정이 없으시군요!</p>
              <p>새로운 Tra-duler을 만들어보세요 :)</p>
            </div>
          ) : selectedPlan === 'traveling' ? (
            <div className="mt-[12px]">
              <p>여행중인 일정이 없으시군요!</p>
              <p>새로운 Tra-duler을 만들어보세요 :)</p>
            </div>
          ) : (
            <div className="mt-[12px]">
              <p>다녀온 여행 일정이 없으시군요!</p>
              <p>새로운 Tra-duler을 만들어보세요 :)</p>
            </div>
          )}
          <div>
            <button
              className={`mt-[35px] ml-auto w-[160px] h-[45px] border border-black rounded-[7px] flex items-center justify-center 
          ${
            hovered
              ? 'bg-white text-black hover:bg-blue_dark hover:text-blue_dark border-none'
              : 'border border-black'
          }`}
              onMouseEnter={() => {
                setHovered(true);
              }}
              onMouseLeave={() => {
                setHovered(false);
              }}
              onClick={() => {
                navigate('/addPlan');
              }}
            >
              <IconAdd w="16" h="16" fill={hovered ? 'white' : 'black'} />

              <span
                className={`ml-[10px] ${hovered ? 'text-white' : 'text-black'}`}
              >
                여행 생성하기
              </span>
            </button>
          </div>
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
              <div key={plan.id} className="mt-[16px]">
                <div
                  className="flex bg-white mb-4  w-[800px] h-[150px] mt-[24px] shadow-card rounded-[7px] cursor-pointer"
                  onClick={() => {
                    onClickListItem(plan.plan_state, plan.id);
                  }}
                >
                  <div className="w-1/5 h-[16px] mt-[22px] ml-[28px]">
                    <Favorite
                      isFavorite={Boolean(isFavorite)}
                      planId={plan.id}
                      bookMarkId={
                        isFavorite?.id !== undefined ? isFavorite.id : ''
                      }
                    />
                    <div className="mt-[8px]">
                      {plan.plan_state === 'end' ? null : (
                        <span className="text-yellow">
                          {calculateDday(new Date(plan.dates[0]))}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="w-3/5 h-[16px]">
                    <div className="flex items-center mt-[22px]">
                      <div className="text-gray_dark_1 text-xlg mr-[16px]">
                        {plan.title}
                      </div>
                      {plan.plan_state === 'planning' ? (
                        <div className="bg-yellow rounded-3xl w-[65px] h-[20px] text-[9px] flex-center font-normal text-white ">
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
                    <div className="text-gray_dark_1 text-lg mt-[8px]">
                      {startDate}~{endDate} {plan.dates.length - 1}박{' '}
                      {plan.dates.length}일
                    </div>
                    <div className="flex gap-3 mt-[8px]">
                      <div className="flex">
                        {participantsAvatarList.map((avatar, i) => {
                          let gap = '';
                          if (i > 0) {
                            gap = '-ml-[8px]';
                          }

                          return avatar ? (
                            <img
                              key={uuid()}
                              src={avatar}
                              alt="유저아바타"
                              className={`w-[20px] h-[20px] rounded-full ${gap} border border-[#979797] object-cover `}
                            />
                          ) : (
                            <div
                              className={`rounded-full ${gap} border border-[#979797] `}
                              key={uuid()}
                            >
                              <IconUserDefault w={'20'} h={'20'} />
                            </div>
                          );
                        })}
                      </div>
                      <div className='"text-gray_dark_1 text-sm'>
                        {participantsNicknameList.length <= 3 ? (
                          participantsNicknameList
                            .map((name) => `${name}`)
                            .join(', ')
                        ) : (
                          <>
                            {participantsNicknameList.slice(0, 3).join(', ')} 외{' '}
                            {participantsNicknameList.length - 3}명
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="w-1/5 h-[16px] flex item-center justify-end mr-[25px] mt-[22px]">
                    <button
                      onClick={async () => {
                        await handleDeletePlan(plan.id);
                        navigate('/main');
                      }}
                    >
                      <IconDeleteDefault fill="#E1E2E3" />
                    </button>
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
