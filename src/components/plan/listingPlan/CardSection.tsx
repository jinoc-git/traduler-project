import React from 'react';

import { getPlans } from '@api/plans';
import { useQuery } from '@tanstack/react-query';
import { type PlanType } from 'types/supabase';

import Card from './Card';

const CardSection = () => {
  const { data, isLoading, isError } = useQuery<PlanType[] | null>(
    ['plans'],
    getPlans,
  );

  // console.log('MainCardsData', data);

  if (isLoading) {
    return <div>로딩중 ...</div>;
  }
  if (isError) {
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
