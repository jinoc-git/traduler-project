import { type PlansEndingType } from 'types/supabase';

import { getPath } from './path';
import { getAllPins, type PinContentsType } from './pins';
import { getPlansDate } from './plans';
import { supabase } from './supabaseAuth';

interface Content {
  cost: number;
}

interface Contents {
  contents: Content[];
}

// 좌표 불러오기
export const getCoordinate = async (planId: string) => {
  const { data: dates, error: plansError } = await supabase
    .from('plans')
    .select('dates')
    .eq('id', planId);

  if (plansError !== null) {
    throw new Error('좌표 불러오기 에러');
  }

  if (dates !== null) {
    const { data, error } = await supabase
      .from('pins')
      .select('contents')
      .in(
        'date',
        Object.values(dates[0]).map((date) => date),
      )
      .eq('plan_id', planId);

    if (error !== null) {
      throw new Error('좌표 불러오기 에러');
    }
    const result = data?.map((item) => item.contents);
    return result;
  }
};

// 좌표 변환 후 거리 계산하기
export const calcAllPath = async (distance: PinContentsType[][]) => {
  const convertParameters = [];
  for (const pinArr of distance) {
    const pinsOfDate = [];
    for (const data of pinArr) {
      const { lat, lng } = data;
      if (lat !== undefined && lng !== undefined) {
        pinsOfDate.push(`${lng},${lat}`);
      }
    }
    convertParameters.push(pinsOfDate);
  }

  const newDataArr = [];
  for (const data of convertParameters) {
    const oneDay = [];
    for (let i = 0; i < data.length - 1; i++) {
      try {
        const result = await getPath({
          origin: data[i],
          destination: data[i + 1],
        });

        const distanceInKm = result / 1000;
        oneDay.push(distanceInKm.toFixed(1));
      } catch (err) {
        throw new Error('거리 계산 오류');
      }
    }
    if (oneDay.length === 0) {
      newDataArr.push({ '0': '0' });
    } else {
      newDataArr.push({ ...oneDay });
    }
  }
  return newDataArr;
};

// 비용 불러오기
export const getCost = async (planId: string) => {
  const { data: dates, error: plansError } = await supabase
    .from('plans')
    .select('dates')
    .eq('id', planId);

  if (plansError !== null) {
    throw new Error('비용 불러오기 오류류');
  }

  if (dates !== null) {
    const { data } = await supabase
      .from('pins')
      .select('contents')
      .in(
        'date',
        Object.values(dates[0]).map((date) => date),
      )
      .eq('plan_id', planId)
      .order('date', { ascending: true });
    return data as Contents[] | null;
  }
};

// 비용 총합 구하기
export const calcCostAndInsertPlansEnding = async (planId: string) => {
  const datesCost: number[] = [];
  const response = await getCost(planId);
  if (response !== null && response !== undefined) {
    response.forEach((value) => {
      let cost = 0;

      value.contents.forEach((content) => {
        cost += content.cost;
      });

      datesCost.push(cost);
    });
    return datesCost;
  }
};

// interface Options {
//   id: string;
//   distance: Json[];
//   dates_cost: number[];
//   pictures: string[];
// }

// 구한 날짜별 거리 및 날짜별 총 비용 supabase에 데이터 insert
export const insertPlanEnding = async (options: PlansEndingType) => {
  const { status, error } = await supabase.from('plans_ending').insert(options);

  if (error !== null) {
    throw new Error(status.toString());
  }
};

// plans_ending 데이터 불러오기
export const getEndingCost = async (planId: string) => {
  const { data: distanceData, error: distanceError } = await supabase
    .from('plans_ending')
    .select('distance')
    .eq('id', planId);

  if (distanceError !== null) {
    return;
  }

  const { data: costData, error: costError } = await supabase
    .from('plans_ending')
    .select('dates_cost')
    .eq('id', planId);

  if (costError !== null) {
    return;
  }

  const { data: pictureData, error: pictureError } = await supabase
    .from('plans_ending')
    .select('pictures')
    .eq('id', planId);

  if (pictureError !== null) {
    return;
  }

  return { distanceData, costData, pictureData };
};

export const getPhoto = async (planId: string) => {
  const { data: endingData, error: endingError } = await supabase
    .from('plans_ending')
    .select('pictures')
    .eq('id', planId);

  if (endingError !== null) {
    throw new Error('사진 불러오기 오류');
  }
  return endingData;
};

// plans 날짜 불러오기
export const getDates = async (planId: string) => {
  const { data, error: plansError } = await supabase
    .from('plans')
    .select('dates')
    .eq('id', planId);

  if (plansError !== null || data === null) {
    console.log(plansError);
    throw new Error('오류발생');
  }

  const datesArray = data[0].dates;

  return datesArray;
};

export const getPlaceWithDate = async (planId: string) => {
  const planDateList = await getPlansDate(planId);
  const placeDataList = await getAllPins(planId, planDateList[0].dates);
  const planDistanceList = await getEndingDistance(planId);

  const result = placeDataList.map((item, i) => {
    const day = planDateList[0].dates[i];
    const mix = {
      [day]: item.contents,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      distance: planDistanceList[0].distance![i],
    };
    return mix;
  });

  return result;
};

export const getEndingDistance = async (planId: string) => {
  const { data: distanceData, error: distanceError } = await supabase
    .from('plans_ending')
    .select('distance')
    .eq('id', planId);

  if (distanceError !== null) {
    throw new Error('엔딩 거리 데이터 불러오기 오류');
  }

  return distanceData;
};
