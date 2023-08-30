/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react';

import type IconType from 'types/icon';

const IconMicroMenu = ({ w, h, fill }: IconType) => {
  return (
    <svg
      width={w || '24'}
      height={h || '24'}
      viewBox={`0 0 ${w || '24'} ${h || '24'}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 22V18H14V22H10Z" fill={fill || 'black'} />
      <path d="M10 14L10 10H14L14 14H10Z" fill={fill || 'black'} />
      <path d="M10 2V6H14V2L10 2Z" fill={fill || 'black'} />
    </svg>
  );
};

export default IconMicroMenu;
