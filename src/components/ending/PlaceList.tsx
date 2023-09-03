import React from 'react';
import { useNavigate, useParams } from 'react-router';

import { getPlaceWithDate } from '@api/endingData';
import { type PinContentsType } from '@api/pins';
import IconPin from '@assets/icons/IconPin';
import PinLayout from '@components/plan/PinLayout';
import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import { useQuery } from '@tanstack/react-query';

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
    return <div>로딩 중</div>;
  }
  if (data === undefined) {
    return null;
  }

  return (
    <section className="w-[720px]">
      <div className="flex items-center">
        <IconPin w="20" h="25" fill="#4E4F54" />
        <div className="w-full ml-[8px] mx-auto font-bold text-normal text-gray_dark_1 py-[13px]">
          방문한 장소
        </div>
      </div>
      {data.map((day) => {
        console.log(data);
        console.log(day);
        const days = Object.keys(day);
        const pins = day[days[0]];

        return (
          <div key={uuid()} className='text-center'>
            <p className='mt-[15px] mb-[35px] text-lg font-bold text-gray_dark_1'>{days[0]}</p>
            {pins.map((pin, j) => {
              return (
                <PinLayout
                  key={uuid()}
                  pin={pin as PinContentsType}
                  idx={j}
                  isEnding={true}
                />
              );
            })}
          </div>
        );
      })}
    </section>
  );
};

export default PlaceList;
