/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { getPlansWithMates } from '@api/plans';
import { signOutForSB } from '@api/supabaseAuth';
import {
  ic_chevron_down_1x,
  ic_chevron_up_1x,
  ic_favorite_default_1x,
  ic_planned_time_1x,
  ic_previous_time_1x,
} from '@assets/icons/1x';
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
    ['plan_mates', user],
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
      className={`fixed mt-[50px] h-[100vh] w-[250px] bg-gray_light_2 transition-all duration-300 ease-in-out overflow-hidden border-r-10 ${
        isSideBarOpen ? 'w-[250px] ' : 'w-[50px]'
      }`}
      style={{ zIndex: 10 }}
    >
      <div className="flex flex-col gap-[20px]">
        <div>
          <div>여행중</div>
        </div>
        <div>
          <div
            className="flex w-[250px] justify-between items-center cursor-pointer"
            onClick={toggleFavoritePlansOpen}
          >
            <button className="flex justify-center items-center w-[50px] h-[50px] transition-all duration-300 ease-in-out">
              <img src={ic_favorite_default_1x} />{' '}
            </button>
            <span className="w-[121px]">즐겨찾기 한 목록 </span>
            <img src={ic_chevron_down_1x} alt="다운버튼" className="mr-5" />
          </div>
          <ul>
            {isSideBarOpen && favoritePlansOpen && (
              // 여기에 즐겨찾기 리스트 map
              <li className="pl-[65px]">
                <p className="text-sm"> 장소 이름(기간)</p>
                <p className="text-sm">장소 이름(기간)</p>
                <p className="text-sm">장소 이름(기간)</p>
              </li>
            )}
          </ul>
        </div>

        <div>
          <div
            className="flex w-[250px] justify-between items-center cursor-pointer"
            onClick={toggleStartPlansOpen}
          >
            <button className="flex justify-center items-center w-[50px] h-[50px] transition-all duration-300 ease-in-out">
              <img src={ic_planned_time_1x} />
            </button>
            <span className="w-[121px]">예정된 여행 </span>
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
          <ul>
            {isSideBarOpen &&
              startPlansOpen &&
              startPlans?.map((plan) => {
                return (
                  <li className="w-[250px] pl-[65px] my-[5px] " key={plan.id}>
                    <p className="text-sm">{plan.title}</p>
                    <span className="text-sm">
                      {plan.dates[0]} ~ {plan.dates[plan.dates.length - 1]}
                    </span>
                  </li>
                );
              })}
          </ul>
        </div>
        <div>
          <div
            className="flex w-[250px] justify-between items-center cursor-pointer"
            onClick={toggleEndPlansOpen}
          >
            <button className="flex justify-center items-center w-[50px] h-[50px] transition-all duration-300 ease-in-out">
              <img src={ic_previous_time_1x} />
            </button>
            <span className="w-[121px]">다녀온 여행 </span>
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
          <ul>
            {isSideBarOpen &&
              endPlansOpen &&
              endPlans?.map((plan) => {
                return (
                  <li className="w-[250px] pl-[65px] my-[5px] " key={plan.id}>
                    <p className="text-sm">{plan.title}</p>
                    <span className="text-sm">
                      {plan.dates[0]} ~ {plan.dates[plan.dates.length - 1]}
                    </span>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>

      <div>
        <div>
          <button>
            <img src="" alt="" />
          </button>
          <p>새 여행 계획 만들기</p>
        </div>
        <div>
          <button onClick={onClickSignOutHandler}>
            <img src="" alt="" />
          </button>
          <p>로그아웃</p>
        </div>
      </div>
    </aside>
  ) : null;
};
export default SideBar;
