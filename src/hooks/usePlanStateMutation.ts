import { toast } from 'react-toastify';

import { changePlanState, updatePlan } from '@api/plans';
import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

interface UserPlanStateMutationReturnType {
  editMutate: UseMutateFunction<
    void,
    unknown,
    [string, string, string],
    unknown
  >;
  changeStateMutate: UseMutateFunction<void, unknown, any, unknown>;
}

const usePlanStateMutation = (
  planId: string,
  userId: string | undefined,
): UserPlanStateMutationReturnType=> {
  const queryClient = useQueryClient();

  const { mutate: editMutate } = useMutation({
    mutationFn: async ([planId, title, cost]: [string, string, string]) => {
      await updatePlan(planId, title, cost);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['plan', planId] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('계획 수정하기 오류 발생');
    },
  });

  const { mutate: changeStateMutate } = useMutation({
    mutationFn: changePlanState,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['plan', planId] });
      void queryClient.invalidateQueries({
        queryKey: ['plan_mates', userId],
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error('오류 발생');
    },
  });

  return { editMutate, changeStateMutate };
};

export default usePlanStateMutation;
