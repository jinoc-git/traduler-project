import React from 'react';

import { getPlans, getPlansWithMates } from '@api/plans';
import { userStore } from '@store/userStore';
import { useQuery } from '@tanstack/react-query';

import Card from './Card';

const CardSection = () => {
  const { data, isLoading, isError } = useQuery(
    ['plans'],
    // async () => await getPlans(userId),
    // 유저아이디 가져오기 목데이터
    async () => await getPlans('2f9f32f2-e021-4b55-bf78-3318d0b16d95'),
  );

  console.log('getPlans결과=>', data);
  const user = userStore.getState().user;
  const {
    data: matesData,
    isLoading: matesLoading,
    isError: matesError,
  } = useQuery(
    ['plan_mates'],
    async () => {
      return await getPlansWithMates(user === null ? '' : user.id);
    },
    { enabled: user !== null },
  );
  console.log('matesData=>', matesData);

  if (isLoading || matesLoading) {
    return <div>로딩중 ...</div>;
  }
  if (isError || matesError) {
    return <div>에러 발생</div>;
  }
  console.log('31data=>', data);
  console.log('31matesData=>', matesData);
  if (data == null || matesData == null) {
    return <div>데이터 없음</div>;
  }

  return (
    <section className="main-layout">
      <div></div>
      <div>
        <Card data={data} />
      </div>
    </section>
  );
};

export default CardSection;
