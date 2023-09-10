import React, { type ReactNode } from 'react';

const MapModalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen bg-black/30 animate-fadeIn">
      <div
        className="flex flex-col justify-center bg-white rounded-lg
      md:w-modal md:h-[225px]  md:px-[40px] md:py-[36px] md:gap-[16px]
      sm:w-[300px] sm:h-[160px] sm:px-[20px] sm:py-[18px] sm:gap-[8px] 
      "
      >
        {children}
      </div>
    </div>
  );
};

export default MapModalLayout;
