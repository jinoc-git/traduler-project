/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react';

import type IconType from 'types/icon';

const IconWallet = ({ w, h, fill }: IconType) => {
  return (
    <svg
      width="27"
      height="22"
      viewBox="0 0 27 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${w} ${h}`}
    >
      <path
        d="M24.8545 15.0802V18.7067C24.8545 19.3507 24.5986 19.9684 24.1432 20.4238C23.6878 20.8792 23.0702 21.135 22.4262 21.135H3.92831C3.28439 21.135 2.66683 20.8793 2.21145 20.424C1.75607 19.9687 1.50016 19.3512 1.5 18.7073V4.17502C1.49992 3.85607 1.56267 3.54024 1.68467 3.24555C1.80666 2.95087 1.98552 2.6831 2.21102 2.45755C2.43651 2.23199 2.70424 2.05307 2.99889 1.931C3.29355 1.80892 3.60937 1.74609 3.92831 1.74609H22.4262C22.7451 1.74609 23.0609 1.80892 23.3556 1.931C23.6502 2.05307 23.9179 2.23199 24.1434 2.45755C24.3689 2.6831 24.5478 2.95087 24.6698 3.24555C24.7918 3.54024 24.8545 3.85607 24.8545 4.17502V7.92763M24.7578 15.087H18.3769C17.4267 15.087 16.5154 14.7095 15.8435 14.0376C15.1716 13.3657 14.7942 12.4545 14.7942 11.5042C14.7941 11.0337 14.8867 10.5677 15.0667 10.133C15.2467 9.69824 15.5106 9.30321 15.8433 8.97045C16.176 8.63769 16.571 8.37373 17.0057 8.19364C17.4404 8.01355 17.9064 7.92086 18.3769 7.92086H24.7585C25.1677 7.92086 25.5 8.25317 25.5 8.66302V14.3455C25.5 14.7547 25.1677 15.087 24.7578 15.087ZM20.3695 11.5461C20.3695 12.4654 19.6243 13.2107 18.7049 13.2107C17.7856 13.2107 17.0403 12.4654 17.0403 11.5461C17.0403 10.6268 17.7856 9.88148 18.7049 9.88148C19.6243 9.88148 20.3695 10.6268 20.3695 11.5461Z"
        stroke={fill ?? 'black'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconWallet;
