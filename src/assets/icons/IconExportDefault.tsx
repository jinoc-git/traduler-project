/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

import type IconType from 'types/icon';

const IconExportDefault = ({ w, h, fill }: IconType) => {
  const [isHovered, setIsHovered] = useState(false);

  const outerStrokeColor = isHovered ? '#D46D0E' : '#FFB979';
  const innerFillColor = isHovered ? '#D46D0E' : '#FFB979';
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`sm:w-[24px] sm:h-[24px] ${w} ${h}`}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <path
        d="M10 2H2V22H10V20H4L4 4H10V2Z"
        fill={innerFillColor ?? 'black'}
        stroke={outerStrokeColor}
      />
      <path
        d="M6 10H16L16 6L24 12L16 18V14H6V10Z"
        fill={innerFillColor ?? 'black'}
        stroke={outerStrokeColor}
      />
    </svg>
  );
};

export default IconExportDefault;
