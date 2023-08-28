import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { signOutForSB } from '@api/supabaseAuth';
import { ic_menu_1x } from '@assets/icons/1x';
import { useSidebarStore } from '@store/sidebarStore';
import { userStore } from '@store/userStore';

const Header = () => {
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();
  console.log(hash);

  const authObserver = userStore((state) => state.authObserver);
  const resetUser = userStore((state) => state.resetUser);
  const user = userStore((state) => state.user);

  const isMenuOpen = useSidebarStore((state) => state.isMenuOpen);
  const toggleMenu = useSidebarStore((state) => state.toggleMenu);

  const onClickSignOutHandler = async () => {
    await signOutForSB();
    resetUser();
    navigate('/');
    // 추가사항
    toggleMenu();
  };

  useEffect(() => {
    authObserver();
  }, [user]);

  return (
    <header
      className={`flex justify-between fixed w-screen p-3 ml-1 ${
        isMenuOpen ? '' : 'bg-opacity-70'
      }`}
    >
      <div className=" flex items-center ">
        <div
          className={`cursor-pointer  bg-gray-200 ${
            isMenuOpen ? 'mt-0' : 'mt-0'
          }`}
          onClick={toggleMenu} // Toggle the menu when clicking the icon
        >
          <img src={ic_menu_1x} alt="Menu Icon" />
        </div>
        {/* <div className="cursor-pointer" onClick={toggleMenu}>
        ☰
      </div> */}
        <h1
          onClick={() => {
            navigate('/main');
          }}
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
