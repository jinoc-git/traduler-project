import { type PinType, type Json, type PinInsertType } from 'types/supabase';

import { supabase } from './supabaseAuth';

export interface PinContentsType {
  id?: string;
  lat?: number;
  lng?: number;
  placeName?: string;
  cost?: number | null;
  distance?: number | undefined;
}

export const getPin = async (planId: string, currentpage: number) => {
  const { data: dates, error: plansError } = await supabase
    .from('plans')
    .select('dates')
    .eq('id', planId);

  if (plansError !== null) {
    throw new Error('핀 불러오기 오류');
  }
  if (dates !== null) {
    const { data, error } = await supabase
      .from('pins')
      .select()
      .match({ plan_id: planId, date: dates[0].dates[currentpage] });
    if (error !== null) {
      throw new Error('핀 콘텐츠 불러오기 오류');
    }
    return data;
  }
};

export const addPin = async (newPin: PinType) => {
  const { error } = await supabase
    .from('pins')
    .update(newPin)
    .match({ plan_id: newPin.plan_id, date: newPin.date });

  if (error != null) {
    throw new Error('핀 추가 오류');
  }
};

export const deletePin = async (
  date: string,
  planId: string,
  deletedPin: PinContentsType[],
) => {
  const { data, error } = await supabase
    .from('pins')
    .update({ contents: deletedPin as Json[] })
    .match({ plan_id: planId, date });

  if (error != null) {
    throw new Error('핀 삭제 오류');
  }

  return data;
};

export const updatePin = async (newPin: PinType) => {
  const { data, error } = await supabase
    .from('pins')
    .update(newPin)
    .match({ plan_id: newPin.plan_id, date: newPin.date });

  if (error != null) {
    throw new Error('핀 업데이트 오류');
  }

  return data;
};

export const newDatePin = async (newPin: PinInsertType) => {
  console.log('api', newPin);
  const { error } = await supabase.from('pins').insert(newPin);

  if (error !== null) {
    throw new Error('새 핀 추가 오류');
  }
};

export const getAllPins = async (planId: string, dates: string[]) => {
  const { data, error } = await supabase
    .from('pins')
    .select('contents')
    .in('date', dates)
    .eq('plan_id', planId);

  if (error !== null) {
    throw new Error('핀 가져오기 에러발생');
  }
  return data;
};

export const changeOrderPins = async (
  date: string,
  planId: string,
  newOrder: PinContentsType[],
) => {
  const { data, error } = await supabase
    .from('pins')
    .update({ contents: newOrder as Json[] })
    .match({ plan_id: planId, date });

  if (error != null) {
    throw new Error('핀 삭제 오류');
  }

  return data;
};

export const getAllPinsDate = async (planId: string) => {
  const { data, error } = await supabase
    .from('pins')
    .select('date')
    .eq('plan_id', planId);

  if (error !== null) {
    throw new Error('핀 날짜 가져오기 에러발생');
  }
  const res = data.map((item) => item.date);
  return res;
};
