import React, { type ReactNode } from 'react';

import IconMicroMenu from '@assets/icons/IconMicroMenu';
import useBooleanState from '@hooks/useBooleanState';

interface DropDownProps {
  children: ReactNode;
}

const DropDown = ({ children }: DropDownProps) => {
  const { value, toggleValue, setNeedValue } = useBooleanState(false);

  return (
    <div className="relative">
      <button
        name="dropdown-btn"
        onClick={toggleValue}
        onBlur={() => {
          setNeedValue(false);
        }}
        className="md:p-3 sm:p-1"
      >
        <IconMicroMenu w="w-[24px]" h="h-[24px]" />
      </button>
      {value && children}
    </div>
  );
};

export default DropDown;
