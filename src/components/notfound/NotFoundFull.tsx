import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { NotFoundImg } from '@assets/index';
import { sideBarStore } from '@store/sideBarStore';

const NotFoundFull = () => {
  const navigate = useNavigate();
  const setIsNotFoundPage = sideBarStore((set) => set.setIsNotFoundPage);

  const goToMain = () => {
    navigate('/welcome');
  };

  const goToBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    setIsNotFoundPage(true);
  }, []);

  const backgroundStyle: React.CSSProperties = {
    backgroundImage: `url('${NotFoundImg}')`,
    backgroundSize: '80%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={backgroundStyle}
    >
      <div className="mt-[240px]">
        <h1 className="text-center mb-4 text-gray_dark_2 text-xlg font-semibold">
          저런.. 길을 잃으셨군요!
        </h1>
        <p className="text-center mb-4 text-gray_dark_1">
          존재하지 않는 주소를 입력하셨거나,
        </p>
        <p className="text-center mb-4 text-gray_dark_1">
          요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={goToMain}
            className="cursor-pointer w-[140px] h-[36px] rounded-lg bg-white text-blue border border-blue hover:bg-blue_light_1 hover:text-blue_dark hover:border-blue_dark"
          >
            이전 페이지
          </button>
          <button
            onClick={goToBack}
            className="cursor-pointer w-[140px] h-[36px] rounded-lg bg-gradient-to-r from-blue_dark to-blue text-white border border-blue_dark hover:bg-white hover:text-blue_dark hover:border-blue_dark"
          >
            홈으로
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundFull;
