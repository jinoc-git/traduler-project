import { calcCostAndInsertPlansEnding, getDates } from '@api/endingData';
import { getTotalCost } from '@api/plans';

export const calcDutchPay = async (planId: string, countPeople: number) => {
  try {
    const dailyPaySum = await calcCostAndInsertPlansEnding(planId);
    const endingTotalCost = await getTotalCost(planId);
    const dailyDates = await getDates(planId);

    if (dailyPaySum === undefined || endingTotalCost === null) {
      return;
    }

    const totalPay = dailyPaySum.reduce((acc, val) => acc + val, 0);
    const remainingBudget = Math.floor(endingTotalCost - totalPay);
    const perPersonCost = Math.floor(remainingBudget / countPeople);
    const datesAndPaySum = dailyDates.map((date, i) => ({
      [date]: dailyPaySum[i],
    }));

    return {
      remainingBudget,
      dailyPaySum,
      totalPay,
      perPersonCost,
      datesAndPaySum,
    };
  } catch (error) {
    console.error(error);
  }
};
