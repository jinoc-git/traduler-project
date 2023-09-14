import React from 'react';
import { useNavigate } from 'react-router';

import { getBookMark } from '@api/bookMarks';
import { getPlanListAndMateList } from '@api/plans';
import Loading from '@components/loading/Loading';
import Card from '@components/main/card/Card';
import { userStore } from '@store/userStore';
import { useQuery } from '@tanstack/react-query';

const CardSection = () => {
  const user = userStore((state) => state.user);
  const navigate = useNavigate();

  const {
    data: matesData,
    isLoading: matesLoading,
    isError: matesError,
  } = useQuery(
    ['plan_mates', user?.id],
    async () => await getPlanListAndMateList(user?.id),
    { enabled: user !== null },
  );

  const {
    data: bookMarkData,
    isLoading: bookMarkLoading,
    isError: bookMarkError,
  } = useQuery(
    ['book_mark', user?.id],
    async () => await getBookMark(user?.id),
    { enabled: user !== null, refetchOnWindowFocus: false },
  );

  if (matesLoading || bookMarkLoading) {
    return <Loading />;
  }
  if (matesError || bookMarkError) {
    navigate('/error');
    return;
  }

  if (matesData == null || bookMarkData == null) {
    return <div>데이터 없음</div>;
  }

  const { planDataList, usersDataList } = matesData;

  return (
    <section
      className="mx-auto mt-0
      sm:w-[320px] sm:mb-[55px]
      md:w-[800px] md:mb-[90px]"
    >
      <Card
        planDataList={planDataList}
        usersDataList={usersDataList}
        bookMarkData={bookMarkData}
      />
    </section>
  );
};

export default React.memo(CardSection);
