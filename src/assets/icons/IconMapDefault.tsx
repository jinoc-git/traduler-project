/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react';

import type IconType from 'types/icon';
const IconMapDefault = ({ w, h, fill }: IconType) => {
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
        d="M0 24L6 20L12 24L18 20L24 24V4L18 0L12 4L6 0L0 4V24ZM11 20.9296V5.73704L7 3.07037V18.263L11 20.9296ZM13 20.9296V5.73703L17 3.07037V18.263L13 20.9296ZM22 20.263L19 18.263V3.07037L22 5.07037V20.263ZM5 18.263L2 20.263V5.07037L5 3.07037V18.263Z"
        fill={fill ?? 'black'}
      />
    </svg>
  );
};

export default IconMapDefault;
