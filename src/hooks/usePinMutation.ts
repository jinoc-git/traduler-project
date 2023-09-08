import { type PinContentsType, deletePin, changeOrderPins } from '@api/pins';
import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import _ from 'lodash';

interface UsePinMutationReturnType {
  deleteMutation: UseMutateFunction<
    void,
    unknown,
    [string, string, PinContentsType[]],
    unknown
  >;
  debounceNewOrderMutaion: _.DebouncedFunc<
    ([date, planId, newOrder]: [string, string, PinContentsType[]]) => void
  >;
}

const usePinMutation = (
  planId: string,
  currentPage: number,
): UsePinMutationReturnType => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async ([date, planId, deletedPin]: [
      string,
      string,
      PinContentsType[],
    ]) => {
      await deletePin(date, planId, deletedPin);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['pin', planId, currentPage],
      });
    },
  });

  const newOrderMutaion = useMutation({
    mutationFn: async ([date, planId, newOrder]: [
      string,
      string,
      PinContentsType[],
    ]) => {
      await changeOrderPins(date, planId, newOrder);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['pin', planId, currentPage],
      });
    },
  });

  const debounceNewOrderMutaion = _.debounce(
    ([date, planId, newOrder]: [string, string, PinContentsType[]]) => {
      newOrderMutaion.mutate([date, planId, newOrder]);
    },
    350,
  );

  return { deleteMutation: mutate, debounceNewOrderMutaion };
};

export default usePinMutation;
