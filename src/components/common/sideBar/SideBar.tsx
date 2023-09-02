/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { getPlansWithBookmarks, getPlansWithMates } from '@api/plans';
import { signOutForSB } from '@api/supabaseAuth';
import { ic_menu_1x } from '@assets/icons/1x';
import IconAdd from '@assets/icons/IconAdd';
import IconSignOut from '@assets/icons/IconSignOut';
import { logoColor } from '@assets/index';
import useBooleanState from '@hooks/useBooleanState';
import { sideBarStore } from '@store/sideBarStore';
import { userStore } from '@store/userStore';
import { useQuery } from '@tanstack/react-query';

import SideBarPlanList from './SideBarPlanList';

const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const { isSideBarOpen, isVisibleSideBar, toggleMenu } = sideBarStore();
  const { resetUser, user } = userStore();

  const { value: favoritePlansOpen, toggleValue: toggleFavoritePlansOpen } =
    useBooleanState(false);
  const { value: startPlansOpen, toggleValue: toggleStartPlansOpen } =
    useBooleanState(false);
  const { value: endPlansOpen, toggleValue: toggleEndPlansOpen } =
    useBooleanState(false);

  const { data: bookMarkPlanData } = useQuery(
    ['book_mark', 'plans', user?.id],
    async () => await getPlansWithBookmarks(user === null ? '' : user.id),
    { enabled: user !== null },
  );

  const onClickSignOutHandler = async () => {
    await signOutForSB();
    resetUser();
    navigate('/main');
    toggleMenu();
  };

  // supabase데이터 뿌려주기
  const {
    data: matesData,
    isLoading: matesLoading,
    isError: matesError,
  } = useQuery(
    ['plan_mates', user?.id],
    async () => {
      return await getPlansWithMates(user === null ? '' : user.id);
    },
    { enabled: user !== null },
  );

  if (matesData === null) {
    return <div>로딩중 ...</div>;
  }

  if (matesLoading) {
    return <div>로딩중 ..</div>;
  }
  if (matesError) {
    return <div>오류</div>;
  }

  const sortedData = matesData.plansData?.sort(
    (a, b) => new Date(a.dates[0]).getTime() - new Date(b.dates[0]).getTime(),
  );

  const endPlans = sortedData?.filter((plan) => plan.plan_state === 'end');

  const startPlans = sortedData?.filter(
    (plan) => plan.plan_state === 'planning',
  );

  return isVisibleSideBar ? (
    <aside
      className={`fixed h-[100vh] w-[270px] bg-white transition-all duration-300 ease-in-out overflow-hidden border-r-10 px-[24px] z-[31] ${
        isSideBarOpen ? 'w-[270px] ' : 'w-[88px]'
      }`}
    >
      <div
        className={`cursor-pointer w-[222px] h-[70px] flex items-center gap-[34px] bg-white ${
          isSideBarOpen ? 'mt-0' : 'mt-0'
        }`}
      >
        <button onClick={toggleMenu} className=" flex-center w-[40px] h-[40px]">
          <img src={ic_menu_1x} alt="Menu Icon" />
        </button>
        <img src={logoColor} alt="로고" className=" w-[134px]" />
      </div>

      <div className="flex flex-col gap-[20px]">
        <div className="h-[223px]">
          <div className=" text-sm">여행중</div>
        </div>
        <div className="flex flex-col gap-2 min-h-[362px]">
          <p className="text-sm">TRIPS</p>
          <SideBarPlanList
            toggleFunc={toggleFavoritePlansOpen}
            planList={bookMarkPlanData ?? []}
            filter="bookMark"
            isOpen={isSideBarOpen && favoritePlansOpen}
          />
          <SideBarPlanList
            toggleFunc={toggleStartPlansOpen}
            planList={startPlans ?? []}
            filter="start"
            isOpen={isSideBarOpen && startPlansOpen}
          />
          <SideBarPlanList
            toggleFunc={toggleEndPlansOpen}
            planList={endPlans ?? []}
            filter="end"
            isOpen={isSideBarOpen && endPlansOpen}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div
          className={`flex items-center gap-4 rounded-[8px] transition-colors duration-300 ease-in-out ${
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
          className={`flex items-center gap-4  w-[222px] rounded-[8px] cursor-pointer ${
            isSideBarOpen ? 'w-[222px]' : 'w-[40px]'
          }`}
        >
          <button className="flex-center w-[40px] h-[40px]">
            <IconSignOut fill="#162F70" />
          </button>
          {isSideBarOpen && <span className=" text-navy">로그아웃</span>}
        </div>
      </div>
    </aside>
  ) : null;
};
export default SideBar;
