import React from 'react';
import { useNavigate } from 'react-router-dom';

import IconMapDefault from '@assets/icons/IconMapDefault';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center">
      <div className="bg-[url(https://github.com/jinoc-git/traduler-project/assets/92218638/6902748c-7ce5-49e4-acf2-68938fbd7809)] bg-cover bg-no-repeat h-[878px]">
        <div className="pt-[300px] pl-[200px]">
          <p className="text-yellow font-normal text-[36px]">
            It`s time to travel
          </p>
          <div className="flex items-center gap-[23px]">
            <IconMapDefault w="50" h="50" fill="#fff" />
            <h3 className="text-[55px] font-light text-white">
              너와 나의 여행 연결고리
            </h3>
          </div>
          <p className="font-normal text-white text-xlg mt-[35px]">
            Traduler 와 함께 더 쉽고 빠르고 간편한
          </p>
          <p className="font-normal text-white text-xlg">
            모두가 행복한 평화로운 여행을 만들어보세요!
          </p>
        </div>
      </div>
      <div className="pl-[150px] pr-[300px] flex justify-center mt-[43px]">
        <div className="bg-[url(https://github.com/jinoc-git/traduler-project/assets/92218638/4ae3298a-5b57-459b-86ca-1771f8d38f7a)] bg-cover bg-no-repeat w-[926px] h-[557px]">
          <div className="bg-[url(https://github.com/jinoc-git/traduler-project/assets/92218638/5848a22a-ef7b-4357-aea0-016798a8f60f)] bg-cover bg-no-repeat w-[552px] h-[334px] translate-x-[500px] translate-y-[280px]" />
        </div>
      </div>
      <div className="flex flex-col mx-auto">
        <p className="text-[36px] font-semibold mt-[180px]">
          가족여행, 엠티, 수련회, 우정여행, 효도여행..
        </p>
        <p className="font-normal text-xlg">
          단체 여행 깔끔하게 진행시키는 우리만의 여행 전용 비서
        </p>
      </div>
      <div className="flex justify-center mr-[150px]">
        <div className="bg-[url(https://github.com/jinoc-git/traduler-project/assets/92218638/2d3373dd-d9ba-49a2-817d-ada04da2e7e4)] bg-cover bg-no-repeat w-[500px] h-[220px] mr-[-200px]" />
        <div className="bg-[url(https://github.com/jinoc-git/traduler-project/assets/92218638/070e09ea-78c4-4cd3-9b29-6680aeba46a4)] bg-cover bg-no-repeat w-[500px] h-[220px] mr-[-200px]" />
        <div className="bg-[url(https://github.com/jinoc-git/traduler-project/assets/92218638/5e648670-6f6e-4737-9837-38bcac619925)] bg-cover bg-no-repeat w-[500px] h-[220px] mr-[-200px]" />
      </div>
      <p className="text-[36px] font-semibold mt-[155px] text-center">
        다녀온 후에도 모두가 오래오래 추억할 수 있게
      </p>
      <div className="flex mx-auto mt-[42px]">
        <div className="flex mr-[50px]">
          <div>
            <p className="font-semibold text-xlg text-gray_dark_1">
              지난 여행 저장소
            </p>
            <div className="text-gray_dark_1 mt-[11px] mb-[16px]">
              <p>시간은 흘러도 우리의 추억은 계속된다!</p>
              <br />
              <p>보고 또 봐도 다시 보고 싶은 최애 영화처럼,</p>
              <p>그리울 때 마다 꺼내 보는 나만의 추억 여행 타임 캡슐</p>
            </div>
            <button
              className="p-3 border rounded-lg border-blue w-[130px] text-blue hover:bg-blue_light_1 duration-200"
              onClick={() => {
                navigate('/signin');
              }}
            >
              더 알아보기
            </button>
          </div>
        </div>
        <div className="bg-[url(https://github.com/jinoc-git/traduler-project/assets/92218638/3bd144d0-2c5e-4521-983b-bf381d29b19c)] bg-cover bg-no-repeat w-[900px] h-[400px] mr-[-200px]" />
      </div>
      <div
        className="text-[30px] font-bold text-center text-blue underline underline-offset-[6px] my-[120px] cursor-pointer"
        onClick={() => {
          navigate('/signin');
        }}
      >
        로그인하고 사용해보기
      </div>
    </div>
  );
};

export default Landing;
