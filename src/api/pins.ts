import { type Json, type PinInsertType } from 'types/supabase';

import { supabase } from './supabaseAuth';

export interface PinContentsType {
  id?: string;
  lat?: number;
  lng?: number;
  placeName?: string;
  cost?: number;
  distance?: number | undefined;
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

  if (plansError !== null) {
    throw new Error('핀 불러오기 오류');
  }
  if (dates !== null) {
    const { data, error } = await supabase
      .from('pins')
      .select('contents')
      .match({ plan_id: planId, date: dates[0].dates[currentpage] });
    if (error !== null) {
      throw new Error('핀 콘텐츠 불러오기 오류');
    }
    return data;
  }
};

export const addPin = async (
  date: string,
  planId: string,
  newContents: PinContentsType,
) => {
  const { data: oldContents, error: olderror } = await supabase
    .from('pins')
    .select('contents')
    .match({ plan_id: planId, date });

  const Arr = [];
  if (oldContents != null) {
    Arr.push(...oldContents[0].contents, newContents);
  }

  const { error } = await supabase
    .from('pins')
    .update({ contents: Arr as Json[] })
    .match({ plan_id: planId, date })
    .select();

  if (error != null || olderror != null) {
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

export const updatePin = async (
  idx: number,
  date: string,
  planId: string,
  newContents: PinContentsType,
) => {
  const { data: oldContents, error: olderror } = await supabase
    .from('pins')
    .select('contents')
    .match({ plan_id: planId, date });

  let Arr: Array<Json | PinContentsType> = [];
  if (oldContents != null) {
    Arr = oldContents[0].contents.map((content, i) => {
      if (i === idx) {
        return newContents;
      }
      return content;
    });
  }

  const { data, error } = await supabase
    .from('pins')
    .update({ contents: Arr as Json[] })
    .match({ plan_id: planId, date })
    .select();

  if (error != null || olderror != null) {
    throw new Error('핀 업데이트 오류');
  }

  return data;
};

export const newDatePin = async (newPin: PinInsertType) => {
  const { error } = await supabase.from('pins').insert(newPin);

  if (error !== null) {
    throw new Error('새 핀 추가 오류');
  }
};

export const getAllPins = async (planId: string) => {
  const { data, error } = await supabase
    .from('pins')
    .select('contents')
    .eq('plan_id', planId);
  if (error !== null) {
    throw new Error('핀 가져오기 에러발생');
  }
  return data;
};
