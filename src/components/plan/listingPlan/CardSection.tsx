import React from 'react';

import { getPlans } from '@api/plans';
import { useQuery } from '@tanstack/react-query';

import Card from './Card';

const CardSection = () => {
  const { data, isLoading, isError } = useQuery(
    ['plans'],
    // async () => await getPlans(userId),
    // 유저아이디 가져오기 목데이터
    async () => await getPlans('10d4b5c3-12d6-486b-862b-6f63c0c9f4fc'),
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
  console.log('나 데이터', data);
  return (
    <div>
      <div></div>
      <div>
        <Card data={data} />
      </div>
    </div>
  );
};

export default CardSection;
