/* eslint-disable @typescript-eslint/no-unused-vars */
// import Carousel from '@components/carousel/Carousel';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { getPlanEnding } from '@api/plans';
import IconLocationDefault from '@assets/icons/IconLocationDefault';
import EndingMap from '@components/addPhoto/endingMap/EndingMap';
import EndingDate from '@components/common/date/EndingDate';
import Invite from '@components/common/invite/Invite';
import EndingPay from '@components/common/pay/EndingPay';
import Carousel from '@components/ending/carousel/Carousel';
import Comments from '@components/ending/comments/Comments';
import PlaceList from '@components/ending/placeList/PlaceList';
import TotalPay from '@components/ending/totalPay/TotalPay';
import Loading from '@components/loading/Loading';
import { sideBarStore } from '@store/sideBarStore';
import { useQuery } from '@tanstack/react-query';
import { type Json } from 'types/supabase';

const Ending = () => {
  const isSideBarOpen = sideBarStore((state) => state.isSideBarOpen);
  const isVisibleSideBar = sideBarStore((state) => state.isVisibleSideBar);
  const { id: planId } = useParams();
  const { data: planEnding, isLoading } = useQuery(
    ['planEnding', planId],
    async () => await getPlanEnding(planId as string),
  );
  const navigate = useNavigate();

  const [dates, setDates] = useState<string[]>();
  const [pay, setPay] = useState<number>();
  const [title, setTitle] = useState<string>();
  const [distance, setDistance] = useState<Json[]>();

  useEffect(() => {
    window.addEventListener('popstate', () => {
      navigate('/main');
    });
    return () => {
      window.removeEventListener('popstate', () => {
        navigate('/main');
      });
    };
  }, []);

  useEffect(() => {
    if (planEnding !== undefined && planEnding !== null) {
      console.log('불러온 날짜', planEnding[0].dates);
      setDates(planEnding[0].dates);
      setPay(planEnding[0].total_cost as number);
      setTitle(planEnding[0].title);
      setDistance(planEnding[0].distance as Json[]);
    }
  }, [planEnding]);

  useEffect(() => {
    console.log('state dates', dates);
  }, [dates]);

  if (isLoading && planEnding !== undefined) {
    return <Loading />;
  }

  return (
    <main
      className={`transition-all duration-300 ease-in-out pt-[50px] flex-col flex-center ${
        isVisibleSideBar
          ? isSideBarOpen
            ? 'w-[calc(100vw-270px)] ml-[270px]'
            : 'w-[calc(100vw-88px)] ml-[88px]'
          : 'w-[calc(100vw)] ml-0'
      }`}
    >
      <div className="flex flex-col w-plan mt-[76px]">
        <div className="flex items-center mb-[18px]">
          <h3 className="font-bold text-gray_dark_1">{title}</h3>
          <div className="bg-orange rounded-3xl w-[65px] h-[20px] text-[9px] flex-center font-normal text-white ml-[50px]">
            완료된 여행
          </div>
        </div>
        <EndingDate planDates={dates as string[]} />
        <Invite />
        <EndingPay pay={pay as number} />
        <div className="flex items-center my-[10px] text-normal font-semibold text-gray_dark_1 gap-[8px]">
          <IconLocationDefault w="20" h="20" />
          <label>여행지역</label>
        </div>
        <EndingMap dates={dates as string[]} />
        <Carousel />
        <PlaceList distance={distance as Json[]} />
        <TotalPay />
        <Comments />
      </div>
    </main>
  );
};

export default Ending;
