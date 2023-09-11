import React, { useState } from 'react';

import IconEditDefault from '@assets/icons/IconEditDefault';
import IconUserDefault from '@assets/icons/IconUserDefault';
import EditProfileModal from '@components/main/profile/EditProfileModal';
import { userStore } from '@store/userStore';

const Profile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const user = userStore((state) => state.user);

  const profileImg = user?.profileImg;

  const onClickOpenModalHandler = () => {
    setIsEditModalOpen(true);
  };

  return (
    <section>
      <div
        className="flex items-center main-layout mt=[150px]
      sm:gap-[16px] 
      md:gap-[40px]"
      >
        <div
          onClick={onClickOpenModalHandler}
          className="relative rounded-full object-cover cursor-pointer hover:opacity-75
          sm:w-[66px] sm:h-[66px] 
          md:w-[85px] md:h-[85px]"
        >
          {user !== null && typeof profileImg === 'string' ? (
            <img
              src={profileImg}
              className="rounded-full border-[2.5px] border-blue_light_1 object-cover cursor-pointer
              sm:w-[66px] sm:h-[66px]
              md:w-[85px] md:h-[85px]"
            />
          ) : (
            <IconUserDefault
              w="sm:w-[66px] md:w-[85px]"
              h="sm:h-[66px] md:h-[85px]"
            />
          )}
          <div
            className="absolute flex items-center justify-center  rounded-full bg-white  border-gray cursor-pointer
          sm:w-[20px] sm:h-[20px] sm:top-[46px] sm:left-[46px] sm:border-[1.5px]
          md:w-[24px] md:h-[24px] md:top-[60px] md:left-[60px] md:border-[2px]"
          >
            <IconEditDefault w="w-[14px]" h="h-[12px]" fill="gray" />
          </div>
        </div>
        <p className="text-white text-base font-Regular sm:text-[16px] md:text-xlg">
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
