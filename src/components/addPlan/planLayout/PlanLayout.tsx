import React, { type ReactNode } from 'react';

const PlanLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="flex flex-col justify-center  
      sm:mt-[32px] sm:w-[320px]
      md:mt-[100px] md:w-plan md:mx-auto"
    >
      {children}
    </div>
  );
};

export default PlanLayout;
