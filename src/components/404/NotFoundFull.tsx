import React, { useEffect } from 'react';

const NotFoundFull = () => {
  const goToMain = () => (window.location.href = '/main');

  useEffect(() => {
    const timeoutId = setTimeout(goToMain, 4000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <aside>
      <h1>페이지를 찾을 수 없습니다</h1>
      <p>페이지가 존재하지 않거나, 사용할 수 없는 페이지 입니다</p>
      <p>입력하신 주소가 정확한지 다시 한 번 확인해주세요</p>
      <button onClick={goToMain} className="cursor-pointer">
        메인페이지로 이동
      </button>
    </aside>
  );
};

export default NotFoundFull;
