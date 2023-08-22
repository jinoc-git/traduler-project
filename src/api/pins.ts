import { type Json } from 'types/supabase';

import { supabase } from './supabaseAuth';

export interface PinContentsType {
  lat?: number;
  lng?: number;
  placeName?: string;
}

export const getPins = async () => {
  const date = '2023-08-21';
  const planId = '39022bd5-4c1e-4ee0-bb5b-b802baa9bbaf';

  const { data, error } = await supabase
    .from('pins')
    .select('contents')
    .match({ plan_id: planId, date });

  if (error != null) {
    console.log(error);
  }

  if (data !== null) {
    return data[0].contents;
  }
};

export const addPin = async (newContents: PinContentsType) => {
  const date = '2023-08-21';
  const planId = '39022bd5-4c1e-4ee0-bb5b-b802baa9bbaf';

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
