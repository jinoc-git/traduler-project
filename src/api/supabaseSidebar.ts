import { supabase } from './supabaseAuth';

export interface Plan {
  title: string;
  dates: string[];
  plan_state: 'planning' | 'traveling' | 'end';
}

const getPlans = async (): Promise<Plan[] | null> => {
  try {
    const { data, error } = await supabase
      .from('plans')
      .select('title, dates, plan_state');

    if (error != null) {
      console.log(error);
      return null;
    }
    if (data !== null) {
      const plans: Plan[] = data as Plan[];
      return plans;
    }

    return null;
  } catch (error) {
    console.error('Error fetching plans:', error);
    return null;
  }
};

export default getPlans;
