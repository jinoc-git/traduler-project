import { type UsersDataList } from 'types/aboutPlan';
import { type PlanType } from 'types/supabase';

export const withPlanId = {
  user: (planId: string) => (item: UsersDataList) => {
    return !Object.keys(item).includes(planId);
  },
  plan: (planId: string) => (plan: PlanType) => plan.id !== planId,
};
