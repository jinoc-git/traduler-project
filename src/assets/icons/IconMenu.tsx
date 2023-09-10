import React from 'react';

import type IconType from 'types/icon';
const IconMenu = ({ w, h, fill }: IconType) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${w} ${h}`}
    >
      <path d="M0 2H24V6H0V2Z" fill={fill ?? 'black'} />
      <path d="M0 10H24V14H0V10Z" fill={fill ?? 'black'} />
      <path d="M24 18H0V22H24V18Z" fill={fill ?? 'black'} />
    </svg>
  );
};

export default IconMenu;
