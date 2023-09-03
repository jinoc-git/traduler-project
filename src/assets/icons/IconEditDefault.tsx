/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react';

import type IconType from 'types/icon';

const IconEditDefault = ({ w, h, fill }: IconType) => {
  const width = `w-[${w as string}px]`;
  const height = `h-[${h as string}px]`;
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={w !== undefined && h !== undefined ? `${width} ${height}` : ''}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.1274 0.585786C18.3464 -0.195262 17.08 -0.195262 16.299 0.585786L13.4706 3.41421L20.5416 10.4853L23.37 7.65685C24.1511 6.87581 24.1511 5.60948 23.37 4.82843L19.1274 0.585786ZM18.4203 2.70711C18.0298 2.31658 17.3966 2.31658 17.0061 2.70711L16.299 3.41421L20.5416 7.65685L21.2487 6.94975C21.6393 6.55922 21.6393 5.92606 21.2487 5.53553L18.4203 2.70711Z"
        fill={fill ?? 'black'}
      />
      <path
        d="M14.8848 7.65685L16.299 9.07107L8.5208 16.8492C8.13028 17.2398 7.49712 17.2398 7.10659 16.8492C6.71607 16.4587 6.71607 15.8256 7.10659 15.435L14.8848 7.65685Z"
        fill={fill ?? 'black'}
      />
      <path
        d="M17.7132 10.4853L19.1274 11.8995L10.6421 20.3848L0 24L3.57106 13.3137L11.9864 4.89834L13.4007 6.31255L5.33881 14.3744L3.74783 19.1473L4.80849 20.208L9.58147 18.617L17.7132 10.4853Z"
        fill={fill ?? 'black'}
      />
    </svg>
  );
};

export default IconEditDefault;
