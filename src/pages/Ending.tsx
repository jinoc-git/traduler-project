/* eslint-disable @typescript-eslint/no-unused-vars */
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

const Ending = () => {
  const isSideBarOpen = sideBarStore((state) => state.isSideBarOpen);
  const isVisibleSideBar = sideBarStore((state) => state.isVisibleSideBar);
  const { id: planId } = useParams();
  const {
    data: planEnding,
    isLoading,
    isError,
  } = useQuery(
    ['planEnding', planId],
    async () => await getPlanEnding(planId as string),
    { refetchOnWindowFocus: false },
  );
  const navigate = useNavigate();

  const [dates, setDates] = useState<string[]>();
  const [pay, setPay] = useState<number>();
  const [title, setTitle] = useState<string>();

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
      setDates(planEnding[0].dates);
      setPay(planEnding[0].total_cost as number);
      setTitle(planEnding[0].title);
    }
  }, [planEnding]);

  if (isLoading && planEnding !== undefined) {
    return <Loading />;
  }

  if (isError) {
    navigate('/error');
    return;
  }

  return (
    <main
      className={`transition-all duration-300 ease-in-out pt-[60px]  ${
        isVisibleSideBar
          ? isSideBarOpen
            ? 'sidebar-open sm:ml-0 md:ml-[270px]'
            : 'sidebar-close '
          : 'md:w-[calc(100vw)] md:ml-0 '
      }`}
    >
      <div className="flex flex-col mt-[76px] mx-auto md:w-plan sm:w-[310px]">
        <section>
          <div
            className="flex items-center md:justify-normal sm:justify-between
              sm:mb-[35px]
              md:mb-[18px]"
          >
            <h3
              className="font-bold text-gray_dark_1
                sm:text-[20px] sm:w-[235px]
                md:text-[24px] md:w-[275px]"
            >
              {title}
            </h3>
            <div className="bg-orange rounded-3xl w-[65px] h-[20px] text-[9px] flex-center font-normal text-white">
              완료된 여행
            </div>
          </div>
          <EndingDate planDates={dates as string[]} />
          <Invite />
          <EndingPay pay={pay as number} />
        </section>
        <section>
          <div
            className="flex items-center mt-[30px] mb-[20px] font-semibold text-gray_dark_1 gap-[8px]
          sm:text-sm sm:w-[286px] sm:mx-auto
          md:text-normal md:w-full md:mx-[6px]"
          >
            <IconLocationDefault w="20" h="20" />
            <label>여행 지역</label>
          </div>
          <EndingMap dates={dates as string[]} />
        </section>

        <Carousel />
        <PlaceList />
        <TotalPay />
        <Comments />
      </div>
    </main>
  );
};

export default Ending;
