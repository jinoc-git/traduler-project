import React from 'react';

import type IconType from 'types/icon';

const IconChevronDown = ({ w, h, fill }: IconType) => {
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
        d="M12 14.615L20.8021 5L23 6.98416L12 19L1 6.98416L3.19786 5L12 14.615Z"
        fill="black"
        stroke={fill ?? 'black'}
      />
    </svg>
  );
};

export default IconChevronDown;
