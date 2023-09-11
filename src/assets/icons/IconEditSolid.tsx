/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react';

import type IconType from 'types/icon';

const IconEditSolid = ({ w, h, fill }: IconType) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${w} ${h}`}
    >
      <path
        d="M16.3176 0.587738C17.1013 -0.195913 18.3718 -0.195912 19.1555 0.587739L23.4123 4.84451C24.1959 5.62816 24.1959 6.89871 23.4123 7.68236L20.5744 10.5202L13.4798 3.42559L16.3176 0.587738Z"
        fill={fill ?? 'black'}
      />
      <path
        d="M3.54732 13.3581L11.9907 4.91465L12.4678 5.39169L19.1555 11.9391L10.6419 20.4527L0 24L3.54732 13.3581Z"
        fill={fill ?? 'black'}
      />
    </svg>
  );
};

export default IconEditSolid;
