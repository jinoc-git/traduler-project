import React from 'react';

import IconGitHub from '@assets/icons/IconGitHub';
import { tradulerLogo } from '@assets/index';

const Footer = () => {
  return (
    <footer className=" flex flex-col w-full bg-[#292B22]">
      <div
        className="mx-auto flex flex-col justify-between  max-w-[1130px]
        md:w-5/6
        sm:w-[310px]
        "
      >
        <div className="mt-[32px]  h-[40px] w-full md:mb-[20px] sm:mb-[10px]">
          <img
            src={tradulerLogo}
            alt="traduler logo"
            className="w-[134px] h-[40px]"
          />
        </div>
        <hr className="border-[#A9AAA7] md:w-[100%] sm:w-[134px] " />
        <div className="flex justify-between md:flex-row gap-[20px] md:text-[16px] sm:text-[14px] sm:flex-col">
          <div className="md:w-1/3 ">
            <p className="font-bold  text-white md:mt-8 sm:mt-[24px]">서비스소개</p>
            <div className="text-[#A9AAA7] mt-2">
              <p>트래줄러는 여행의 전 과정을 담당하여 하나뿐인 여행을</p>
              <p>더욱 특별하게 만들어 줍니다.</p>
            </div>
            <div className="text-[#A9AAA7] md:mt-8 sm:mt-[24px]">
              <p>당신의 소중한 추억이</p>
              <p>오대도록 아름답게 기억되었으면 좋겠습니다.</p>
            </div>
          </div>
          <div className="md:w-1/3">
            <p className="font-bold text-white md:mt-8 sm:mt-[24px]">함께한 사람들</p>
            <div className="text-[#A9AAA7]  mt-2">
              <p>Front-end Engineer</p>
              <p>노진철</p>
              <p>유지완</p>
              <p>김진우</p>
              <p>박기태</p>
              <p>윤수민</p>
            </div>
            <div className="text-[#A9AAA7]  mt-4">
              <p>UX/UI Designer</p>
              <p>류해민</p>
            </div>
          </div>
          <div className="md:w-1/3">
            <p className="font-bold text-white mb-2 md:mt-8  sm:mt-[24px]">GitHub</p>
            <a
              href="https://github.com/jinoc-git/traduler-project"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-center w-[56px] h-[56px] bg-gray_dark_1 rounded-full"
            >
              <IconGitHub w="w-[40px]" h="h-[40px]" fill="white" />
            </a>
          </div>
        </div>
        <div className="flex justify-between md:mt-20 mb-[20px] md:text-[16px] sm:text-[14px] sm:mt-[24px]">
          <div className="md:w-1/3">
            <p className="text-[#A9AAA7] ">&copy; 2023 — TRADULER. </p>
          </div>
          <div className="w-2/3 md:block sm:hidden">
            <p className="text-[#A9AAA7] ">내일배움캠프 React 6기 B반 5조 </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
