import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { signOutForSB } from '@api/supabaseAuth';
import { userStore } from '@store/userStore';

const Header = () => {
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();
  console.log(hash)

  const authObserver = userStore((state) => state.authObserver);
  const resetUser = userStore((state) => state.resetUser);
  const user = userStore((state) => state.user);

  const onClickSignOutHandler = async () => {
    await signOutForSB();
    resetUser();
    navigate('/');
  };
  
  useEffect(() => {
    authObserver();
  }, [user]);

  return (
    <header className="flex justify-between fixed w-screen h-[52px] p-3">
      <h1
        onClick={() => {
          navigate('/main');
        }}
      >
        LOGO
      </h1>
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
