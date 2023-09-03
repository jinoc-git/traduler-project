import React, { type ReactNode } from 'react';

const PlanLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col justify-center mx-auto my-[100px] w-plan">
      {children}
    </div>
  );
};

export default PlanLayout;
