import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { signOutForSB } from '@api/supabaseAuth';
import IconAdd from '@assets/icons/IconAdd';
import IconSignOut from '@assets/icons/IconSignOut';
import { sideBarStore } from '@store/sideBarStore';
import { userStore } from '@store/userStore';

const SideBarETC = () => {
  const navigate = useNavigate();
  const resetUser = userStore((state) => state.resetUser);
  const { isSideBarOpen } = sideBarStore();

  const onClickAddPlan = () => {
    navigate('/addPlan');
  };

  const onClickSignOutHandler = async () => {
    await signOutForSB();
    toast.success('로그아웃에 성공하였습니다.');
    navigate('/signin');
    resetUser();
  };

  return (
    <div className="flex flex-col gap-2 mt-[20px]">
      <div
        onClick={onClickAddPlan}
        className={`flex items-center gap-4 w-[222px] rounded-[8px] cursor-pointer transition-colors duration-300 ease-in-out ${
          isSideBarOpen ? 'bg-navy w-[222px]' : 'bg-white w-[40px]'
        }`}
      >
        <button className="flex-center w-[40px] h-[40px] rounded-[8px] bg-navy">
          <IconAdd fill="#FFF" />
        </button>
        {isSideBarOpen && (
          <span className=" text-white">새 여행 계획 만들기</span>
        )}
      </div>
      <div
        onClick={onClickSignOutHandler}
        className={`flex items-center gap-4  w-[222px] rounded-[8px] cursor-pointer hover:bg-[#F6F6F6] ${
          isSideBarOpen ? 'w-[222px]' : 'w-[40px]'
        }`}
      >
        <button className="flex-center w-[40px] h-[40px]">
          <IconSignOut fill="#162F70" />
        </button>
        {isSideBarOpen && <span className=" text-navy">로그아웃</span>}
      </div>
    </div>
  );
};

export default SideBarETC;
