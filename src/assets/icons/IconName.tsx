/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react';

import type IconType from 'types/icon';

const IconName = ({ w, h, fill }: IconType) => {
  const width = `w-[${w as string}px]`;
  const height = `h-[${h as string}px]`;

  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={w !== undefined && h !== undefined ? `${width} ${height}` : ''}
    >
      <path
        d="M21.3996 24.6138H0.828125V22.3281C0.828125 20.8125 1.50542 19.3591 2.71101 18.2874C3.9166 17.2158 5.55173 16.6138 7.2567 16.6138H14.971C16.6759 16.6138 18.3111 17.2158 19.5167 18.2874C20.7223 19.3591 21.3996 20.8125 21.3996 22.3281V24.6138ZM11.1138 14.3281C10.1008 14.3281 9.09765 14.1507 8.16171 13.8061C7.22577 13.4615 6.37535 12.9564 5.65902 12.3196C4.94268 11.6829 4.37445 10.927 3.98677 10.095C3.59909 9.26308 3.39955 8.37141 3.39955 7.47091C3.39955 6.57042 3.59909 5.67874 3.98677 4.8468C4.37445 4.01485 4.94268 3.25892 5.65902 2.62218C6.37535 1.98544 7.22577 1.48034 8.16171 1.13574C9.09765 0.791135 10.1008 0.61377 11.1138 0.61377C13.1598 0.61377 15.122 1.33622 16.5687 2.62218C18.0154 3.90814 18.8281 5.65229 18.8281 7.47091C18.8281 9.28954 18.0154 11.0337 16.5687 12.3196C15.122 13.6056 13.1598 14.3281 11.1138 14.3281Z"
        fill="#828282"
      />
    </svg>
  );
};

export default IconName;
