import { getPath } from './path';
import { type PinContentsType } from './pins';
import { supabase } from './supabaseAuth';

interface Content {
  cost: number;
}

interface Contents {
  contents: Content[];
}

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

interface Options {
  id: string;
  distance: string[][];
  dates_cost: number[];
  pictures: string[];
}

export const insertPlanEnding = async (options: Options) => {
  const { status, error } = await supabase.from('plans_ending').insert(options);

  console.log('status: ', status);
  console.log('error: ', error);
};

// export const insertAddPhotoData = async (options: Options) => {
//   const { error } = await supabase.from('plans_ending').insert(options);

//   if (error !== null) {
//     console.log(error);
//     throw new Error('최종 데이터 로딩 에러');
//   }
// };

// export const newDatePin = async (newPin: PinInsertType) => {
//   const { error } = await supabase.from('pins').insert(newPin);

//   if (error !== null) {
//     console.log(error);
//   }
// };

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
