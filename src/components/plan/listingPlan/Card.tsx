import React from 'react';

import { type PlanType } from 'types/supabase';

interface CardProps {
  data: PlanType[] | null;
}

const Card: React.FC<CardProps> = ({ data }) => {
  console.log('data=>', data);
  return <div>Card</div>;
};

export default Card;
