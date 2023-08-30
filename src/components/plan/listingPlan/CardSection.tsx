import React from 'react';

import { getPlans } from '@api/plans';
import { useQuery } from '@tanstack/react-query';

import Card from './Card';

const CardSection = () => {
  const { data, isLoading, isError } = useQuery(
    ['plans'],
    // async () => await getPlans(userId),
    // 유저아이디 가져오기 목데이터
    async () => await getPlans('2f9f32f2-e021-4b55-bf78-3318d0b16d95'),
  );
  // console.log('MainCardsData', data);

  if (isLoading) {
    return <div>로딩중 ...</div>;
  }
  if (isError) {
    return <div>로딩중 ...</div>;
  }
  if (data === undefined) {
    return <div>로딩중 ...</div>;
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
