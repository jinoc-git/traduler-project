/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/return-await */
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
    ['ending', planId],
    async () => await getPlaceWithDate(planId),
  );

  if (isLoading) {
    return <Loading />;
  }
  if (data === undefined) {
    return null;
  }

  return (
    <section className="w-[720px]">
      <div className="flex items-center">
        <IconPin w="20" h="25" fill="#4E4F54" />
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
            <p className="mt-[15px] mb-[35px] text-lg font-bold text-gray_dark_1">
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
                    <span className="absolute top-[-20px] left-[40px] text-gray_dark_2">
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
