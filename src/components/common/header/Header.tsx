import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { signOutForSB } from '@api/supabaseAuth';
import { ic_menu_1x } from '@assets/icons/1x';
import { useSidebarStore } from '@store/sidebarStore';
import { userStore } from '@store/userStore';

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const authObserver = userStore((state) => state.authObserver);
  const resetUser = userStore((state) => state.resetUser);
  const user = userStore((state) => state.user);

  const { isMenuOpen, toggleMenu, isVisibleSideBar, setVisibilityIcon } =
    useSidebarStore((state) => state);

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
        isMenuOpen ? '' : 'bg-opacity-70'
      }`}
    >
      <div className=" flex items-center">
        {isVisibleSideBar && (
          <div
            className={`cursor-pointer w-[50px] h-[50px] flex items-center justify-center mr-[10px] bg-gray-200 ${
              isMenuOpen ? 'mt-0' : 'mt-0'
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
        <button onClick={onClickSignOutHandler}>로그아웃</button>
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
