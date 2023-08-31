import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { signOutForSB } from '@api/supabaseAuth';
import { ic_menu_1x } from '@assets/icons/1x';
import { ic_profile_3x } from '@assets/icons/3x';
import { signOutDropDown } from '@assets/index';
import useBooleanState from '@hooks/useBooleanState';
import { sideBarStore } from '@store/sideBarStore';
import { userStore } from '@store/userStore';

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const {
    value: isMenuOpen,
    toggleValue: toggleIsMenuOpen,
    setNeedValue: setIsMenuOpen,
  } = useBooleanState(false);

  const authObserver = userStore((state) => state.authObserver);
  const resetUser = userStore((state) => state.resetUser);
  const user = userStore((state) => state.user);

  const { isSideBarOpen, toggleMenu, isVisibleSideBar, setVisibilityIcon } =
    sideBarStore((state) => state);

  const onClickSignOutHandler = async () => {
    await signOutForSB();
    resetUser();
    navigate('/main');
    setIsMenuOpen(false);
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
      className={`flex justify-between fixed w-screen h-[50px] pr-3 bg-blue_light_3 z-30 ${
        isSideBarOpen ? '' : 'bg-opacity-70'
      }`}
    >
      <div className=" flex items-center">
        {isVisibleSideBar && (
          <div
            className={`cursor-pointer w-[50px] h-[50px] flex items-center justify-center mr-[10px] bg-gray_light_2 ${
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
        <div className="relative">
          <button
            onBlur={toggleIsMenuOpen}
            onClick={toggleIsMenuOpen}
            className="flex justify-center items-center w-[70px] h-[50px]"
          >
            <img
              src={user.profileImg !== null ? user.profileImg : ic_profile_3x}
              alt="프로필 이미지"
              className=" w-[37px] h-[37px] object-cover rounded-full border"
            />
          </button>
          {isMenuOpen && (
            <div
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              onClick={onClickSignOutHandler}
              className=" absolute -bottom-[55px] right-[10px] w-[100px] rounded-md cursor-pointer"
            >
              <img src={signOutDropDown} alt="로그아웃" />
            </div>
          )}
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
