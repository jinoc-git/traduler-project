/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react';

import type IconType from 'types/icon';

const IconLocked = ({ w, h, fill }: IconType) => {
  const width = `w-[${w as string}px]`;
  const height = `h-[${h as string}px]`;

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={w !== undefined && h !== undefined ? `${width} ${height}` : ''}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 8H0V24H24V8H20V4C20 1.79086 18.2091 0 16 0H8C5.79086 0 4 1.79086 4 4V8ZM6 4C6 2.89543 6.89543 2 8 2H16C17.1046 2 18 2.89543 18 4V8H6V4ZM15 15C15 16.3062 14.1652 17.4175 13 17.8293V20H11V17.8293C9.83481 17.4175 9 16.3062 9 15C9 13.3431 10.3431 12 12 12C13.6569 12 15 13.3431 15 15Z"
        fill="#828282"
      />
    </svg>
  );
};

export default IconLocked;
