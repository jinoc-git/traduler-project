/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react';

import type IconType from 'types/icon';

const IconHidden = ({ w, h, fill }: IconType) => {
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
        d="M21.1525 1L23.2739 3.12132L19.5353 6.85993C21.5962 8.48364 23.1166 10.4459 24 11.75C22.5 14.5 18 20 12 20C10.3634 20 8.83838 19.5908 7.45543 18.9398L3.12132 23.2739L1 21.1525L4.83106 17.3215C2.50101 15.5303 0.811493 13.2377 0 11.75C1.75 9.16664 6 3.99997 12 3.99997C13.8163 3.99997 15.4723 4.47345 16.9471 5.20542L21.1525 1ZM14.8547 7.29787C14.0225 6.79157 13.0453 6.49997 12 6.49997C8.96243 6.49997 6.5 8.9624 6.5 12C6.5 13.0453 6.7916 14.0225 7.2979 14.8546L8.77954 13.373C8.59957 12.9514 8.49995 12.4873 8.49995 12C8.49995 10.067 10.067 8.49997 12 8.49997C12.4873 8.49997 12.9514 8.59958 13.373 8.77955L14.8547 7.29787ZM9.49664 16.8985C10.2475 17.283 11.0984 17.5 12 17.5C15.0376 17.5 17.5 15.0375 17.5 12C17.5 11.0984 17.2831 10.2475 16.8986 9.49661L15.3641 11.0311C15.4526 11.3388 15.5 11.6638 15.5 12C15.5 13.933 13.933 15.5 12 15.5C11.6638 15.5 11.3387 15.4526 11.0311 15.3641L9.49664 16.8985Z"
        fill="#828282"
      />
    </svg>
  );
};

export default IconHidden;