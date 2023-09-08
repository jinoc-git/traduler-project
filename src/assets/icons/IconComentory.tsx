import React from 'react';

import type IconType from 'types/icon';

const IconCommentory = ({ w, h, fill }: IconType) => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${w} ${h}`}
    >
      <path
        d="M0 3.125C0 2.2962 0.32924 1.50134 0.915291 0.915291C1.50134 0.32924 2.2962 0 3.125 0H16.1932C16.6036 0 17.0099 0.0808305 17.3891 0.237876C17.7682 0.394922 18.1127 0.625108 18.4029 0.915291C18.6931 1.20547 18.9233 1.54997 19.0803 1.92911C19.2374 2.30826 19.3182 2.71462 19.3182 3.125V15.9091H25V20.7386C25 21.8688 24.551 22.9527 23.7519 23.7519C22.9527 24.551 21.8688 25 20.7386 25H4.26136C3.13118 25 2.04729 24.551 1.24812 23.7519C0.448964 22.9527 0 21.8688 0 20.7386V3.125ZM19.3182 23.2955H20.7386C21.4167 23.2955 22.0671 23.0261 22.5466 22.5466C23.0261 22.0671 23.2955 21.4167 23.2955 20.7386V17.6136H19.3182V23.2955ZM3.125 1.70455C2.34091 1.70455 1.70455 2.34091 1.70455 3.125V20.7386C1.70455 21.4167 1.97392 22.0671 2.45342 22.5466C2.93292 23.0261 3.58325 23.2955 4.26136 23.2955H17.6136V3.125C17.6136 2.34091 16.9773 1.70455 16.1932 1.70455H3.125ZM5.39773 5.68182C5.17169 5.68182 4.95491 5.77161 4.79508 5.93144C4.63525 6.09128 4.54545 6.30805 4.54545 6.53409C4.54545 6.76013 4.63525 6.97691 4.79508 7.13674C4.95491 7.29657 5.17169 7.38636 5.39773 7.38636H13.9205C14.1465 7.38636 14.3633 7.29657 14.5231 7.13674C14.6829 6.97691 14.7727 6.76013 14.7727 6.53409C14.7727 6.30805 14.6829 6.09128 14.5231 5.93144C14.3633 5.77161 14.1465 5.68182 13.9205 5.68182H5.39773ZM4.54545 12.2159C4.54545 11.9899 4.63525 11.7731 4.79508 11.6133C4.95491 11.4534 5.17169 11.3636 5.39773 11.3636H13.9205C14.1465 11.3636 14.3633 11.4534 14.5231 11.6133C14.6829 11.7731 14.7727 11.9899 14.7727 12.2159C14.7727 12.4419 14.6829 12.6587 14.5231 12.8186C14.3633 12.9784 14.1465 13.0682 13.9205 13.0682H5.39773C5.17169 13.0682 4.95491 12.9784 4.79508 12.8186C4.63525 12.6587 4.54545 12.4419 4.54545 12.2159ZM5.39773 17.0455C5.17169 17.0455 4.95491 17.1352 4.79508 17.2951C4.63525 17.4549 4.54545 17.6717 4.54545 17.8977C4.54545 18.1238 4.63525 18.3405 4.79508 18.5004C4.95491 18.6602 5.17169 18.75 5.39773 18.75H9.375C9.60104 18.75 9.81781 18.6602 9.97765 18.5004C10.1375 18.3405 10.2273 18.1238 10.2273 17.8977C10.2273 17.6717 10.1375 17.4549 9.97765 17.2951C9.81781 17.1352 9.60104 17.0455 9.375 17.0455H5.39773Z"
        fill={fill ?? '#646464'}
      />
    </svg>
  );
};

export default IconCommentory;
