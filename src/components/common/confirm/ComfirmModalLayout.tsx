import { type ReactNode } from 'react';

const ComfirmModalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen bg-black/30 animate-fadeIn">
      <div
        className="flex flex-col justify-center bg-bg_white rounded-lg md:animate-fadeIn
    md:w-modal  md:px-[52px] md:py-[48px] md:rounded-lg md:bottom-[35vh]
    sm:w-[360px] sm:px-[25px] sm:py-[36px] sm:gap-[16px] sm:m-5
    "
      >
        {children}
      </div>
    </div>
  );
};

export default ComfirmModalLayout;
