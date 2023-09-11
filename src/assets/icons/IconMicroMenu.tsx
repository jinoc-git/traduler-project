import React from 'react';

import type IconType from 'types/icon';

const IconMicroMenu = ({ w, h, fill }: IconType) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`sm:w-[14px] sm:h-[14px] md:${w} md:${h}`}
    >
      <path d="M10 22V18H14V22H10Z" fill={fill ?? 'black'} />
      <path d="M10 14L10 10H14L14 14H10Z" fill={fill ?? 'black'} />
      <path d="M10 2V6H14V2L10 2Z" fill={fill ?? 'black'} />
    </svg>
  );
};

export default IconMicroMenu;
