import { calcCostAndInsertPlansEnding } from '@api/endingData';
import { getTotalCost } from '@api/plans';
import { useQueryClient } from '@tanstack/react-query';
import { type UserType } from 'types/supabase';

export const calcDutchPay = async (planId: string, userId: string) => {
  const queryClient = useQueryClient();

  try {
    const dailyPaySum = await calcCostAndInsertPlansEnding(planId);
    const endingTotalCost = await getTotalCost(userId);
    const invitePeople = queryClient.getQueryData<UserType[]>([
      'planMates',
      planId,
    ]);

    console.log('invitePeople: ', invitePeople);
    console.log('하루 지출 비용 합산 배열:', dailyPaySum);

    if (
      dailyPaySum === undefined ||
      invitePeople === undefined ||
      endingTotalCost === null
    ) {
      return;
    }

    const totalCost = dailyPaySum.reduce((acc, val) => acc + val, 0);
    const perPersonCost = totalCost / invitePeople.length;
    const remainingBudget = endingTotalCost - perPersonCost;

    console.log('예산:', endingTotalCost);
    console.log('초대 인원:', invitePeople.length);
    console.log('총 비용:', totalCost);
    console.log('1인당 비용:', perPersonCost);
    console.log('남은 예산:', remainingBudget);

    return remainingBudget;
  } catch (error) {
    console.error(error);
  }
};
