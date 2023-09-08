/* eslint-disable @typescript-eslint/no-invalid-void-type */
import React from 'react';

import IconFavoriteDefault from '@assets/icons/IconFavoriteDefault';
import IconFavoriteFill from '@assets/icons/IconFavoriteFill';
import useBookMarkMutation from '@hooks/useBookMarkMutation';
import { userStore } from '@store/userStore';

interface BookMarkProps {
  planId: string;
  bookMarkId: string;
  isFavorite: boolean;
}

const BookMark: React.FC<BookMarkProps> = ({
  isFavorite,
  bookMarkId,
  planId,
}) => {
  const user = userStore((state) => state.user);
  const userId = user?.id;

  const { throttleAddMutaion, throttleDeleteMutaion } =
    useBookMarkMutation(userId);

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
    <button onClick={favoriteHandler} className="w-[30px] h-[30px]">
      {isFavorite ? (
        <IconFavoriteFill w="w-[24px]" h="h-[24px]" fill="#FFC803" />
      ) : (
        <IconFavoriteDefault w="w-[24px]" h="h-[24px]" fill="#E1E2E3" />
      )}
    </button>
  );
};

export default BookMark;
