/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { getPlansWithBookmarks, getPlansWithMates } from '@api/plans';
import { signOutForSB } from '@api/supabaseAuth';
import {
  ic_chevron_down_1x,
  ic_chevron_up_1x,
  ic_favorite_default_1x,
  ic_planned_time_1x,
  ic_previous_time_1x,
} from '@assets/icons/1x';
import IconAdd from '@assets/icons/IconAdd';
import IconSignOut from '@assets/icons/IconSignOut';
import useBooleanState from '@hooks/useBooleanState';
import { sideBarStore } from '@store/sideBarStore';
import { userStore } from '@store/userStore';
import { useQuery } from '@tanstack/react-query';

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
    ['plans', user?.id],
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
    // 이런식으로 해야 이름표가달라져서 로그아웃 로그인 했을때 문제가안생긴다.
    // 네트워크 요청이 작아진다.
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
      className={`fixed mt-[50px] h-[100vh] w-[270px] bg-white transition-all duration-300 ease-in-out overflow-hidden border-r-10 px-[24px] ${
        isSideBarOpen ? 'w-[270px] ' : 'w-[88px]'
      }`}
      style={{ zIndex: 10 }}
    >
      <div className="flex flex-col gap-[20px]">
        <div className="h-[223px]">
          <div className=" text-sm">여행중</div>
        </div>
        <div className="flex flex-col gap-2 min-h-[362px]">
          <p className="text-sm">TRIPS</p>
          <div>
            <div
              className="flex w-[222px] justify-between items-center cursor-pointer"
              onClick={toggleFavoritePlansOpen}
            >
              <button className="flex justify-center items-center w-[40px] h-[40px] transition-all duration-300 ease-in-out">
                <img src={ic_favorite_default_1x} />
              </button>
              <div className="flex items-center">
                <span className="w-[110px] text-sm">즐겨찾기 한 목록 </span>
                <img src={ic_chevron_down_1x} alt="다운버튼" className="mr-5" />
              </div>
            </div>
            <ul>
              {isSideBarOpen &&
                favoritePlansOpen &&
                bookMarkPlanData?.map((book) => (
                  <li className="pl-[65px]" key={book.id}>
                    <p className="text-xs">{book.title}</p>
                    <p className="text-xs">{book.dates[0]}</p>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <div
              className="flex w-[222px] justify-between items-center cursor-pointer"
              onClick={toggleStartPlansOpen}
            >
              <button className="flex justify-center items-center w-[40px] h-[40px] transition-all duration-300 ease-in-out">
                <img src={ic_planned_time_1x} />
              </button>
              <div className="flex items-center">
                <span className="w-[110px] text-sm">예정된 여행 </span>
                <img
                  src={
                    isSideBarOpen && startPlansOpen
                      ? ic_chevron_up_1x
                      : ic_chevron_down_1x
                  }
                  alt="다운버튼"
                  className="mr-5"
                />
              </div>
            </div>
            <ul>
              {isSideBarOpen &&
                startPlansOpen &&
                startPlans?.map((plan) => {
                  return (
                    <li className="w-[270px] pl-[65px] my-[5px] " key={plan.id}>
                      <p className="text-xs">{plan.title}</p>
                      <span className="text-xs">
                        {plan.dates[0]} ~ {plan.dates[plan.dates.length - 1]}
                      </span>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div>
            <div
              className="flex w-[222px] justify-between items-center cursor-pointer"
              onClick={toggleEndPlansOpen}
            >
              <button className="flex justify-center items-center w-[40px] h-[40px] transition-all duration-300 ease-in-out">
                <img src={ic_previous_time_1x} />
              </button>
              <div className="flex items-center">
                <span className="w-[110px] text-sm">다녀온 여행 </span>
                <img
                  src={
                    isSideBarOpen && endPlansOpen
                      ? ic_chevron_up_1x
                      : ic_chevron_down_1x
                  }
                  alt="다운버튼"
                  className="mr-5"
                />
              </div>
            </div>
            <ul>
              {isSideBarOpen &&
                endPlansOpen &&
                endPlans?.map((plan) => {
                  return (
                    <li className="w-[270px] pl-[65px] my-[5px] " key={plan.id}>
                      <p className="text-xs">{plan.title}</p>
                      <span className="text-xs">
                        {plan.dates[0]} ~ {plan.dates[plan.dates.length - 1]}
                      </span>
                    </li>
                  );
                })}
            </ul>
          </div>
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
