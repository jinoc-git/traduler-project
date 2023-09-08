/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { deletePlan } from '@api/plans';
import IconDeleteDefault from '@assets/icons/IconDeleteDefault';
import BookMark from '@components/main/bookMark/BookMark';
import useConfirm from '@hooks/useConfirm';
import { usePlanStore } from '@store/usePlanStore';
import { userStore } from '@store/userStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatPlanDates } from '@utils/changeFormatDay';
import { calculateDday } from '@utils/dateFormat';
import {
  type BookMarkType,
  type PlanType,
  type UserType,
} from 'types/supabase';

import CardAddNewPlan from './CardAddNewPlan';
import CardTabMenu from './CardTabMenu';
import CardUserList from './CardUserList';

type UsersDataList = Record<string, UserType[]>;

interface CardProps {
  bookMarkData: BookMarkType[];
  planDataList: PlanType[] | undefined;
  usersDataList: UsersDataList[];
}

export interface PlanCountList {
  planning: number;
  traveling: number;
  end: number;
}

const Card: React.FC<CardProps> = ({
  usersDataList,
  planDataList,
  bookMarkData,
}) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const user = userStore((state) => state.user);
  const { selectedPlan } = usePlanStore();

  const [planCount, setPlanCount] = useState<PlanCountList>({
    planning: 0,
    traveling: 0,
    end: 0,
  });

  const deletePlanMutation = useMutation(deletePlan, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['plan_mates', user?.id]);
    },
    onError: () => {
      toast.error('계획 삭제 중 오류가 발생했습니다.');
    },
  });

  const filteredData = planDataList
    ?.filter((plan) => {
      if (selectedPlan === 'end') {
        return (
          (plan.plan_state === selectedPlan && !plan.isDeleted) ||
          (plan.plan_state === 'recording' && !plan.isDeleted)
        );
      }
      return plan.plan_state === selectedPlan && !plan.isDeleted;
    })
    ?.sort(
      (a, b) => new Date(a.dates[0]).getTime() - new Date(b.dates[0]).getTime(),
    );

  const { confirm } = useConfirm();

  const handleDeletePlan = (planId: string) => {
    const confTitle = '여행 삭제';
    const confDesc =
      '삭제한 여행은 다시 복구할 수 없습니다. 정말로 삭제하시겠습니까?';

    const confFunc = () => {
      deletePlanMutation.mutate(planId);
    };

    confirm.delete(confTitle, confDesc, confFunc);
  };

  const onClickListItem = (state: string, id: string) => {
    if (state === 'planning') navigate(`/plan/${id}`);
    if (state === 'traveling') navigate(`/plan/${id}`);
    if (state === 'recording') navigate(`/addPhoto/${id}`);
    if (state === 'end') navigate(`/ending/${id}`);
  };

  useEffect(() => {
    if (planDataList != null) {
      setPlanCount({
        planning: planDataList.filter((plan) => plan.plan_state === 'planning')
          .length,
        traveling: planDataList.filter(
          (plan) => plan.plan_state === 'traveling',
        ).length,
        end: planDataList.filter(
          (plan) =>
            plan.plan_state === 'end' || plan.plan_state === 'recording',
        ).length,
      });
    }
  }, [planDataList]);

  return (
    <div>
      <CardTabMenu planCount={planCount} />
      {filteredData?.length === 0 ? (
        <CardAddNewPlan />
      ) : (
        filteredData?.map((plan) => {
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
                className="flex bg-white mb-4  sm:w-[320px] sm:h-[100px] sm:mt-[16px] md:w-[800px] md:h-[150px] md:mt-[24px] shadow-card rounded-[7px] cursor-pointer"
                onClick={() => {
                  onClickListItem(plan.plan_state, plan.id);
                }}
              >
                <div className="md:w-1/5 md:h-[16px] md:mt-[22px] md:ml-[28px]">
                  <BookMark
                    isFavorite={Boolean(isFavorite)}
                    planId={plan.id}
                    bookMarkId={
                      isFavorite?.id !== undefined ? isFavorite.id : ''
                    }
                  />
                  <div className="mt-[8px]">
                    {plan.plan_state === 'end' ? null : (
                      <span className="text-yellow sm:text-[10px] md:text-[18px]">
                        {calculateDday(new Date(plan.dates[0]))}
                      </span>
                    )}
                  </div>
                </div>

                <div className="sm:w-[282px] sm:h-[52px] md:w-3/5 md:h-[16px]">
                  <div className="flex items-center sm:mt-[24px] md:mt-[22px]">
                    <p className="text-gray_dark_1 sm:text-sm md:text-xlg md:font-bold mr-[16px]">
                      {plan.title}
                    </p>
                    {plan.plan_state === 'planning' ? (
                      <div className="bg-yellow rounded-3xl sm:w-[50px] sm:h-[16px] sm:text-[8px] md:w-[72px] md:h-[26px] md:text-[12px] flex-center font-normal text-white ">
                        예정된 여행
                      </div>
                    ) : plan.plan_state === 'traveling' ? (
                      <div className="bg-blue rounded-3xl sm:w-[50px] sm:h-[16.8px] sm:text-[8px] md:w-[72px] md:h-[26px] md:text-[12px] flex-center font-normal text-white">
                        여행중
                      </div>
                    ) : (
                      <div className="bg-orange rounded-3xl sm:w-[50px] sm:h-[16.8px] sm:text-[8px] md:w-[72px] md:h-[26px] md:text-[12px] flex-center font-normal text-white">
                        다녀온 여행
                      </div>
                    )}
                  </div>
                  <div className="text-gray_dark_1 sm:text-[10px] sm:mt-[4px] md:text-lg md:mt-[8px]">
                    {startDate}~{endDate} {plan.dates.length - 1}박{' '}
                    {plan.dates.length}일
                  </div>
                  <CardUserList
                    participantsAvatarList={participantsAvatarList}
                    participantsNicknameList={participantsNicknameList}
                  />
                </div>

                <div className="w-1/5 h-[16px] flex item-center justify-end mr-[25px] mt-[22px]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePlan(plan.id);
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
