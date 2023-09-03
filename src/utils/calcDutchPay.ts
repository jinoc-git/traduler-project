import { calcCostAndInsertPlansEnding, getDates } from '@api/endingData';
import { getTotalCost } from '@api/plans';

export const calcDutchPay = async (planId: string, countPeople: number) => {
  try {
    const dailyPaySum = await calcCostAndInsertPlansEnding(planId);
    const endingTotalCost = await getTotalCost(planId);
    const dailyDates = await getDates(planId);

    console.log('하루 지출 비용 합산 배열:', dailyPaySum);

    if (dailyPaySum === undefined || endingTotalCost === null) {
      return;
    }

    const totalPay = dailyPaySum.reduce((acc, val) => acc + val, 0);
    const perPersonCost = totalPay / countPeople;
    const remainingBudget = endingTotalCost - perPersonCost;
    const datesAndPaySum = dailyDates.map((date, i) => ({
      [date]: dailyPaySum[i],
    }));

    console.log('예산:', endingTotalCost);
    console.log('초대 인원:', countPeople);
    console.log('총 비용:', totalPay);
    console.log('1인당 비용:', perPersonCost);
    console.log('남은 예산:', remainingBudget);
    console.log('날짜:', dailyDates);
    console.log('새로운 객체:', datesAndPaySum);
    return {
      remainingBudget,
      totalPay,
      perPersonCost,
      datesAndPaySum,
    };
  } catch (error) {
    console.error(error);
  }
};
