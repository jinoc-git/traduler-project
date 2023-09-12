/* eslint-disable @typescript-eslint/no-invalid-void-type */
import React from 'react';

import IconFavoriteDefault from '@assets/icons/IconFavoriteDefault';
import IconFavoriteFill from '@assets/icons/IconFavoriteFill';
import useBookMarkMutation from '@hooks/useBookMarkMutation';
import { userStore } from '@store/userStore';

interface BookMarkProps {
  planId: string;
  bookMarkId: string;
  isBookMark: boolean;
}

const BookMark: React.FC<BookMarkProps> = ({
  isBookMark,
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

    if (isBookMark) {
      throttleDeleteMutaion(bookMarkId);
    } else {
      if (userId !== undefined) {
        throttleAddMutaion({ plan_id: planId, user_id: userId });
      }
    }
  };

  return (
    <button
      onClick={favoriteHandler}
      className="flex justify-center 
      sm:w-[21px] sm:h-[21px] sm:ml-[11px] 
      md:w-[30px] md:h-[30px] md:ml-[20px]"
    >
      {isBookMark ? (
        <IconFavoriteFill w="w-[24px]" h="h-[24px]" fill="#FFC803" />
      ) : (
        <IconFavoriteDefault w="w-[24px]" h="h-[24px]" fill="#E1E2E3" />
      )}
    </button>
  );
};

export default BookMark;
