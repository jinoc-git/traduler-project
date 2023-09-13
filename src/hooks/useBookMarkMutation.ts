/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { toast } from 'react-toastify';

import { addBookMark, deleteBookMark } from '@api/bookMarks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { type InsertBookMarkType, type BookMarkType } from 'types/supabase';

interface UseBookMarkMutationReturnType {
  throttleAddMutaion: _.DebouncedFunc<
    (newBookMark: InsertBookMarkType) => void
  >;
  throttleDeleteMutaion: _.DebouncedFunc<(bookMarkId: string) => void>;
}

const useBookMarkMutation = (
  userId: string | undefined,
): UseBookMarkMutationReturnType => {
  const queryClient = useQueryClient();

  const addMutation = useMutation<
    void,
    Error,
    InsertBookMarkType,
    { previousData: BookMarkType[] | undefined }
  >(addBookMark, {
    onMutate: async (newBookMark: InsertBookMarkType) => {
      await queryClient.cancelQueries(['book_mark']);
      const previousData = queryClient.getQueryData<BookMarkType[]>([
        'book_mark',
        userId,
      ]);

      if (previousData !== undefined) {
        queryClient.setQueryData(
          ['book_mark', userId],
          [...previousData, newBookMark],
        );
      } else {
        queryClient.setQueryData(['book_mark', userId], [newBookMark]);
      }

      return { previousData };
    },
    onError: (err, newBookMark, context) => {
      if (err instanceof Error) {
        toast.error('즐겨찾기 오류가 발생했습니다.');
      }
      queryClient.setQueryData(['book_mark'], context?.previousData);
    },
    onSettled: () => {
      void queryClient.invalidateQueries(['book_mark']);
    },
  });

  const deletemutaition = useMutation<
    void,
    Error,
    string,
    { previousData: BookMarkType[] | undefined }
  >(deleteBookMark, {
    onMutate: async (bookMarkId: string) => {
      await queryClient.cancelQueries(['book_mark']);
      const previousData = queryClient.getQueryData<BookMarkType[]>([
        'book_mark',
        userId,
      ]);

      if (previousData !== undefined) {
        const newBookMarkList = previousData.filter(
          (item) => item.id !== bookMarkId,
        );
        queryClient.setQueryData(['book_mark', userId], newBookMarkList);
      }

      return { previousData };
    },
    onError: (err, variables, context) => {
      if (err instanceof Error) {
        console.log(err);
      }
      queryClient.setQueryData(['book_mark', userId], context?.previousData);
    },
    onSettled: () => {
      void queryClient.invalidateQueries(['book_mark']);
    },
  });

  const throttleAddMutaion = _.throttle((newBookMark: InsertBookMarkType) => {
    addMutation.mutate(newBookMark);
  }, 250);

  const throttleDeleteMutaion = _.throttle((bookMarkId: string) => {
    deletemutaition.mutate(bookMarkId);
  }, 250);

  return { throttleAddMutaion, throttleDeleteMutaion };
};

export default useBookMarkMutation;
