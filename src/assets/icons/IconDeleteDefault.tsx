/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import type IconType from 'types/icon';

const IconDeleteDefault = ({ w, h, fill }: IconType) => {
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
      <path d="M10 8V20H8V8H10Z" fill={fill || 'black'} />
      <path d="M14 8V20H12V8H14Z" fill={fill || 'black'} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0C6.89543 0 6 0.89543 6 2V4H0V6H2V20C2 22.2091 3.79086 24 6 24H16.5C18.433 24 20 22.433 20 20.5V6H22V4H16V2C16 0.895431 15.1046 0 14 0H8ZM18 6H4V20C4 21.1046 4.89543 22 6 22H16.5C17.3284 22 18 21.3284 18 20.5V6ZM14 4H8V3C8 2.44772 8.44772 2 9 2H13C13.5523 2 14 2.44772 14 3V4Z"
        fill={fill || 'black'}
      />
    </svg>
  );
};

export default IconDeleteDefault;
