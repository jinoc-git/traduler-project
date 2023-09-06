import React, { useState } from 'react';

import IconUserDefault from '@assets/icons/IconUserDefault';
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
        <div
          onClick={onClickOpenModalHandler}
          className="w-[85px] h-[85px] rounded-full object-cover cursor-pointer hover:opacity-60"
        >
          {user !== null && typeof profileImg === 'string' ? (
            <img
              src={profileImg}
              className="w-[85px] h-[85px] rounded-full border-[2.5px] border-blue_light_1 object-cover cursor-pointer "
            />
          ) : (
            <IconUserDefault w="85" h="85" />
          )}
        </div>
        <p className="text-white text-base text-xlg">
          <span className="cursor-pointer" onClick={onClickOpenModalHandler}>
            {user?.nickname}
          </span>
          님의 여행 계획
        </p>
      </div>
      {isEditModalOpen && <EditProfileModal handler={setIsEditModalOpen} />}
    </section>
  );
};

export default Profile;
