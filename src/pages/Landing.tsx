import React from 'react';
import { useNavigate } from 'react-router-dom';

import IconMapDefault from '@assets/icons/IconMapDefault';
import {
  landingGroupOne,
  landingGroupThree,
  landingGroupTwo,
  landingMain,
  landingMockup,
  landingMockupTwo,
} from '@assets/index';
import Footer from '@components/common/footer/Footer';
import { screenStore } from '@store/screenStore';

const Landing = () => {
  const navigate = useNavigate();
  const screenSize = screenStore((state) => state.screenSize);

  return (
    <>
      <main className="flex flex-col justify-center md:gap-y-[120px]">
        <section>
          <img
            src={landingMain}
            alt="랜딩 메인 이미지"
            className="w-[100vw] h-[520px] object-cover md:h-screen"
          />
          <div className="md:w-[1030px] md:h-[245px] md:-translate-y-full md:ml-[205px] sm:w-[280px] sm:mt-[-380px] sm:mx-auto sm:mb-[220px]">
            {screenSize !== 'sm' && (
              <p className="flex items-center gap-[10px] text-yellow font-normal text-[36px]">
                <IconMapDefault w="50" h="50" fill="#FFC803" />
                It`s time to travel
              </p>
            )}
            <div className="flex items-center md:gap-[23px] md:flex-row sm:flex-col sm:items-start sm:gap-[8px]">
              {screenSize === 'sm' && (
                <IconMapDefault w="50" h="50" fill="#fff" />
              )}
              <h3 className="font-bold text-white md:text-[55px] sm:text-[36px]">
                너와 나의 &nbsp;
                {screenSize === 'sm' && <br />}
                여행 연결고리
              </h3>
            </div>
            <p className="font-normal text-white md:text-xlg md:mt-[35px] sm:mt-[8px]">
              Traduler 와 함께 더 쉽고 빠르고 간편한
            </p>
            <p className="font-normal text-white md:text-xlg">
              모두가 행복한 평화로운 여행을 만들어보세요!
            </p>
          </div>
        </section>
        <section>
          <img
            src={landingMockup}
            alt="랜딩 목업 이미지"
            className="w-full h-auto"
          />
          <div className="text-center mt-[60px]">
            <p className=" md:text-[36px] font-semibold sm:text-[16px]">
              가족여행, 엠티, 수련회, 우정여행, 효도여행..
            </p>
            <p className="font-normal md:text-xlg sm:text-[12px]">
              단체 여행 깔끔하게 진행시키는 우리만의 여행 전용 비서
            </p>
          </div>
          <div className="flex justify-center gap-[5px] mt-[10px] mx-auto md:gap-[27px] md:mt-[65px]">
            <img
              src={landingGroupOne}
              alt="랜딩 그룹 이미지"
              className=" w-[83px] h-[57px] md:w-[359px] md:h-[246px] rounded-lg"
            />
            <img
              src={landingGroupTwo}
              alt="랜딩 그룹 이미지"
              className="w-[83px] h-[57px] md:w-[359px] md:h-[246px] rounded-lg"
            />
            <img
              src={landingGroupThree}
              alt="랜딩 그룹 이미지"
              className="w-[83px] h-[57px] md:w-[359px] md:h-[246px] rounded-lg"
            />
          </div>
        </section>
        <section className="flex flex-col mx-auto">
          <p className="text-[16px] font-semibold mt-[55px] text-center md:text-[36px]">
            다녀온 후에도 모두가 오래오래 추억할 수 있게
          </p>
          <div className="md:flex md:flex-row-reverse">
            <img
              src={landingMockupTwo}
              alt="랜딩 그룹 이미지"
              className="w-[200px] h-[124px] md:w-[750px] md:h-[454px] rounded-lg mx-auto mt-[16px]"
            />
            <div
              className="flex mx-auto md:flex-row md:mt-[42px]
          sm:flex-col md:mr-[82px]
        "
            >
              <div
                className="flex md:flex-row  md:mt-0 
          sm:flex-col sm:mx-auto sm:mt-[45px] "
              >
                <div className="md:flex md:flex-col">
                  <div>
                    <p className="font-semibold md:text-xlg sm:text-[16px]">
                      지난 여행 저장소
                    </p>
                    <div className="mt-[11px] mb-[16px]">
                      <p>시간은 흘러도 우리의 추억은 계속된다!</p>
                      <br />
                      <p>보고 또 봐도 다시 보고 싶은 최애 영화처럼,</p>
                      <p>
                        그리울 때 마다 꺼내 보는
                        <br />
                        나만의 추억 여행 타임 캡슐
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center mt-[25px] md:justify-start">
                    <button
                      className="p-[9px] border rounded-lg border-blue w-[100px] text-blue hover:bg-blue_light_1 duration-200 font-bold text-sm md:w-[130px]"
                      onClick={() => {
                        navigate('/signin');
                      }}
                    >
                      더 알아보기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <p
          className=" font-bold text-center text-blue underline underline-offset-[6px] mx-auto p-3 cursor-pointer
          md:text-[30px] md:mb-[120px] md:w-[300px]
          sm:text-[17px] sm:mt-[20px] sm:mb-[30px] sm:w-[180px] 
          "
          onClick={() => {
            navigate('/signin');
          }}
        >
          로그인하고 사용해보기
        </p>
      </main>
      <Footer />
    </>
  );
};

export default Landing;
