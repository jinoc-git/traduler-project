/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react';

import type IconType from 'types/icon';

const IconSixDots = ({ w, h, fill }: IconType) => {
  return (
    <svg
      width={w || '25'}
      height={h || '29'}
      viewBox="0 0 25 29"
      fill='none'
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 22.5882C18.585 22.5882 19.1461 22.8206 19.5598 23.2343C19.9735 23.648 20.2059 24.2091 20.2059 24.7941C20.2059 25.3792 19.9735 25.9402 19.5598 26.3539C19.1461 26.7676 18.585 27 18 27C17.415 27 16.8539 26.7676 16.4402 26.3539C16.0265 25.9402 15.7941 25.3792 15.7941 24.7941C15.7941 24.2091 16.0265 23.648 16.4402 23.2343C16.8539 22.8206 17.415 22.5882 18 22.5882ZM7.70588 22.5882C8.29092 22.5882 8.85199 22.8206 9.26568 23.2343C9.67936 23.648 9.91176 24.2091 9.91176 24.7941C9.91176 25.3792 9.67936 25.9402 9.26568 26.3539C8.85199 26.7676 8.29092 27 7.70588 27C7.12085 27 6.55977 26.7676 6.14609 26.3539C5.7324 25.9402 5.5 25.3792 5.5 24.7941C5.5 24.2091 5.7324 23.648 6.14609 23.2343C6.55977 22.8206 7.12085 22.5882 7.70588 22.5882ZM18 12.2941C18.585 12.2941 19.1461 12.5265 19.5598 12.9402C19.9735 13.3539 20.2059 13.915 20.2059 14.5C20.2059 15.085 19.9735 15.6461 19.5598 16.0598C19.1461 16.4735 18.585 16.7059 18 16.7059C17.415 16.7059 16.8539 16.4735 16.4402 16.0598C16.0265 15.6461 15.7941 15.085 15.7941 14.5C15.7941 13.915 16.0265 13.3539 16.4402 12.9402C16.8539 12.5265 17.415 12.2941 18 12.2941ZM7.70588 12.2941C8.29092 12.2941 8.85199 12.5265 9.26568 12.9402C9.67936 13.3539 9.91176 13.915 9.91176 14.5C9.91176 15.085 9.67936 15.6461 9.26568 16.0598C8.85199 16.4735 8.29092 16.7059 7.70588 16.7059C7.12085 16.7059 6.55977 16.4735 6.14609 16.0598C5.7324 15.6461 5.5 15.085 5.5 14.5C5.5 13.915 5.7324 13.3539 6.14609 12.9402C6.55977 12.5265 7.12085 12.2941 7.70588 12.2941ZM18 2C18.585 2 19.1461 2.2324 19.5598 2.64609C19.9735 3.05977 20.2059 3.62085 20.2059 4.20588C20.2059 4.79092 19.9735 5.35199 19.5598 5.76568C19.1461 6.17936 18.585 6.41176 18 6.41176C17.415 6.41176 16.8539 6.17936 16.4402 5.76568C16.0265 5.35199 15.7941 4.79092 15.7941 4.20588C15.7941 3.62085 16.0265 3.05977 16.4402 2.64609C16.8539 2.2324 17.415 2 18 2ZM7.70588 2C8.29092 2 8.85199 2.2324 9.26568 2.64609C9.67936 3.05977 9.91176 3.62085 9.91176 4.20588C9.91176 4.79092 9.67936 5.35199 9.26568 5.76568C8.85199 6.17936 8.29092 6.41176 7.70588 6.41176C7.12085 6.41176 6.55977 6.17936 6.14609 5.76568C5.7324 5.35199 5.5 4.79092 5.5 4.20588C5.5 3.62085 5.7324 3.05977 6.14609 2.64609C6.55977 2.2324 7.12085 2 7.70588 2Z"
        fill={fill || '#646464'}
      />
    </svg>
  );
};

export default IconSixDots;
