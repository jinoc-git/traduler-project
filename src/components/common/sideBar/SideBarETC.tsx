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
    <div className="flex flex-col gap-2 mt-[20px] ">
      <div
        onClick={onClickAddPlan}
        className={`group/side flex items-center gap-4 rounded-[8px] hover:bg-navy_dark  cursor-pointer 
          md:w-[222px] 
          sm:w-[310px]
        ${isSideBarOpen ? 'bg-navy w-[222px]' : 'bg-white md:w-[40px]'}`}
      >
        <button className="flex-center w-[40px] h-[40px] rounded-[8px] bg-navy group-hover/side:bg-navy_dark ">
          <IconAdd w="w-[16px]" h="h-[16px]" fill="#FFF" />
        </button>
        {isSideBarOpen && (
          <span className=" text-white">새 여행 계획 만들기</span>
        )}
      </div>
      <div
        onClick={onClickSignOutHandler}
        className={`flex items-center gap-4  w-[222px] rounded-[8px] cursor-pointer hover:bg-[#F6F6F6] 
          md:w-[222px] 
          sm:w-[310px]
        ${isSideBarOpen ? 'w-[222px]' : 'md:w-[40px]'}`}
      >
        <button className="flex-center w-[40px] h-[40px]">
          <IconSignOut w="w-[20px]" h="h-[21px]" fill="#162F70" />
        </button>
        {isSideBarOpen && <span className=" text-navy">로그아웃</span>}
      </div>
    </div>
  );
};

export default SideBarETC;
