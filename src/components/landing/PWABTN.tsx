/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { installEventStore } from '@store/installEventStore';
import { sideBarStore } from '@store/sideBarStore';

const PWABTN = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isSideBarOpen = sideBarStore((state) => state.isSideBarOpen);
  const { installEvent, setEvent } = installEventStore();

  const installApp = async () => {
    installEvent.prompt();
    const { outcome } = await installEvent.userChoice;
    if (outcome === 'accepted') {
      setEvent(null);
    }
  };

  return (
    <>
      {pathname === '/' &&
        (installEvent !== null ? (
          <div className="flex flex-col justify-center md:mb-[120px] sm:mb-[30px]">
            <button
              className="font-bold text-center text-blue underline underline-offset-[6px] mx-auto cursor-pointer
                md:text-[30px] md:w-[300px]
                sm:text-[17px] sm:mt-[20px] sm:w-[180px]"
              onClick={installApp}
            >
              앱 설치하고 사용해보기
            </button>
            <div className="mt-1 text-xs text-center text-gray_dark_1 md:text-sm">
              일부 환경에서는 동작하지 않을 수 있습니다.
            </div>
          </div>
        ) : (
          <button
            className=" font-bold text-center text-blue underline underline-offset-[6px] mx-auto p-3 cursor-pointer
          md:text-[30px] md:mb-[120px] md:w-[300px]
          sm:text-[17px] sm:mt-[20px] sm:mb-[30px] sm:w-[180px] 
          "
            onClick={() => {
              navigate('/signin');
            }}
          >
            로그인하고 사용해보기
          </button>
        ))}
      {pathname === '/main' && installEvent !== null && (
        <div
          className={`flex flex-col fixed left-0 bottom-0 md:mb-[20px] sm:mb-[10px] items-center w-full
          ${isSideBarOpen ? 'md:pl-[270px]' : ''} duration-300
        `}
        >
          <button
            className="text-center w-ful rounded-[7px] text-white p-2 bg-blue_dark hover:bg-blue duration-300
            sm:font-semibold sm:gap-[10px] sm:mt-[10px] sm:w-[110px] sm:h-[35px] sm:text-sm
            md:mt-[35px] md:w-[150px] md:h-[50px] md:text-normal"
            onClick={installApp}
          >
            앱 설치하기
          </button>
        </div>
      )}
    </>
  );
};

export default PWABTN;
