/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ic_profile_3x } from '@assets/icons/3x';
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

  const { setVisibilityIcon, isSideBarOpen, setMenuIsOpen } = sideBarStore();

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
      if (pathname === '/') {
        setVisibilityIcon(false);
      } else {
        setMenuIsOpen(true);
        setVisibilityIcon(true);
      }
      if (pathname === '/signin' || pathname === '/signup') {
        navigate('/main');
      }
    }
  }, [user, pathname, isLogin]);

  return (
    <header
      className={`flex justify-between items-center fixed w-screen h-[70px] pr-3 z-30 ${
        pathname !== '/'
          ? user !== null
            ? 'bg-transparent'
            : 'bg-bg_white'
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center ">
        <h1 onClick={goToMain} className=" ml-[88px] cursor-pointer">
          {pathname === '/main' ? (
            isSideBarOpen ? (
              <img
                src={logoColor}
                alt="로고"
                className=" w-[134px] ml-[10px]"
              />
            ) : (
              <img
                src={logoWhite}
                alt="로고"
                className=" w-[134px] ml-[10px]"
              />
            )
          ) : (
            <img src={logoColor} alt="로고" className=" w-[134px] ml-[10px]" />
          )}
        </h1>
      </div>
      {user !== null ? (
        pathname !== '/main' ? (
          <div className="flex-center w-[70px] h-[50px]">
            {/* <img
              src={user.profileImg !== null ? user.profileImg : ic_profile_3x}
              alt="프로필 이미지"
              className=" w-[37px] h-[37px] object-cover rounded-full border"
            /> */}
            {user.profileImg != null ? (
              <img
                src={user.profileImg !== null ? user.profileImg : ic_profile_3x}
                alt="프로필 이미지"
                className=" w-[37px] h-[37px] object-cover rounded-full border"
              />
            ) : (
              <div className="rounded-full border border-navy opacity-[50%]">
                <div className="rounded-full border border-#C9C3C3 opacity-[50%]">
                  <IconUserDefault w={'37'} h={'37'} />
                </div>
              </div>
            )}
          </div>
        ) : null
      ) : pathname === '/' ? (
        <div>
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
            className={`w-[147px] ${pathname === '/' ? 'text-white' : ''}`}
          >
            회원가입
          </button>
        </div>
      ) : pathname === '/signin' ? (
        <button
          onClick={() => {
            navigate('/signup');
          }}
          className="w-[147px]"
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
