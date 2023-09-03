import React from 'react';

import LoadingGif from '@assets/loader-all-color.gif';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <img src={LoadingGif} alt="로딩 중..." />
    </div>
  );
};

export default Loading;
