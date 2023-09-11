import React from 'react';
import { useNavigate, useParams } from 'react-router';

import { getPlaceWithDate } from '@api/endingData';
import { type PinContentsType } from '@api/pins';
import IconPin from '@assets/icons/IconPin';
import PinLayout from '@components/common/layout/PinLayout';
import Loading from '@components/loading/Loading';
import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import { useQuery } from '@tanstack/react-query';
import { type Json } from 'types/supabase';

const PlaceList = () => {
  const navigate = useNavigate();
  const { id: planId } = useParams();

  if (planId === undefined) {
    navigate('/main');
    return;
  }

  const { data, isLoading } = useQuery(
    ['plansEndingDistance', planId],
    async () => await getPlaceWithDate(planId),
  );

  if (isLoading) {
    return <Loading />;
  }
  if (data === undefined) {
    return null;
  }

  if (planId === undefined) {
    navigate('/main');
    return;
  }

  return (
    <section className="md:w-[720px] sm:w-[100%]">
      <div className="flex items-center">
        <IconPin w="w-[20px]" h="h-[25px]" fill="#4E4F54" />
        <div className="w-full ml-[8px] mx-auto font-bold text-lg text-gray_dark_1 py-[13px]">
          방문한 장소
        </div>
      </div>
      {data.map((day) => {
        const days = Object.keys(day);
        const pins = day[days[0]] as Json[];
        let distanceList: string[] = [];
        if (day.distance !== null && typeof day.distance === 'object') {
          distanceList = Object.values(day.distance) as string[];
        }
        const distanceLength = distanceList.length;

        return (
          <div key={uuid()} className="text-center">
            <p
              className="font-bold text-gray_dark_1
              md:mt-[15px] md:mb-[35px] md:text-lg
              sm:mt-[15px] sm:mb-[5px] sm:text-[14px]
              "
            >
              {days[0]}
            </p>
            {pins.map((pin, j) => {
              let distance = '0';
              if (distanceLength > 0) {
                distance = distanceList[j - 1];
              }
              return (
                <PinLayout
                  key={uuid()}
                  pin={pin as PinContentsType}
                  idx={j}
                  isEnding={true}
                >
                  {distance !== '0' && distance !== undefined && (
                    <span className="absolute md:top-[-35px] left-[0px] text-gray_dark_2 py-1 bg-white md:text-[16px] sm:text-[12px] sm:top-[-30px]">
                      {distance}km
                    </span>
                  )}
                </PinLayout>
              );
            })}
          </div>
        );
      })}
    </section>
  );
};

export default PlaceList;
