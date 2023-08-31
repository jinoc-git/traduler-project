import React from 'react';

import { getBookMark } from '@api/bookMarks';
import { getPlansWithMates } from '@api/plans';
import { userStore } from '@store/userStore';
import { useQuery } from '@tanstack/react-query';

import Card from './Card';

const CardSection = () => {
  const user = userStore.getState().user;

  if (user === null) return null;

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

  const {
    data: bookMarkData,
    isLoading: bookMarkLoading,
    isError: bookMarkError,
  } = useQuery(
    ['book_mark', user?.id],
    async () => await getBookMark(user === null ? '' : user.id),
    { enabled: user !== null },
  );

  if (matesLoading || bookMarkLoading) {
    return <div>로딩중 ...</div>;
  }
  if (matesError || bookMarkError) {
    return <div>에러 발생</div>;
  }

  if (matesData == null || bookMarkData == null) {
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
          bookMarkData={bookMarkData}
        />
      </div>
    </section>
  );
};

export default CardSection;
