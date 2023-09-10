/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { getPlansWithBookmarks, getPlanListAndMateList } from '@api/plans';
import IconMenu from '@assets/icons/IconMenu';
import { logoColor } from '@assets/index';
import SideBarETC from '@components/common/sideBar/SideBarETC';
import SideBarPlanList from '@components/common/sideBar/SideBarPlanList';
import SideBarStatus from '@components/common/sideBar/SideBarStatus';
import Loading from '@components/loading/Loading';
import useBooleanState from '@hooks/useBooleanState';
import { screenStore } from '@store/screenStore';
import { sideBarStore } from '@store/sideBarStore';
import { userStore } from '@store/userStore';
import { useQuery } from '@tanstack/react-query';

const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const { isSideBarOpen, isVisibleSideBar, isVisibleIcon, toggleMenu } =
    sideBarStore();
  const user = userStore((state) => state.user);
  const screenSize = screenStore((state) => state.screenSize);
  console.log(screenSize);

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

  const { data: matesData, isError: matesError } = useQuery(
    ['plan_mates', user?.id],
    async () => {
      return await getPlanListAndMateList(user === null ? '' : user.id);
    },
    { enabled: user !== null },
  );

  if (matesData === null) {
    return <Loading />;
  }

  if (matesError) {
    return <div>오류</div>;
  }

  const sortedData = matesData?.planDataList?.sort(
    (a, b) => new Date(a.dates[0]).getTime() - new Date(b.dates[0]).getTime(),
  );

  const startPlans = sortedData?.filter(
    (plan) => plan.plan_state === 'planning',
  );

  const endPlans = sortedData?.filter(
    (plan) => plan.plan_state === 'end' || plan.plan_state === 'recording',
  );

  const activePlan = sortedData?.find(
    (plan) => plan.plan_state === 'traveling',
  );
  const nextPlan = startPlans ? startPlans[0] : undefined;
  const hasNextPlan = Boolean(nextPlan);

  return (
    <>
      {isVisibleIcon && (
        <button
          onClick={toggleSideBar}
          className=" fixed left-[24px] flex-center z-[32]
          sm:w-[34px] sm:h-[34px] sm:top-[36px] 
          md:w-[39px] md:h-[40px] md:top-[15px]"
        >
          {/* <img src={ic_new_menu_1x} alt="Menu Icon" /> */}
          <IconMenu w="w-[24px]" h="h-[24px]" />
        </button>
      )}
      {isVisibleSideBar ? (
        // 기존코드
        // <aside
        //   className={`fixed h-[100vh] w-[270px] border-r border-slate-300 rounded-r-[12px] md:px-[24px] z-[31] overflow-hidden bg-white transition-all duration-300 ease-in-out  ${
        //     isSideBarOpen ? 'w-[270px] ' : 'md:w-[88px] sm:w-[0px] sm:px-0'
        //   }`}
        // >
        <aside
          className={`fixed h-[100vh] border-r border-slate-300 rounded-r-[12px] z-[31] overflow-hidden bg-white transition-all duration-300 ease-in-out  ${
            isSideBarOpen
              ? 'sm:w-[100vw] sm:px-[24px] md:w-[270px] md:px-[24px]  '
              : 'sm:w-[0px] sm:px-[0px] md:w-[88px] md:px-[24px]'
          }`}
        >
          <div
            // justify-between 추가
            className={`flex items-center bg-white
            sm:w-[311px] sm:h-[79px] sm:gap-[58px]
            md:w-[222px] md:h-[70px] md:gap-[34px] ${
              isSideBarOpen ? 'sm:mt-[12px] md:mt-0' : 'sm:mt-0 md:mt-0'
            }`}
          >
            <div
              className="flex
            sm:w-[32px] sm:h-[32px] 
            md:w-[39px] md:h-[40px]"
            />
            <img
              src={logoColor}
              alt="로고"
              onClick={onClickLogo}
              className="cursor-pointer w-[134px]"
            />
          </div>

          <div
            className="flex flex-col
            sm:gap-[40px] md:gap-[20px]"
          >
            <SideBarStatus
              isOpen={isSideBarOpen}
              activePlan={activePlan}
              hasNextPlan={hasNextPlan}
              nextPlan={nextPlan}
            />

            {/* <div
              className="flex flex-col gap-2
              sm:min-h-[407px] md:min-h-[382px]"
            > */}
            <div
              className={`flex flex-col ${
                isSideBarOpen ? 'sm:gap-[40px]' : 'md:gap-[20px]'
              } ${
                isSideBarOpen ? 'sm:min-h-[407px]' : 'md:min-h-[382px]'
              } mx-auto`}
            >
              <p className="text-sm">TRIPS</p>
              <SideBarPlanList
                toggleFunc={toggleBookMarkPlansOpen}
                setFunc={setBookMarkNeedValue}
                planList={bookMarkPlanData ?? []}
                filter="bookMark"
                isOpen={bookMarkPlansOpen}
              />
              <SideBarPlanList
                toggleFunc={toggleStartPlansOpen}
                setFunc={setStartPlansNeedValue}
                planList={startPlans ?? []}
                filter="start"
                isOpen={startPlansOpen}
              />
              <SideBarPlanList
                toggleFunc={toggleEndPlansOpen}
                setFunc={setEndPlansNeedValue}
                planList={endPlans ?? []}
                filter="end"
                isOpen={endPlansOpen}
              />
            </div>
          </div>
          <div className={`flex justify-center`}>
            <SideBarETC />
          </div>
        </aside>
      ) : null}
    </>
  );
};
export default SideBar;
