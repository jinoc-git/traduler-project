import React, { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPageFull = () => {
  const navigate = useNavigate();

  const goToMain = () => {
    navigate('/main');
  };

  useLayoutEffect(() => {
    navigate('/error');
  }, []);

  return (
    <div className="bg-[url(https://github.com/jinoc-git/traduler-project/assets/104746237/18bee0d6-3507-42d5-b42e-54c17173d077)] bg-no-repeat bg-center min-h-screen bg-70% flex flex-col items-center justify-center">
      <div className="mt-[400px]">
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
            className="cursor-pointer w-[140px] h-[36px] rounded-lg bg-gradient-to-r from-blue_dark to-blue text-white border border-blue_dark hover:bg-white hover:text-blue_dark hover:border-blue_dark"
          >
            홈으로
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPageFull;
