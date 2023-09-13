import React from 'react';

import type IconType from 'types/icon';
const IconMenu = ({ w, h, fill }: IconType) => {
  return (
    <svg
      width="31"
      height="25"
      viewBox="0 0 31 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${w} ${h}`}
    >
      <path
        d="M0.5 24.9295V21.8442H30.5V24.9295H0.5ZM0.5 14.9022V11.8169H30.5V14.9022H0.5ZM0.5 4.87488V1.78955H30.5V4.87488H0.5Z"
        fill={fill ?? '#171717'}
      />
    </svg>
  );
};

export default IconMenu;
