import React, { type ReactNode } from 'react';

const PlanLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="flex flex-col mx-auto
      sm:mt-[32px] sm:w-[310px]
      md:mt-[100px] md:w-plan"
    >
      {children}
    </div>
  );
};

export default PlanLayout;
