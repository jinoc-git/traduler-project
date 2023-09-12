import React from 'react';
import { useNavigate } from 'react-router';

import { getBookMark } from '@api/bookMarks';
import { getPlanListAndMateList, getPlansWithBookmarks } from '@api/plans';
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

  const {
    data: bookMarkPlanData,
    isLoading: bookMarkPlanLoading,
    isError: bookMarkPlanError,
  } = useQuery(
    ['book_mark', 'plans', user?.id],
    async () => await getPlansWithBookmarks(user === null ? '' : user.id),
    { enabled: user !== null, refetchOnWindowFocus: false },
  );

  if (matesLoading || bookMarkLoading || bookMarkPlanLoading) {
    return <Loading />;
  }
  if (matesError || bookMarkError || bookMarkPlanError) {
    navigate('/error');
    return;
  }

  if (matesData == null || bookMarkData == null) {
    return <div>데이터 없음</div>;
  }

  const { planDataList, usersDataList } = matesData;

  return (
    <section
      className="mx-auto my-0
    sm:w-[320px] 
    md:w-[800px]"
    >
      <Card
        planDataList={planDataList}
        usersDataList={usersDataList}
        bookMarkData={bookMarkData}
        bookMarkPlan={bookMarkPlanData}
      />
    </section>
  );
};

export default CardSection;
