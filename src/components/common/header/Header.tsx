/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ic_profile_3x } from '@assets/icons/3x';
import { logoColor, logoWhite } from '@assets/index';
import { sideBarStore } from '@store/sideBarStore';
import { userStore } from '@store/userStore';

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const authObserver = userStore((state) => state.authObserver);
  const user = userStore((state) => state.user);

  const setVisibilityIcon = sideBarStore((state) => state.setVisibilityIcon);
  const isSideBarOpen = sideBarStore((state) => state.isSideBarOpen);

  const goToMain = () => {
    if (user !== null) {
      navigate('/main');
    }
  };

  useEffect(() => {
    authObserver();
    if (user === null) {
      setVisibilityIcon(false);
    } else {
      if (pathname === '/') {
        setVisibilityIcon(false);
      } else {
        setVisibilityIcon(true);
      }
    }
  }, [user, pathname]);

  return (
    <header
      className={`flex justify-between items-center fixed w-screen h-[70px] pr-3 z-30 ${
        user !== null ? 'bg-transparent' : 'bg-bg_white'
      }`}
    >
      <div className=" flex items-center">
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
            <img
              src={user.profileImg !== null ? user.profileImg : ic_profile_3x}
              alt="프로필 이미지"
              className=" w-[37px] h-[37px] object-cover rounded-full border"
            />
          </div>
        ) : null
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
          className="w-[147px]"
        >
          로그인
        </button>
      )}
    </header>
  );
};

export default Header;
