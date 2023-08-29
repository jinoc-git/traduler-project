import { type PlanType } from 'types/supabase';

export const getKoreanDayOfWeek = (date: Date): string => {
  const daysInKorean = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = date.getDay();
  return daysInKorean[dayOfWeek];
};

// export const formatMonthDay = (date: string): string => {
//   const dates = new Date(date);
//   const year = dates.getFullYear();
//   const month = dates.getMonth() + 1;
//   const day = dates.getDate();
//   const koreanDayOfWeek = getKoreanDayOfWeek(dates);
//   return `${year}년 ${month}월 ${day}일 (${koreanDayOfWeek})`;
// };

export const formatMonthDay = (date: string): string => {
  const dates = new Date(date);
  const year = dates.getFullYear();
  const month = dates.getMonth() + 1;
  const day = dates.getDate();
  const koreanDayOfWeek = getKoreanDayOfWeek(dates);
  return `${year}년 ${month}월 ${day}일 (${koreanDayOfWeek})`;
};

// export const formatPlanDates = (
//   plan: PlanType,
// ): { startDate: string; endDate: string } => {
//   const startDate = formatMonthDay(plan.dates[0]);
//   const endDate = formatMonthDay(plan.dates[plan.dates.length - 1]);

//   return { startDate, endDate };
// };

export const formatPlanDates = (
  plans: PlanType[],
  // eslint-disable-next-line @typescript-eslint/array-type
): { startDate: string; endDate: string }[] => {
  return plans.map((plan) => {
    const startDate = formatMonthDay(plan.dates[0]);
    const endDate = formatMonthDay(plan.dates[plan.dates.length - 1]);

    // console.log('startDate=>', startDate);
    // console.log('startDate=>', endDate);
    return { startDate, endDate };
  });
};
