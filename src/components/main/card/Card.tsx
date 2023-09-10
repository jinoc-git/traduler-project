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
  bookMark: number;
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
    bookMark: 0,
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
  const bookMarkPlanIdList = bookMarkData.map((bookMark) => bookMark.plan_id);

  const filteredData = planDataList
    ?.filter((plan) => {
      if (selectedPlan === 'bookMark') {
        return bookMarkPlanIdList.find((id) => id === plan.id);
      }
      if (selectedPlan === 'end') {
        return (
          (plan.plan_state === selectedPlan && !plan.isDeleted) ||
          (plan.plan_state === 'recording' && !plan.isDeleted)
        );
      }
      return plan.plan_state === selectedPlan && !plan.isDeleted;
    })
    ?.sort((a, b) => {
      if (selectedPlan === 'bookMark') {
        const bookMarkA = bookMarkData.find(
          (bookMark) => bookMark.plan_id === a.id,
        )!;
        const bookMarkB = bookMarkData.find(
          (bookMark) => bookMark.plan_id === b.id,
        )!;
        return (
          new Date(bookMarkA.created_at!).getTime() -
          new Date(bookMarkB.created_at!).getTime()
        );
      }
      return new Date(a.dates[0]).getTime() - new Date(b.dates[0]).getTime();
    });

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
        bookMark: bookMarkData.length,
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
  }, [planDataList, bookMarkData]);

  return (
    <div className="flex flex-col gap-[16px]">
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
            <div key={plan.id}>
              <div
                className="flex bg-white shadow-card rounded-[7px] cursor-pointer
                sm:w-[318px] sm:h-[80px] sm:mx-[1px]
                md:w-[800px] md:h-[150px] "
                onClick={() => {
                  onClickListItem(plan.plan_state, plan.id);
                }}
              >
                <div
                  className="
                  sm:w-[20px] sm:mt-[20px] sm:ml-[15px] 
                md:w-1/5 md:h-[16px] md:mt-[22px] md:ml-[28px]"
                >
                  <BookMark
                    isFavorite={Boolean(isFavorite)}
                    planId={plan.id}
                    bookMarkId={
                      isFavorite?.id !== undefined ? isFavorite.id : ''
                    }
                  />
                  <div className="mt-[7px] h-[12px]">
                    {plan.plan_state === 'end' ? null : (
                      <p
                        className="text-yellow text-center font-bold
                        sm:text-[10px] 
                      md:text-[18px]"
                      >
                        {calculateDday(new Date(plan.dates[0]))}
                      </p>
                    )}
                  </div>
                </div>

                <div
                  className="sm:w-[2100px] sm:h-2/3 sm:mx-[15px]
                md:w-3/5 md:h-[16px]"
                >
                  <div
                    className="flex items-center 
                  sm:mt-[12px] 
                  md:mt-[22px]"
                  >
                    <p className="text-gray_dark_1 sm:text-sm md:text-xlg font-bold mr-[16px]">
                      {plan.title}
                    </p>
                    {plan.plan_state === 'planning' ? (
                      <div
                        className="flex-center text-white bg-yellow rounded-3xl 
                      sm:w-[50px] sm:h-[16px] sm:text-[8px] 
                      md:w-[72px] md:h-[26px] md:text-[12px]"
                      >
                        예정된 여행
                      </div>
                    ) : plan.plan_state === 'traveling' ? (
                      <div
                        className="flex-center font-normal text-white bg-blue rounded-3xl 
                      sm:w-[50px] sm:h-[16.8px] sm:text-[8px] 
                      md:w-[72px] md:h-[26px] md:text-[12px]"
                      >
                        여행중
                      </div>
                    ) : (
                      <div
                        className="flex-center font-normal text-white bg-orange rounded-3xl 
                      sm:w-[50px] sm:h-[16.8px] sm:text-[8px] 
                      md:w-[72px] md:h-[26px] md:text-[12px] "
                      >
                        다녀온 여행
                      </div>
                    )}
                  </div>
                  <div
                    className="text-gray_dark_1 font-semibold
                  sm:text-[10px] sm:mt-[0px] 
                  md:text-lg md:mt-[8px]"
                  >
                    {startDate}~{endDate} {plan.dates.length - 1}박{' '}
                    {plan.dates.length}일
                  </div>
                  <CardUserList
                    participantsAvatarList={participantsAvatarList}
                    participantsNicknameList={participantsNicknameList}
                  />
                </div>

                <div
                  className="flex h-[16px]
                sm:w-[15px] sm:mr-[18px] sm:mt-[14px] 
                md:w-1/5 md:mr-[25px] md:mt-[22px]"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePlan(plan.id);
                    }}
                  >
                    <IconDeleteDefault
                      w="w-[24px]"
                      h="h-[24px]"
                      fill="#E1E2E3"
                    />
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
