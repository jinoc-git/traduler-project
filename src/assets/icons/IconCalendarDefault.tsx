import React from 'react';

import type IconType from 'types/icon';

const IconCalendarDefault = ({ w, h, fill }: IconType) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox={`0 0 24 24`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`sm:w-[18px] sm:h-[18px] ${w} ${h}`}
    >
      <path
        d="M8 0V2H16V0H18V2H24V24H0V2H6V0H8ZM22 8H2V22H22V8ZM18 4H16V6H18V4ZM8 4H6V6H8V4Z"
        fill={fill ?? 'black'}
      />
    </svg>
  );
};

export default IconCalendarDefault;
