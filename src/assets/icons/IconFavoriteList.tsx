/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import type IconType from 'types/icon';

const IconFavoriteList = ({ w, h, fill }: IconType) => {
  const width = `w-[${w as string}px]`;
  const height = `h-[${h as string}px]`;
  return (
    <svg
      width={w || '24'}
      height={h || '25'}
      viewBox={`0 0 ${w || '24'} ${h || '24'}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={w !== undefined && h !== undefined ? `${width} ${height}` : ''}
    >
      <path
        d="M20.0001 7.75004V9.00005H11.4258C11.1915 8.23181 10.9571 7.47335 10.7227 6.72464C10.4883 5.97594 10.2474 5.21422 10.0001 4.43948C9.75917 5.20771 9.52153 5.96618 9.28716 6.71488C9.05278 7.46358 8.81515 8.2253 8.57426 9.00005H3.67189C4.33596 9.50786 4.99352 10.0157 5.64456 10.5235C6.29561 11.0313 6.95642 11.5359 7.62699 12.0372C7.36658 12.8445 7.11267 13.6453 6.86527 14.4395C6.61787 15.2338 6.37048 16.0378 6.12308 16.8517L10.0001 13.8634V15.4454L3.75002 20.2501L6.17191 12.4962L0 7.75004H7.65629L10.0001 0.25L12.3438 7.75004H20.0001ZM11.2501 11.5001H20.0001V12.7501H11.2501V11.5001ZM11.2501 15.2501H20.0001V16.5001H11.2501V15.2501Z"
        fill={fill || '#6E6F76'}
      />
    </svg>
  );
};

export default IconFavoriteList;
