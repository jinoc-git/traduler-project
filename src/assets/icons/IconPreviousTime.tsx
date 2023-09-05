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
        d="M9.00005 0.75L4.90912 3.00001L9.00005 5.25002V3.75002C13.0542 3.75002 16.3637 6.78378 16.3637 10.5001C16.3637 14.2163 13.0542 17.2501 9.00005 17.2501C4.94594 17.2501 1.63637 14.2163 1.63637 10.5001C1.63637 8.66029 2.35883 7.07253 3.68184 5.85903L2.53147 4.80527C0.908187 6.29253 0 8.28979 0 10.5001C0 15.0338 4.05411 18.7501 9.00005 18.7501C13.946 18.7501 18.0001 15.0338 18.0001 10.5001C18.0001 5.96628 13.946 2.25001 9.00005 2.25001V0.75ZM7.28677 5.67228L5.80421 6.32853L7.87504 10.0785C7.81233 10.2119 7.77763 10.3549 7.77277 10.5001V10.5473L5.13903 12.9601L6.3164 14.0401L8.95014 11.6258H9.00005C9.32554 11.6258 9.63771 11.5073 9.86787 11.2963C10.098 11.0853 10.2273 10.7992 10.2273 10.5008C10.2273 9.9833 9.85178 9.55355 9.33223 9.4223L7.28677 5.67228Z"
        fill={fill || '#4E4F54'}
      />
    </svg>
  );
};

export default IconFavoriteList;
