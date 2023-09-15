import React, { type ReactNode } from 'react';

const PayLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="flex items-center font-semibold text-gray_dark_1 
        sm:w-[286px] sm:h-[27px] sm:text-sm sm:mx-auto sm:mt-[11px]
        md:w-[700px] md:text-[16px]  md:mb-[15px]  md:mx-[6px] "
    >
      {children}
    </div>
  );
};

export default PayLayout;
