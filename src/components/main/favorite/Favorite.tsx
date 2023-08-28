import React, { useState } from 'react';

import favoriteDefault from '@assets/icons/1x/ic-favorite-default-1x.png';
import favoriteSolid from '@assets/icons/1x/ic-favorite-solid-1x.png';

interface FavoriteProps {
  isFavorite: boolean;
}

const Favorite: React.FC<FavoriteProps> = ({ isFavorite }) => {
  const [status, setStatus] = useState(isFavorite);

  const favoriteHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    if (isFavorite) {
      console.log('ㅋㅋㅋㅋㅋ');
    } else {
      console.log('ㅎㅎㅎㅎㅎ');
    }
    setStatus((prev) => !prev);
  };

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
