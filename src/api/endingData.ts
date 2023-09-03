import { getPath } from './path';
import { type PinContentsType } from './pins';
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
      console.log(error);
    }
    const result = data?.map((item) => item.contents);
    console.log(result);
    return result;
  }
  if (plansError !== null) {
    console.log(plansError);
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
  console.log('==>', convertParameters);
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
        console.log(err);
      }
    }
    newDataArr.push(oneDay);
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
    console.log(plansError);
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

interface Options {
  id: string;
  distance: string[][];
  dates_cost: number[];
  pictures: string[];
}

// 구한 날짜별 거리 및 날짜별 총 비용 supabase에 데이터 insert
export const insertPlanEnding = async (options: Options) => {
  const { status, error } = await supabase.from('plans_ending').insert(options);

  console.log('status: ', status);
  console.log('error: ', error);
};

// 예산 및 사용 내역 가져오기
export const getEndingCost = async () => {
  const { data: plansData, error: plansError } = await supabase
    .from('plans')
    .select('total_cost');

  // const { data: endingData, error: endingError } = await supabase
  //   .from('plans_ending')
  //   .select('dates_cost');

  if (plansError !== null) {
    console.error('Error fetching data from Supabase.');
    return;
  }

  const totalCost = plansData[0].total_cost;
  // const datesCost = endingData[0];
  console.log('totalCost: ', totalCost);
  // console.log('datesCost: ', datesCost);
  return { totalCost };
};

export const getPhoto = async (planId: string) => {
  const { data: endingData, error: endingError } = await supabase
    .from('plans_ending')
    .select('pictures')
    .eq('id', planId);

  if (endingError !== null) {
    console.error('사진 불러오기 에러 from supabase.', endingError);
  }
  return endingData;
};
