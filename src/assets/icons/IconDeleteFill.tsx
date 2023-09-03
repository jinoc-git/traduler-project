/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import type IconType from 'types/icon';

const IconDeleteFill = ({ w, h, fill }: IconType) => {
  const width = `w-[${w as string}px]`;
  const height = `h-[${h as string}px]`;
  return (
    <svg
      width={w || '24'}
      height={h || '24'}
      viewBox={`0 0 ${w || '24'} ${h || '24'}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={w !== undefined && h !== undefined ? `${width} ${height}` : ''}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 2C6 0.89543 6.89543 0 8 0H14C15.1046 0 16 0.895431 16 2V4H22V6H20V20.5C20 22.433 18.433 24 16.5 24H6C3.79086 24 2 22.2091 2 20V6H0V4H6V2ZM8 4H14V3C14 2.44772 13.5523 2 13 2H9C8.44772 2 8 2.44772 8 3V4ZM6 8H8V20H6V8ZM10 8H12V20H10V8ZM14 8H16V20H14V8Z"
        fill={fill || 'black'}
      />
    </svg>
  );
};

export default IconDeleteFill;
