/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { getPlansWithBookmarks, getPlansWithMates } from '@api/plans';
import { ic_menu_1x } from '@assets/icons/1x';
import { logoColor } from '@assets/index';
import Loading from '@components/loading/Loading';
import useBooleanState from '@hooks/useBooleanState';
import { sideBarStore } from '@store/sideBarStore';
import { userStore } from '@store/userStore';
import { useQuery } from '@tanstack/react-query';

import SideBarETC from './SideBarETC';
import SideBarPlanList from './SideBarPlanList';
import SideBarStatus from './SideBarStatus';

const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const { isSideBarOpen, isVisibleSideBar, toggleMenu } = sideBarStore();
  const user = userStore((state) => state.user);

  const {
    value: bookMarkPlansOpen,
    toggleValue: toggleBookMarkPlansOpen,
    setNeedValue: setBookMarkNeedValue,
  } = useBooleanState(false);
  const {
    value: startPlansOpen,
    toggleValue: toggleStartPlansOpen,
    setNeedValue: setStartPlansNeedValue,
  } = useBooleanState(false);
  const {
    value: endPlansOpen,
    toggleValue: toggleEndPlansOpen,
    setNeedValue: setEndPlansNeedValue,
  } = useBooleanState(false);

  const { data: bookMarkPlanData } = useQuery(
    ['book_mark', 'plans', user?.id],
    async () => await getPlansWithBookmarks(user === null ? '' : user.id),
    { enabled: user !== null },
  );

  const onClickLogo = () => {
    navigate('/main');
  };

  const toggleSideBar = () => {
    toggleMenu();
    setBookMarkNeedValue(false);
    setStartPlansNeedValue(false);
    setEndPlansNeedValue(false);
  };

  // supabase데이터 뿌려주기
  const {
    data: matesData,
    isError: matesError,
  } = useQuery(
    ['plan_mates', user?.id],
    async () => {
      return await getPlansWithMates(user === null ? '' : user.id);
    },
    { enabled: user !== null },
  );

  if (matesData === null) {
    return <Loading />;
  }

  if (matesError) {
    return <div>오류</div>;
  }

  const sortedData = matesData?.plansData?.sort(
    (a, b) => new Date(a.dates[0]).getTime() - new Date(b.dates[0]).getTime(),
  );

  const startPlans = sortedData?.filter(
    (plan) => plan.plan_state === 'planning',
  );

  const endPlans = sortedData?.filter((plan) => plan.plan_state === 'end');

  const activePlan = sortedData?.find(
    (plan) => plan.plan_state === 'traveling',
  );
  const nextPlan = startPlans ? startPlans[0] : undefined;
  const hasNextPlan = Boolean(nextPlan);

  return isVisibleSideBar ? (
    <aside
      className={`fixed h-[100vh] w-[270px] border-r border-slate-300 rounded-r-[12px] px-[24px] z-[31] bg-white transition-all duration-300 ease-in-out overflow-hidden  ${
        isSideBarOpen ? 'w-[270px] ' : 'w-[88px]'
      }`}
    >
      <div
        className={` w-[222px] h-[70px] flex items-center gap-[34px] bg-white ${
          isSideBarOpen ? 'mt-0' : 'mt-0'
        }`}
      >
        <button
          onClick={toggleSideBar}
          className=" flex-center w-[40px] h-[40px]"
        >
          <img src={ic_menu_1x} alt="Menu Icon" />
        </button>
        <img
          src={logoColor}
          alt="로고"
          onClick={onClickLogo}
          className=" w-[134px] cursor-pointer"
        />
      </div>

      <div className="flex flex-col gap-[20px] ">
        <SideBarStatus
          isOpen={isSideBarOpen}
          activePlan={activePlan}
          hasNextPlan={hasNextPlan}
          nextPlan={nextPlan}
        />

        <div className="flex flex-col gap-2 min-h-[362px]">
          <p className="text-sm">TRIPS</p>
          <SideBarPlanList
            toggleFunc={toggleBookMarkPlansOpen}
            planList={bookMarkPlanData ?? []}
            filter="bookMark"
            isOpen={isSideBarOpen && bookMarkPlansOpen}
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

      <SideBarETC />
    </aside>
  ) : null;
};
export default SideBar;
