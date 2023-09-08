import React from 'react';

import IconGitHub from '@assets/icons/IconGitHub';
import { tradulerLogo } from '@assets/index';

const Footer = () => {
  return (
    <footer className=" flex flex-col w-full h-[500px] bg-[#292B22]">
      <div className="mx-auto w-5/6 flex flex-col justify-between">
        <div className="mt-[32px] mb-[20px] h-[40px] w-full">
          <img
            src={tradulerLogo}
            alt="traduler logo"
            className="w-[134px] h-[40px]"
          />
        </div>
        <hr className="border-t border-white text-white " />
        <div className="flex justify-between ">
          <div className="w-1/3">
            <p className="font-bold  text-white opacity-60 mt-8">서비스소개</p>
            <div className="text-white opacity-60 mt-2">
              <p>트래줄러는 여행의 전 과정을 담당하여 하나뿐인 여행을</p>
              <p>더욱 특별하게 만들어 줍니다.</p>
            </div>
            <div className="text-white opacity-60 mt-4">
              <p>당신의 소중한 추억이</p>
              <p>오대도록 아름답게 기억되었으면 좋겠습니다.</p>
            </div>
          </div>
          <div className="w-1/3">
            <p className="font-bold text-white opacity-60 mt-8">
              함께한 사람들
            </p>
            <div className="text-white opacity-60 mt-2">
              <p>Front-end Engineer</p>
              <p>노진철</p>
              <p>유지완</p>
              <p>김진우</p>
              <p>박기태</p>
              <p>윤수민</p>
            </div>
            <div className="text-white opacity-60 mt-4">
              <p>UX/UI Designer</p>
              <p>류해민</p>
            </div>
          </div>
          <div className="w-1/3">
            <p className="font-bold text-white opacity-60 mt-8 mb-2">GitHub</p>
            <a
              href="https://github.com/jinoc-git/traduler-project"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[24px] h-[18px]"
            >
              <IconGitHub />
            </a>
          </div>
        </div>
        <div className="flex justify-between mt-20">
          <div className="w-1/3">
            <p className="text-white opacity-60">&copy; 2023 — TRADULER. </p>
          </div>
          <div className="w-2/3">
            <p className="text-white opacity-60">
              내일배움캠프 React 6기 B반 5조{' '}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
