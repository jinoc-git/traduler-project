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
  // distance: number[];
  dates_cost: number[];
}

export const insertPlanEnding = async (options: Options) => {
  const { status } = await supabase.from('plans_ending').insert(options);

  console.log('status: ', status);
};
