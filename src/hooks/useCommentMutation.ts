import { toast } from 'react-toastify';

import { addComment, deleteComment } from '@api/commets';
import {
  type UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { type CommentsType } from 'types/supabase';

interface UseCommentMutationReturnType {
  addMutate: UseMutateFunction<void, unknown, CommentsType, unknown>;
  deleteMutate: UseMutateFunction<void, unknown, string, unknown>;
}

const useCommentMutation = (planId: string): UseCommentMutationReturnType => {
  const queryClient = useQueryClient();

  const { mutate: addMutate } = useMutation({
    mutationFn: addComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['comments', planId]);
    },
    onError: () => {
      toast.error('댓글 작성에 실패했습니다.');
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['comments', planId]);
    },
    onError: () => {
      toast.error('댓글 삭제에 실패했습니다.');
    },
  });

  return { addMutate, deleteMutate };
};

export default useCommentMutation;
