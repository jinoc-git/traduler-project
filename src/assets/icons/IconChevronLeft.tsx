/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react';

import type IconType from 'types/icon';

const IconChevronLeft = ({ w, h, fill }: IconType) => {
  const width = `w-[${w as string}px]`;
  const height = `h-[${h as string}px]`;
  return (
    <svg
      width={w ?? '14'}
      height={h ?? '22'}
      viewBox={`0 0 ${w ?? '24'} ${h ?? '24'}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={w !== undefined && h !== undefined ? `${width} ${height}` : ''}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.38499 12L19 20.8021L17.0158 23L5 12L17.0158 1L19 3.19786L9.38499 12Z"
        fill={fill ?? 'black'}
        stroke={fill ?? 'black'}
      />
    </svg>
  );
};

export default IconChevronLeft;
