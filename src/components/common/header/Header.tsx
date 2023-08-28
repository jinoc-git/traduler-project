import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { signOutForSB } from '@api/supabaseAuth';
import { ic_menu_1x, ic_profile_1x } from '@assets/icons/1x';
import useBooleanState from '@hooks/useBooleanState';
import { sideBarStore } from '@store/sideBarStore';
import { userStore } from '@store/userStore';

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { value: isMenuOpen, toggleValue: toggleIsMenuOpen } =
    useBooleanState(false);

  const authObserver = userStore((state) => state.authObserver);
  const resetUser = userStore((state) => state.resetUser);
  const user = userStore((state) => state.user);

  const { isSideBarOpen, toggleMenu, isVisibleSideBar, setVisibilityIcon } =
    sideBarStore((state) => state);

  const onClickSignOutHandler = async () => {
    await signOutForSB();
    resetUser();
    navigate('/');
    // 추가사항
    toggleMenu();
  };

  useEffect(() => {
    authObserver();
    if (user === null) {
      setVisibilityIcon(false);
    } else {
      setVisibilityIcon(true);
    }
  }, [user]);

  return (
    <header
      className={`flex justify-between fixed w-screen pr-3 ${
        isSideBarOpen ? '' : 'bg-opacity-70'
      }`}
    >
      <div className=" flex items-center">
        {isVisibleSideBar && (
          <div
            className={`cursor-pointer w-[50px] h-[60px] flex items-center justify-center mr-[10px] bg-gray-200 ${
              isSideBarOpen ? 'mt-0' : 'mt-0'
            }`}
            onClick={toggleMenu}
          >
            <img src={ic_menu_1x} alt="Menu Icon" />
          </div>
        )}

        <h1
          onClick={() => {
            navigate('/main');
          }}
          className=" cursor-pointer"
        >
          LOGO
        </h1>
      </div>
      {user !== null ? (
        <div>
          <button
            onClick={onClickSignOutHandler}
            className="flex justify-center items-center w-[70px] h-[60px]"
          >
            <img
              src={user.profileImg !== null ? user.profileImg : ic_profile_1x}
              alt="프로필 이미지"
            />
          </button>
          {/* <button onClick={onClickSignOutHandler}>로그아웃</button> */}
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
          className="w-[147px]"
        >
          로그인
        </button>
      )}
    </header>
  );
};

export default Header;
