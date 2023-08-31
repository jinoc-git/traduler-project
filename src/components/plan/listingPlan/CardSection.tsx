import React from 'react';

import { getBookMark } from '@api/bookMarks';
import { getPlans } from '@api/plans';
import { useQuery } from '@tanstack/react-query';

import Card from './Card';

const CardSection = () => {
  const {
    data: plansData,
    isLoading: plansLoading,
    isError: plansError,
  } = useQuery(
    ['plans'],
    // async () => await getPlans(userId),
    // 유저아이디 가져오기 목데이터
    async () => await getPlans('02c05284-bfe4-41c9-b7aa-2709b2cf771b'),
  );

  const {
    data: bookMarkData,
    isLoading: bookMarkLoading,
    isError: bookMarkError,
  } = useQuery(
    ['book_mark'],
    async () => await getBookMark('02c05284-bfe4-41c9-b7aa-2709b2cf771b'),
  );

  console.log('bookMarkData', bookMarkData);

  if (plansLoading || bookMarkLoading) {
    return <div>로딩중 ...</div>;
  }
  if (plansError || bookMarkError) {
    return <div>로딩중 ...</div>;
  }
  if (plansData === undefined || bookMarkData === undefined) {
    return <div>로딩중 ...</div>;
  }
  return (
    <section className="main-layout">
      <div></div>
      <div>
        <Card plansData={plansData} bookMarkData={bookMarkData} />
      </div>
    </section>
  );
};

export default CardSection;
