import React, { type ReactNode } from 'react';

const PayLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="flex items-center font-semibold text-gray_dark_1
    sm:w-[286px] sm:h-[27px] sm:text-sm sm:mx-[6px] sm:mt-[16px]
    md:h-[40px] md:text-[16px]"
    >
      {children}
    </div>
  );
};

export default PayLayout;
