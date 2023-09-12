/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { toast } from 'react-toastify';

import { quitPlan } from '@api/plans';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { withPlanId } from '@utils/filterFunctions';
import { type QuitPlanParam, type UserAndPlanList } from 'types/aboutPlan';

const useQuitPlanMutation = (userId: string | undefined) => {
  const queryClient = useQueryClient();

  const quitPlanMutation = useMutation<
    void,
    Error,
    QuitPlanParam,
    { previousData: UserAndPlanList | undefined }
  >(quitPlan, {
    onMutate: async ({ userId, planId }) => {
      await queryClient.cancelQueries(['plan_mates']);

      const previousData = queryClient.getQueryData<UserAndPlanList>([
        'plan_mates',
        userId,
      ]);

      if (previousData !== undefined) {
        const newData = {
          planDataList: previousData.planDataList.filter(
            withPlanId.plan(planId),
          ),
          usersDataList: previousData.usersDataList.filter(
            withPlanId.user(planId),
          ),
        };
        queryClient.setQueryData(['plan_mates', userId], newData);
      } else {
        queryClient.setQueryData(['plan_mates', userId], {
          planDataList: [],
          usersDataList: [],
        });
      }
      return { previousData };
    },
    onError: (err, params, context) => {
      if (err instanceof Error) {
        toast.error('계획 나가기 오류가 발생했습니다.');
      }
      queryClient.setQueryData(['plan_mates', userId], context?.previousData);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(['plan_mates']);
      await queryClient.invalidateQueries(['planMates']);
      await queryClient.invalidateQueries(['book_mark']);
    },
  });

  return quitPlanMutation;
};

export default useQuitPlanMutation;
