import React from 'react';

interface SideBarProgressBarProps {
  percent: string;
}

const SideBarProgressBar = ({ percent }: SideBarProgressBarProps) => {
  const progressWidth = ((160 / 100) * +percent).toFixed();

  return (
    <div className={` relative w-[160px] h-[8px] rounded bg-[#EEF1F4]`}>
      <div
        style={{width: progressWidth + 'px'}}
        className={` absolute top-0 left-0  h-[8px] bg-gradient-to-r from-[#116DB3] to-[#2DA4FF] rounded transition-all duration-300 ease-in-out`}
      ></div>
    </div>
  );
};

export default SideBarProgressBar;
