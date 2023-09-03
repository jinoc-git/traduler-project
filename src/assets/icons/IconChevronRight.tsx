/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react';

import type IconType from 'types/icon';

const IconChevronRight = ({ w, h, fill }: IconType) => {
  return (
    <svg
      width={w ?? '14'}
      height={h ?? '22'}
      viewBox={`0 0 ${w ?? '24'} ${h ?? '25'}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.615 12L5 3.19786L6.98416 1L19 12L6.98416 23L5 20.8021L14.615 12Z"
        fill={fill ?? 'black'}
        stroke={fill ?? 'black'}
      />
    </svg>
  );
};

export default IconChevronRight;
