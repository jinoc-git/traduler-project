import React from 'react';

import { getPlansWithMates } from '@api/plans';
import { userStore } from '@store/userStore';
import { useQuery } from '@tanstack/react-query';

import Card from './Card';

const CardSection = () => {
  const user = userStore.getState().user;

  const {
    data: matesData,
    isLoading: matesLoading,
    isError: matesError,
  } = useQuery(
    ['plan_mates', user?.id],
    async () => {
      return await getPlansWithMates(user === null ? '' : user.id);
    },
    { enabled: user !== null },
  );

  console.log('matesData=>', matesData);

  // const {
  //   data: bookMarkData,
  //   isLoading: bookMarkLoading,
  //   isError: bookMarkError,
  // } = useQuery(
  //   ['book_mark'],
  //   async () => await getBookMark(user === null ? '' : user.id),
  // );

  if (
    matesLoading
    // || bookMarkLoading
  ) {
    return <div>로딩중 ...</div>;
  }
  if (
    matesError
    // || bookMarkError
  ) {
    return <div>에러 발생</div>;
  }

  if (
    matesData == null
    // || bookMarkData == null
  ) {
    return <div>데이터 없음</div>;
  }

  const { plansData, usersDataList } = matesData;

  return (
    <section className="main-layout">
      <div></div>
      <div>
        <Card
          plansData={plansData}
          usersDataList={usersDataList}
          // bookMarkData={bookMarkData}
        />
      </div>
    </section>
  );
};

export default CardSection;
