import React, { type ReactNode } from 'react';

const MapModalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen bg-black/70">
      <div className="flex flex-col justify-center bg-white w-modal h-modal_2 rounded-lg px-[40px] py-[36px] gap-[16px]">
        {children}
      </div>
    </div>
  );
};

export default MapModalLayout;
