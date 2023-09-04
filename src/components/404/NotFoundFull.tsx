import React from 'react';

import { NotFoundImg } from '@assets/index';

const NotFoundFull = () => {
  const goToMain = () => (window.location.href = '/main');

  const backgroundStyle: React.CSSProperties = {
    backgroundImage: `url('${NotFoundImg}')`,
    backgroundSize: '50%', // 이미지를 커버하도록 설정
    backgroundPosition: 'center', // 이미지를 가운데 정렬
    backgroundRepeat: 'no-repeat', // 배경 이미지 반복 제거
    minHeight: '100vh', // 최소 높이를 화면 높이와 같도록 설정
  };

  // useEffect(() => {
  //   return () => {};
  // }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={backgroundStyle}
    >
      <h1 className="text-center text-black">저런.. 길을 잃으셨군요!</h1>
      <p>존재하지 않는 주소를 입력하셨거나,</p>
      <p>요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.</p>
      <button
        onClick={goToMain}
        className="cursor-pointer bg-white text-5E9FFF"
      >
        이전 페이지
      </button>
      <button className="bg-[5E9FFF] text-white px-4 py-2 mt-3">홈으로</button>
    </div>
  );
};

export default NotFoundFull;
