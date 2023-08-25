import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { signOutForSB } from '@api/supabaseAuth';
import { userStore } from '@store/userStore';

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
    <header className="flex justify-between">
      <h1
        onClick={() => {
          navigate('/');
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
        >
          회원가입
        </button>
      ) : (
        <button
          onClick={() => {
            navigate('/signin');
          }}
        >
          로그인
        </button>
      )}
    </header>
  );
};

export default Header;
