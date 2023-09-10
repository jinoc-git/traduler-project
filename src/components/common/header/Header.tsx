/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import IconUserDefault from '@assets/icons/IconUserDefault';
import { logoColor, logoWhite } from '@assets/index';
import { sideBarStore } from '@store/sideBarStore';
import { userStore } from '@store/userStore';

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const authObserver = userStore((state) => state.authObserver);
  const user = userStore((state) => state.user);
  const isLogin = localStorage.getItem('isLogin');

  const { setVisibilityIcon, isSideBarOpen, setMenuIsOpen, isNotFoundPage } =
    sideBarStore();

  const goToMain = () => {
    if (user !== null) {
      navigate('/main');
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    authObserver();
    if (isLogin === 'false') {
      setVisibilityIcon(false);
    } else {
      setMenuIsOpen(true);
      setVisibilityIcon(true);

      if (pathname === '/') {
        setVisibilityIcon(false);
      } else if (pathname === '/error') {
        setVisibilityIcon(false);
      } else {
        setVisibilityIcon(!isNotFoundPage);
      }
      if (pathname === '/signin' || pathname === '/signup') {
        navigate('/main');
      }
    }
  }, [user, pathname, isLogin, isNotFoundPage]);

  return (
    <header
      className={`flex justify-between items-center fixed w-screen pr-3 z-30
      sm: h-[89px] 
      md:h-[70px]
      ${
        pathname !== '/' && pathname !== '/signin' && pathname !== '/signup'
          ? user !== null
            ? 'bg-transparent'
            : 'bg-bg_white'
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center ">
        <h1
          onClick={goToMain}
          className=" cursor-pointer 
          sm:mt-[0px] sm:ml-[20px]
          md:mt-[0px] md:ml-[88px]"
        >
          {pathname === '/main' ? (
            isSideBarOpen ? (
              <img
                src={logoColor}
                alt="로고"
                className=" w-[134px] ml-[10px] "
              />
            ) : (
              <img src={logoWhite} alt="로고" className="w-[134px] ml-[10px]" />
            )
          ) : (
            <img
              src={logoColor}
              alt="로고"
              className=" 
            sm:w-[134px] sm:ml-[48px] 
            md:w-[134px] md:ml-[10px]
            "
            />
          )}
        </h1>
      </div>
      {user !== null ? (
        pathname !== '/main' ? (
          <div
            className="flex-center w-[70px] h-[50px]
          sm:mr-[16px] 
          md:mr-0"
          >
            {user.profileImg != null ? (
              <img
                src={user.profileImg}
                alt="프로필 이미지"
                className=" w-[37px] h-[37px] object-cover rounded-full border border-navy/50 "
              />
            ) : (
              <div className="rounded-full border border-navy/50 ">
                <IconUserDefault w="w-[37px]" h="h-[37px]" />
              </div>
            )}
          </div>
        ) : null
      ) : pathname === '/' ? (
        <div
          className="flex 
        sm:w-[147px] 
        md:w-[300px]"
        >
          <button
            onClick={() => {
              navigate('/signin');
            }}
            className={`w-[147px] ${pathname === '/' ? 'text-white' : ''}`}
          >
            로그인
          </button>
          <button
            onClick={() => {
              navigate('/signup');
            }}
            // className={`w-[147px] ${pathname === '/' ? 'text-white' : ''}`}
            className={`w-[147px] ${pathname === '/' ? 'text-white' : ''} ${
              pathname === '/' ? 'sm:hidden md:block md:w-[147px]' : ''
            }`}
          >
            회원가입
          </button>
        </div>
      ) : pathname === '/signin' ? (
        <button
          onClick={() => {
            navigate('/signup');
          }}
          className="w-[147px] "
        >
          회원가입
        </button>
      ) : (
        <button
          onClick={() => {
            navigate('/signin');
          }}
          className={`w-[147px] ${pathname === '/' ? 'text-white' : ''}`}
        >
          로그인
        </button>
      )}
    </header>
  );
};

export default Header;
