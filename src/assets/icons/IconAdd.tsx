/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react';

import type IconType from 'types/icon';

const IconAdd = ({ w, h, fill }: IconType) => {
  const width = `w-[${w as string}px]`;
  const height = `h-[${h as string}px]`;
  const hoverColor = {
    fill: 'group-hover:fill-[#1A68DB]',
    default: 'group-hover:fill-white',
  };
  const fillValue = fill || 'black';

  return (
    <svg
      width={w || '16'}
      height={h || '16'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        w !== undefined && h !== undefined ? `${width} ${height}` : ''
      }`}
    >
      <path
        d="M14 0H10V10H0V14H10V24H14V14H24V10H14V0Z"
        fill={fillValue === '#1A68DB' ? 'white' : fillValue}
        className={fill ? hoverColor.fill : hoverColor.default}
      />
    </svg>
  );
};

export default IconAdd;
