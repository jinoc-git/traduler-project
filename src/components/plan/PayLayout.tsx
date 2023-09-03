import React, { type ReactNode } from 'react';

const PayLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center h-[50px] py-[10px] text-[16px] font-semibold text-gray_dark_1">
      {children}
    </div>
  );
};

export default PayLayout;
