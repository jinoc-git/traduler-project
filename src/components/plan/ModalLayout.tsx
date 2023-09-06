import React, { type ReactNode } from 'react';

const MapModalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen bg-black/30 animate-fadeIn">
      <div className="flex flex-col justify-center bg-white w-modal h-modal rounded-lg px-[40px] py-[36px] gap-[16px]">
        {children}
      </div>
    </div>
  );
};

export default MapModalLayout;
