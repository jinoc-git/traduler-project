/* eslint-disable @typescript-eslint/no-invalid-void-type */
import React, { useState } from 'react';

import { addBookMark } from '@api/bookMarks';
import favoriteDefault from '@assets/icons/1x/ic-favorite-default-1x.png';
import favoriteSolid from '@assets/icons/1x/ic-favorite-solid-1x.png';
import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface FavoriteProps {
  planId: string;
  userId: string;
  isFavorite: boolean;
}

const Favorite: React.FC<FavoriteProps> = ({
  isFavorite,
  planId /*, userId */,
}) => {
  const [status, setStatus] = useState(isFavorite);
  const queryClient = useQueryClient();
  const userId = '02c05284-bfe4-41c9-b7aa-2709b2cf771b';
  const newBookMarkId = uuid();

  const addFavorite = () => {
    setStatus(true);
  };

  const addMutation = useMutation<
    void,
    Error,
    // 뮤테이트에 전달할 인자는 뭐지 ?
    { previousData: addFavorite[] | undefined }
  >(addFavorite, {
    onMutate: async (/* 뭐가 들어감?;; */) => {
      await queryClient.cancelQueries(['book_mark']);
      console.log('onMutate 호출');
      const previousData = queryClient.getQueryData<book_mark[]>(['book_mark']);
      setStatus(true);

      const newData = [...previousData, { id: newBookMarkId }];

      queryClient.setQueryData(['book_mark'], newData);

      await addBookMark(newBookMarkId, userId, planId);

      return { previousData };
    },

    onError: (err, newFavorite, context) => {
      queryClient.setQueryData(['book_mark'], context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['book_mark']);
    },
  });

  // const deletemutaition = useMutation<void, Error>(
  //   async () => {
  //     await deleteBookMark();
  //   },
  //   {
  //     onMutate: async () => {
  //       setStatus(false);

  //       await queryClient.cancelQueries(['book_mark']);
  //       const previousData = queryClient.getQueriesData(['book_mark']);
  //       queryClient.setQueriesData(
  //         ['book_mark'],
  //         previousData.filter((item) => item.id !== planId),
  //       );
  //       return { previousData };
  //     },
  //     onError: (err, variables, context) => {
  //       queryClient.setQueriesData(queryKey, context?.previousData);
  //     },
  //     onSettled: () => {
  //       console.log('onSetteled');
  //       queryClient.invalidateQueries(['book_mark']);
  //     },
  //   },
  // );

  const favoriteHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();

    // if (status) {
    //   await deletemutaition.mutateAsync();

    //   console.log('deletemutation 동작');
    // } else {
    //   await addMutation.mutateAsync();
    //   console.log('addMutation 동작');
    // }
    setStatus((prev) => !prev);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   addMutation.mutate({});
  // }
  return (
    <button onClick={favoriteHandler}>
      <img
        className="cursor-pointer w- h-4"
        src={status ? favoriteSolid : favoriteDefault}
        alt="Favorite Icon"
      />
    </button>
  );
};

export default Favorite;
