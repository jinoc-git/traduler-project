/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react';

import type IconType from 'types/icon';

const IconVisible = ({ w, h, fill }: IconType) => {
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
        d="M16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12ZM14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5C13.3807 9.5 14.5 10.6193 14.5 12Z"
        fill="#828282"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 20C18 20 22.5 14.5 24 11.75C22.25 9.16667 18 4 12 4C6 4 1.75 9.16667 0 11.75C1.5 14.5 6 20 12 20ZM5.59287 15.3698C4.22731 14.2318 3.13637 12.9205 2.40044 11.8381C3.21007 10.7793 4.30844 9.53885 5.65074 8.4719C7.46221 7.03201 9.59773 6 12 6C14.4023 6 16.5378 7.03201 18.3493 8.4719C19.6916 9.53885 20.7899 10.7793 21.5996 11.8381C20.8636 12.9205 19.7727 14.2318 18.4071 15.3698C16.5587 16.9102 14.3725 18 12 18C9.62746 18 7.44132 16.9102 5.59287 15.3698Z"
        fill="#828282"
      />
    </svg>
  );
};

export default IconVisible;
