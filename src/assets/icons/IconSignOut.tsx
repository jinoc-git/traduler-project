import React from 'react';

import type IconType from 'types/icon';

const IconSignOut = ({ w, h, fill }: IconType) => {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${w} ${h}`}
    >
      <path
        d="M11.0227 12.8694H22.9605M22.9605 12.8694L19.5497 9.46107M22.9605 12.8694L19.5497 16.2776M19.8908 20.521C18.3594 22.1159 16.3855 23.2167 14.223 23.6815C12.0605 24.1464 9.80823 23.9541 7.75596 23.1294C5.70369 22.3047 3.94526 20.8854 2.70683 19.0539C1.46841 17.2225 0.806641 15.0627 0.806641 12.8523C0.806641 10.642 1.46841 8.48215 2.70683 6.65069C3.94526 4.81923 5.70369 3.39989 7.75596 2.57522C9.80823 1.75055 12.0605 1.55827 14.223 2.02312C16.3855 2.48797 18.3594 3.58868 19.8908 5.18368"
        stroke={fill ?? 'black'}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconSignOut;
