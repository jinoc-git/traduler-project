import React from 'react';

interface SideBarStatusProps {
  isOpen: boolean;
}

const SideBarStatus: React.FC<SideBarStatusProps> = (props) => {
  const { isOpen } = props;

  return (
    <div className="flex flex-col items-center h-[202px] border-y-2 py-[20px] border-slate-200">
      <div
        className={`flex items-center justify-between mb-[15px] transition-all duration-300 ease-in-out ${
          isOpen ? 'w-[197px]' : 'w-[40px] flex-col'
        }`}
      >
        <span className=" text-sm">STATUS</span>
        <div
          className={`flex-center rounded-[30px]  bg-blue text-sm text-white ${
            isOpen ? 'w-[72.5px] h-[22px]' : 'w-[38px] h-[10px]'
          }`}
        >
          {isOpen && '여행중'}
        </div>
      </div>
      <div
        className={` bg-blue_light_1 rounded-xl transition-all duration-300 ease-in-out ${
          isOpen ? 'w-[197px] h-[125px]' : 'w-[40px] h-[125px]'
        }`}
      ></div>
    </div>
  );
};

export default SideBarStatus;
