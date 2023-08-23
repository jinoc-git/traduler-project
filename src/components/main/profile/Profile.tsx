import React from 'react';

import { defaultImage } from '@assets/index';
import { userStore } from '@store/userStore';

const Profile = () => {
  const user = userStore((state) => state.user);
  const profileImg = user?.profileImg;

  return (
    <div className="flex items-center gap-[40px] main-layout">
      <img
        src={
          profileImg !== null && profileImg !== undefined
            ? profileImg
            : defaultImage
        }
        className="w-[85px] h-[85px] rounded-full ring ring-white"
      />
      <p className="text-white text-base">{user?.nickname}님의 여행계획</p>
    </div>
  );
};

export default Profile;
