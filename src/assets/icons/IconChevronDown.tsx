/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react';

import type IconType from 'types/icon';

const IconChevronDown = ({ w, h, fill }: IconType) => {
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
        d="M12 14.615L20.8021 5L23 6.98416L12 19L1 6.98416L3.19786 5L12 14.615Z"
        fill="black"
        stroke={fill ?? 'black'}
      />
    </svg>
  );
};

export default IconChevronDown;
