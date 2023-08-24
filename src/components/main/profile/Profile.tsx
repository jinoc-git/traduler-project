import React, { useState } from 'react';

import { defaultImage } from '@assets/index';
import { userStore } from '@store/userStore';

import EditProfileModal from './EditProfileModal';

const Profile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const user = userStore((state) => state.user);

  const profileImg = user?.profileImg;

  const onClickOpenModalHandler = () => {
    setIsEditModalOpen(true);
  };

  return (
    <>
      <div className="flex items-center gap-[40px] mt=[150px] main-layout">
        <img
          src={
            user !== null && typeof profileImg === 'string'
              ? profileImg
              : defaultImage
          }
          onClick={onClickOpenModalHandler}
          className="w-[85px] h-[85px] rounded-full ring ring-white object-cover cursor-pointer"
        />
        <p className="text-white text-base">
          <span className="cursor-pointer" onClick={onClickOpenModalHandler}>
            {user?.nickname}
          </span>
          님의 여행계획
        </p>
      </div>
      {isEditModalOpen && <EditProfileModal handler={setIsEditModalOpen} />}
    </>
  );
};

export default Profile;
