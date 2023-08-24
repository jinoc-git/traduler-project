import { type Json } from 'types/supabase';

import { supabase } from './supabaseAuth';

export interface PinContentsType {
  lat?: number;
  lng?: number;
  placeName?: string;
}

export interface AddPinType {
  date: string;
  planId: string;
  newContents: PinContentsType;
}

export const getPin = async (planId: string, currentpage: number) => {
  const { data: dates, error: plansError } = await supabase
    .from('plans')
    .select('dates')
    .eq('id', planId);

  if (dates !== null) {
    const { data, error } = await supabase
      .from('pins')
      .select('contents')
      .match({ plan_id: planId, date: dates[0].dates[currentpage] });
    if (error !== null) {
      console.log(error);
    }
    return data;
  }
  if (plansError !== null) {
    console.log(plansError);
  }
};

export const addPin = async (
  date: string,
  planId: string,
  newContents: PinContentsType,
) => {
  console.log(date);
  const { data: oldContents, error: olderror } = await supabase
    .from('pins')
    .select('contents')
    .match({ plan_id: planId, date });

  const Arr = [];
  if (oldContents != null) {
    Arr.push(...oldContents[0].contents, newContents);
  }

  const { data, error } = await supabase
    .from('pins')
    .update({ contents: Arr as Json[] })
    .match({ plan_id: planId, date })
    .select();

  if (data?.length !== 0) {
    console.log('pins contents 추가됨', data);
  }

  if (error != null || olderror != null) {
    console.log('olderror', olderror);
    console.log(error);
  }
};
