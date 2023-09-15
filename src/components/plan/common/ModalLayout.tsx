import React, { type ReactNode } from 'react';

const MapModalLayout = ({
  children,
  value,
}: {
  children: ReactNode;
  value: boolean;
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center w-screen h-screen bg-black/30 
      ${value ? 'sm:animate-fadeIn' : 'sm:animate-fadeOut'}`}
    >
      <div
        className={`flex flex-col justify-center bg-bg_white rounded-lg md:animate-fadeIn
      md:w-modal  md:px-[52px] md:py-[48px] md:rounded-lg md:static
      sm:w-[360px] sm:px-[25px] sm:py-[36px] sm:gap-[16px] sm:fixed sm:bottom-0 sm:rounded-b-none
      ${value ? 'md:animate-fadeIn' : 'md:animate-fadeOut'}
      ${value ? 'sm:animate-slideUp' : 'sm:animate-slideDown'}
      `}
      >
        {children}
      </div>
    </div>
  );
};

export default MapModalLayout;
