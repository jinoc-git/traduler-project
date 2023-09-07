/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react';

import type IconType from 'types/icon';

const IconAdd = ({ w, h }: IconType) => {
  return (
    <svg
      width={w || '16'}
      height={h || '16'}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className=""
    >
      <path d="M14 0H10V10H0V14H10V24H14V14H24V10H14V0Z" />
    </svg>
  );
};

export default IconAdd;
