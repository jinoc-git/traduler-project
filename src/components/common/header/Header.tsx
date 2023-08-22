import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { signOutForSB } from '@api/supabaseAuth';
import { userStore } from '@store/userStore';

const Header = () => {
  const navigate = useNavigate();

  const authObserver = userStore((state) => state.authObserver);
  const resetUser = userStore((state) => state.resetUser);
  const user = userStore((state) => state.user);

  const onClickSignOutHandler = async () => {
    await signOutForSB();
    resetUser();
  };

  useEffect(() => {
    authObserver();
  }, [user]);

  return (
    <header>
      <h1
        onClick={() => {
          navigate('/');
        }}
      >
        LOGO
      </h1>
      {user !== null ? (
        <button onClick={onClickSignOutHandler}>로그아웃</button>
      ) : (
        <div>
          <button
            onClick={() => {
              navigate('/signin');
            }}
          >
            로그인
          </button>{' '}
          &nbsp;
          <button
            onClick={() => {
              navigate('/signup');
            }}
          >
            회원가입
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
