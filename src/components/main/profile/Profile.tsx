import React, { useState } from 'react';

import { ic_profile_3x } from '@assets/icons/3x';
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
    <section>
      <div className="flex items-center gap-[40px] mt=[150px] main-layout">
        <img
          src={
            user !== null && typeof profileImg === 'string'
              ? profileImg
              : ic_profile_3x
          }
          onClick={onClickOpenModalHandler}
          className="w-[85px] h-[85px] rounded-full object-cover border cursor-pointer bg-white"
        />
        <p className="text-white text-base">
          <span className="cursor-pointer" onClick={onClickOpenModalHandler}>
            {user?.nickname}
          </span>
          님의 여행계획
        </p>
      </div>
      {isEditModalOpen && <EditProfileModal handler={setIsEditModalOpen} />}
    </section>
  );
};

export default Profile;
