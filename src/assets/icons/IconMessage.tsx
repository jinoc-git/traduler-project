import React from 'react';

import type IconType from 'types/icon';

const IconMessage = ({ w, h, fill }: IconType) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 2H0V22H24V2ZM4.1997 6.70874L2.97681 8.29131L12 15.2638L21.0232 8.29131L19.8003 6.70874L12 12.7363L4.1997 6.70874Z"
        fill="#828282"
      />
    </svg>
  );
};

export default IconMessage;
