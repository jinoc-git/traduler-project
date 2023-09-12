/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import IconDeleteDefault from '@assets/icons/IconDeleteDefault';
import BookMark from '@components/main/bookMark/BookMark';
import useConfirm from '@hooks/useConfirm';
import useQuitPlanMutation from '@hooks/useQuitPlanMutation';
import { usePlanStore } from '@store/usePlanStore';
import { userStore } from '@store/userStore';
import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import { formatPlanDates } from '@utils/changeFormatDay';
import { calculateDday } from '@utils/dateFormat';
import { type UsersDataList } from 'types/aboutPlan';
import { type BookMarkType, type PlanType } from 'types/supabase';

import CardAddNewPlan from './CardAddNewPlan';
import CardTabMenu from './CardTabMenu';
import CardUserList from './CardUserList';

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

  const user = userStore((state) => state.user);
  const { selectedPlan } = usePlanStore();

  const [planCount, setPlanCount] = useState<PlanCountList>({
    bookMark: 0,
    planning: 0,
    traveling: 0,
    end: 0,
  });

  const quitPlanMutation = useQuitPlanMutation(user?.id);
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
    if (user === null) return;
    
    const confTitle = '여행 삭제';
    const confDesc =
      '삭제한 여행은 다시 복구할 수 없습니다. 정말로 삭제하시겠습니까?';
    const confFunc = () => {
      quitPlanMutation.mutate({ planId, userId: user.id });
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
            <div key={uuid()}>
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
                  sm:w-[45px] sm:mt-[23px] 
                md:w-[80px] md:h-[16px] md:mt-[25px] md:ml-[28px]"
                >
                  <BookMark
                    isFavorite={Boolean(isFavorite)}
                    planId={plan.id}
                    bookMarkId={
                      isFavorite?.id !== undefined ? isFavorite.id : ''
                    }
                  />
                  <div className="mt-[0px] h-[12px]">
                    {plan.plan_state === 'end' ? null : (
                      <p
                        className="text-yellow text-center font-bold
                        sm:text-[10px] 
                      md:text-[18px] md:mt-[11px]"
                      >
                        {calculateDday(new Date(plan.dates[0]))}
                      </p>
                    )}
                  </div>
                </div>

                <div
                  className="sm:w-[238px] sm:h-2/3 sm:ml-[5px]
                md:w-4/5 md:h-[16px] md:items-center "
                >
                  <div
                    className="flex items-center 
                  sm:mt-[20px] 
                  md:mt-[22px]"
                  >
                    <p className="text-gray_dark_1 sm:text-sm md:text-xlg font-bold mr-[16px]">
                      {plan.title}
                    </p>
                    {plan.plan_state === 'planning' ? (
                      <div
                        className="flex-center text-white bg-yellow rounded-3xl 
                      sm:w-[65px] sm:h-[21px] sm:text-[10px] 
                      md:w-[72px] md:h-[26px] md:text-[12px]"
                      >
                        예정된 여행
                      </div>
                    ) : plan.plan_state === 'traveling' ? (
                      <div
                        className="flex-center font-normal text-white bg-blue rounded-3xl 
                      sm:w-[65px] sm:h-[21px] sm:text-[10px] 
                      md:w-[72px] md:h-[26px] md:text-[12px]"
                      >
                        여행중
                      </div>
                    ) : (
                      <div
                        className="flex-center font-normal text-white bg-orange rounded-3xl 
                      sm:w-[65px] sm:h-[21px] sm:text-[10px] 
                      md:w-[72px] md:h-[26px] md:text-[12px] "
                      >
                        다녀온 여행
                      </div>
                    )}
                  </div>
                  <div
                    className="text-gray_dark_1 font-semibold
                  sm:text-[10px] sm:mt-[5px] 
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
                  className="flex justify-center h-[16px]
                sm:w-[15px] sm:ml-[10px] sm:mr-[10px] sm:mt-[20px] 
                md:w-[80px] md:mr-[25px] md:mt-[22px]"
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
                      fill="#FFB979"
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
