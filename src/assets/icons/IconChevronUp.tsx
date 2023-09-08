/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react';

import type IconType from 'types/icon';

const IconChevronUp = ({ w, h, fill }: IconType) => {
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
        d="M12 9.38499L3.19786 19L1 17.0158L12 5L23 17.0158L20.8021 19L12 9.38499Z"
        fill="black"
        stroke={fill ?? 'black'}
      />
    </svg>
  );
};

export default IconChevronUp;
