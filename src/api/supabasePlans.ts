// /* eslint-disable @typescript-eslint/strict-boolean-expressions */
// /* eslint-disable @typescript-eslint/no-throw-literal */
// import { supabase } from './supabaseAuth';

// export const addPlan = async (dates: string[]): Promise<void> => {
//   try {
//     const { data, error } = await supabase.from('plans').insert([{ dates }]);

//     if (error) {
//       throw error;
//     }

//     console.log('계획 추가 성공B:', data);
//   } catch (error) {
//     console.error('계획 추가 에러B:', error);
//     throw error;
//   }
// };
