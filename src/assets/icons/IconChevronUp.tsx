import React from 'react';

import type IconType from 'types/icon';

const IconChevronUp = ({ w, h, fill }: IconType) => {
  return (
    <svg
      width="14"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${w} ${h}`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 9.38499L3.19786 19L1 17.0158L12 5L23 17.0158L20.8021 19L12 9.38499Z"
        fill="black"
        stroke={fill ?? 'black'}
      />
    </svg>
  );
};

export default IconChevronUp;
