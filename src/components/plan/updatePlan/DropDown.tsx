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
        onClick={toggleValue}
        onBlur={() => {
          setNeedValue(false);
        }}
      >
        <IconMicroMenu />
      </button>
      {value && children}
    </div>
  );
};

export default DropDown;
