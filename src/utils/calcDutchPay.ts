import { calcCostAndInsertPlansEnding } from '@api/endingData';
import { getTotalCost } from '@api/plans';

export const calcDutchPay = async (planId: string, countPeople: number) => {
  try {
    const dailyPaySum = await calcCostAndInsertPlansEnding(planId);
    const endingTotalCost = await getTotalCost(planId);


    if (dailyPaySum === undefined || endingTotalCost === null) {
      return;
    }

    const totalPay = dailyPaySum.reduce((acc, val) => acc + val, 0);
    const perPersonCost = totalPay / countPeople;
    const remainingBudget = endingTotalCost - perPersonCost;

    return { remainingBudget, dailyPaySum, totalPay, perPersonCost };
  } catch (error) {
    console.error(error);
  }
};
