/* eslint-disable @typescript-eslint/no-invalid-void-type */
import React from 'react';

import { addBookMark, deleteBookMark } from '@api/bookMarks';
import IconFavoriteDefault from '@assets/icons/IconFavoriteDefault';
import IconFavoriteFill from '@assets/icons/IconFavoriteFill';
import { userStore } from '@store/userStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { type BookMarkType } from 'types/supabase';

interface FavoriteProps {
  planId: string;
  bookMarkId: string;
  isFavorite: boolean;
}

const Favorite: React.FC<FavoriteProps> = ({
  isFavorite,
  bookMarkId,
  planId /*, userId */,
}) => {
  const user = userStore.getState().user;
  const queryClient = useQueryClient();
  const userId = user?.id;

  const addMutation = useMutation<
    void,
    Error,
    BookMarkType,
    { previousData: BookMarkType[] | undefined }
  >(addBookMark, {
    onMutate: async (newBookMark: BookMarkType) => {
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
        console.log(err);
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

  const throttleAddMutaion = _.throttle((newBookMark: BookMarkType) => {
    addMutation.mutate(newBookMark);
  }, 250);

  const throttleDeleteMutaion = _.throttle((bookMarkId: string) => {
    deletemutaition.mutate(bookMarkId);
  }, 250);

  const favoriteHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();

    if (isFavorite) {
      throttleDeleteMutaion(bookMarkId);
    } else {
      if (userId !== undefined) {
        throttleAddMutaion({ plan_id: planId, user_id: userId });
      }
    }
  };

  return (
    // <button onClick={favoriteHandler} className="w-[30px] h-[30px]">
    //   <img
    //     className="w-[25px] h-[25px] cursor-pointer "
    //     src={isFavorite ? favoriteSolid : favoriteDefault}
    //     alt="Favorite Icon"
    //   />
    // </button>
    <button onClick={favoriteHandler} className="w-[30px] h-[30px]">
      {isFavorite ? (
        <IconFavoriteFill fill="#FFC803" />
      ) : (
        <IconFavoriteDefault fill="#E1E2E3" />
      )}
    </button>
  );
};

export default Favorite;
