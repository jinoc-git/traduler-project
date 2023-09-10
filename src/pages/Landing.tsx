import React from 'react';
import { useNavigate } from 'react-router-dom';

import IconMapDefault from '@assets/icons/IconMapDefault';
import Footer from '@components/common/footer/Footer';
import { screenStore } from '@store/screenStore';

const Landing = () => {
  const navigate = useNavigate();
  const screenSize = screenStore((state) => state.screenSize);
  console.log(screenSize);

  return (
    <>
      <main className="flex flex-col justify-center">
        <section
          className="bg-[url(https://github.com/jinoc-git/traduler-project/assets/92218638/6902748c-7ce5-49e4-acf2-68938fbd7809)] bg-cover bg-no-repeat flex-center
        md:h-[100vh]
        sm:w-[100vw] sm:h-[70vh] 
        "
        >
          <div className="md:w-[1030px] md:h-[245px] sm:mt-[-60px]">
            {screenSize === 'md' && (
              <p className="flex items-center gap-[10px] text-yellow font-normal text-[36px]">
                <IconMapDefault w="50" h="50" fill="#FFC803" />
                It`s time to travel
              </p>
            )}
            <div className="flex items-center md:gap-[23px] md:flex-row sm:flex-col sm:items-start sm:gap-[10px]">
              {screenSize === 'sm' && (
                <IconMapDefault w="50" h="50" fill="#fff" />
              )}
              <h3 className="font-light text-white md:text-[55px] sm:text-[36px]">
                너와 나의 &nbsp;
                {screenSize === 'sm' && <br />}
                여행 연결고리
              </h3>
            </div>
            <p className="font-normal text-white md:text-xlg md:mt-[35px] sm:mt-[15px]">
              Traduler 와 함께 더 쉽고 빠르고 간편한
            </p>
            <p className="font-normal text-white md:text-xlg">
              모두가 행복한 평화로운 여행을 만들어보세요!
            </p>
          </div>
        </section>
        <section
          className=" mx-auto md:w-[1130px] md:mt-[43px] md:flex-row md:flex-none
        sm:flex sm:flex-col sm:items-center sm:w-[310px] sm:mt-[30px] sm:px-[20px] "
        >
          {screenSize === 'sm' && (
            <>
              <p className="md:text-[36px] font-semibold sm:text-[16px]">
                가족여행, 엠티, 수련회, 우정여행, 효도여행..
              </p>
              <p className="font-normal md:text-xlg sm:text-[12px]">
                단체 여행 깔끔하게 진행시키는 우리만의 여행 전용 비서
              </p>
            </>
          )}
          <div
            className="bg-[url(https://github.com/jinoc-git/traduler-project/assets/92218638/0e1b3853-feb7-45bb-b861-8cbcfd4505f3)] bg-contain bg-no-repeat 
            md:w-[926px] md:h-[557px] sm:w-[238px] sm:h-[138px]"
          >
            <div
              className="bg-[url(https://github.com/jinoc-git/traduler-project/assets/92218638/31c7fba6-a39c-48dc-9cde-42d8fb4518e7)] bg-contain bg-no-repeat relative 
            lg:top-[300px] lg:right-[-560px]
            md:top-[350px] md:right-[-475px] md:w-[552px] md:h-[334px] 
            sm:top-[90px] sm:right-[-130px] sm:w-[143px] sm:h-[89px]
            "
            />
          </div>
        </section>
        <section className="flex flex-col mx-auto">
          {screenSize !== 'sm' && (
            <>
              <p className="text-[36px] font-semibold mt-[180px]">
                가족여행, 엠티, 수련회, 우정여행, 효도여행..
              </p>
              <p className="font-normal text-xlg">
                단체 여행 깔끔하게 진행시키는 우리만의 여행 전용 비서
              </p>
            </>
          )}
        </section>
        <section
          className="md:flex md:flex-row md:justify-center md:mr-[150px]
        "
        >
          {screenSize === 'sm' && (
            <p className="text-[16px] font-semibold text-gray_dark_1 mt-[55px] text-center">
              다녀온 후에도 모두가 오래오래 추억할 수 있게
            </p>
          )}
          {screenSize === 'sm' ? (
            <div className="flex justify-center gap-[5px] w-[310px] h-[57px] mt-[10px] mx-auto">
              <div className="bg-[url(https://github.com/jinoc-git/traduler-project/assets/132889294/6918c0fb-6695-4bf3-8b8d-57c5799e94c4)] bg-cover bg-no-repeat w-[83px] h-[57px]" />
              <div className="bg-[url(https://github.com/jinoc-git/traduler-project/assets/132889294/c3d78bf7-86f2-4261-83d8-009d1e9bf015)] bg-cover bg-no-repeat w-[83px] h-[57px]" />
              <div className="bg-[url(https://github.com/jinoc-git/traduler-project/assets/132889294/16f6be17-1241-4319-b719-27dbf172336d)] bg-cover bg-no-repeat w-[83px] h-[57px]" />
            </div>
          ) : (
            <>
              <div className="bg-[url(https://github.com/jinoc-git/traduler-project/assets/92218638/2d3373dd-d9ba-49a2-817d-ada04da2e7e4)] bg-cover bg-no-repeat w-[500px] h-[220px] mr-[-200px]" />
              <div className="bg-[url(https://github.com/jinoc-git/traduler-project/assets/92218638/070e09ea-78c4-4cd3-9b29-6680aeba46a4)] bg-cover bg-no-repeat w-[500px] h-[220px] mr-[-200px]" />
              <div className="bg-[url(https://github.com/jinoc-git/traduler-project/assets/92218638/5e648670-6f6e-4737-9837-38bcac619925)] bg-cover bg-no-repeat w-[500px] h-[220px] mr-[-200px]" />
            </>
          )}
        </section>
        {screenSize !== 'sm' && (
          <p className="text-[36px] font-semibold text-gray_dark_1 mt-[155px] text-center">
            다녀온 후에도 모두가 오래오래 추억할 수 있게
          </p>
        )}

        <section
          className="flex mx-auto md:flex-row md:mt-[42px] md:w-[1130px]
          sm:flex-col sm:w-[310px]
        "
        >
          <div
            className="flex md:flex-row md:mr-[50px] md:mt-0 
          sm:flex-col sm:mx-auto sm:mt-[45px] "
          >
            <div>
              <p className="font-semibold text-gray_dark_1  md:text-xlg sm:text-[16px]">
                지난 여행 저장소
              </p>
              <div className="text-gray_dark_1 mt-[11px] mb-[16px]">
                <p>시간은 흘러도 우리의 추억은 계속된다!</p>
                <br />
                <p>보고 또 봐도 다시 보고 싶은 최애 영화처럼,</p>
                <p>
                  그리울 때 마다 꺼내 보는
                  {screenSize === 'sm' && <br />}
                  나만의 추억 여행 타임 캡슐
                </p>
              </div>
              {screenSize !== 'sm' && (
                <button
                  className="p-3 border rounded-lg border-blue w-[130px] text-blue hover:bg-blue_light_1 duration-200"
                  onClick={() => {
                    navigate('/signin');
                  }}
                >
                  더 알아보기
                </button>
              )}
            </div>
            <div
              className="bg-[url(https://github.com/jinoc-git/traduler-project/assets/92218638/c262d083-dc9a-4101-913f-f83f70eb3ba3)] bg-cover bg-no-repeat 
          md:w-[900px] md:h-[400px] md:mr-[-200px] md:mt-0
          sm:w-[263px] sm:h-[116px] sm:mx-auto sm:mt-[30px]
          "
            />
          </div>
          {screenSize === 'sm' && (
            <button
              className="flex-center border rounded-lg border-blue w-[100px] h-[32px] text-[14px] mx-auto mt-[30px] text-blue hover:bg-blue_light_1 duration-200"
              onClick={() => {
                navigate('/signin');
              }}
            >
              더 알아보기
            </button>
          )}
        </section>
        <p
          className=" font-bold text-center text-blue underline underline-offset-[6px] mx-auto p-3 cursor-pointer
          md:text-[30px] md:my-[120px] md:w-[300px]
          sm:text-[17px] sm:mt-[40px] sm:mb-[30px] sm:w-[180px] 
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
