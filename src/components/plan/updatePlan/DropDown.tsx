import React, { type ReactNode } from 'react';

import IconMicroMenu from '@assets/icons/IconMicroMenu';
import useBooleanState from '@hooks/useBooleanState';

interface DropDownProps {
  children: ReactNode;
}

const DropDown = ({ children }: DropDownProps) => {
  const { value, toggleValue, setNeedValue } = useBooleanState(false);
  const isIos = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  const handleMouseOut = () => {
    if (isIos) {
      setNeedValue(false);
    }
  };

  return (
    <div className="relative">
      <button
        aria-label="dropdown-btn"
        onClick={toggleValue}
        onBlur={() => {
          setNeedValue(false);
        }}
        onMouseOut={handleMouseOut}
        className="md:p-3 sm:p-1"
      >
        <IconMicroMenu w="w-[24px]" h="h-[24px]" />
      </button>
      {value && children}
    </div>
  );
};

export default DropDown;
