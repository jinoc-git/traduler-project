import React from 'react';

interface SideBarProgressBarProps {
  percent: string;
  isOpen: boolean;
}

const SideBarProgressBar = ({ percent, isOpen }: SideBarProgressBarProps) => {
  const progressLength = (((isOpen ? 160 : 80) / 100) * +percent).toFixed();

  const isOpenContainerClassName =
    'relative w-[160px] h-[8px] rounded bg-[#EEF1F4]';
  const isCloseContainerClassName =
    'relative w-[8px] h-[80px] rounded bg-[#EEF1F4]';

  const isOpenProgressBarClassName = {
    width: progressLength + 'px',
    height: '8px',
    top: '0',
    left: '0'
  };
  const isCloseProgressBarClassName = {
    width: '8px',
    height: progressLength + 'px',
    bottom: '0',
    left: '0'
  };

  return (
    <div
      className={isOpen ? isOpenContainerClassName : isCloseContainerClassName}
    >
      <div
        style={
          isOpen ? isOpenProgressBarClassName : isCloseProgressBarClassName
        }
        className={` absolute bg-gradient-to-r from-[#116DB3] to-[#2DA4FF] rounded transition-all duration-300 ease-in-out`}
      ></div>
    </div>
  );
};

export default SideBarProgressBar;
