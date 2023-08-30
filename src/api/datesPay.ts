import { supabase } from './supabaseAuth';

/* 
 planId는 필수.
 plans 테이블에서 'dates' 컬럼 값을 가져온다.

 ----완료----

 if (컬럼 값이 존재)
 'pins' 테이블에서 'contents' 컬럼 값을 가져온다.
  이때 필수값은 planId, dates 컬럼 값

  currnetpage값은 dates의 길이로 대체
  
  ----완료----

  지금 나는 뭐가 필요한가?

  COST!!

  1. cost를 객체로부터 뽑아야한다.
  2. 뽑은 cost들을 더한다.
  3. 더한 cost 값들을 새로운 테이블(plans_ending)에 넣어줘야한다.
*/

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
  // 이퀄 똑같은거 찾아주는거! dates 컬럼 select 안에 빈()면 row 싹다 가져오는거

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

    // const fruit = {
    //   이름: "사과",
    //   당도: "달음",
    //   가격: 40_000
    // }

    // Object.values(fruit) => ["사과", "달음", 40000]
    // Object.keys(fruit) => ["이름", "당도", "가격"]
    // Object.entries =>

    // eq = 한가지만 match는 두가지 정보 같은거 필요할 때 사용

    return data as Contents[] | null;
  }
};

interface Options {
  id: string;
  distance: number[];
  dates_cost: number[];
}

export const insertPlanEnding = async (options: Options) => {
  const { status } = await supabase.from('plans_ending').insert(options);

  console.log('status: ', status);
};

/* 
  왜 안되냐? 지금 구조에서?


  Pins.tsx 파일에서 calPath 함수에서 문제가 있다.
  getPath라는 API 통신 함수를 사용하게 되는데 매개변수로 시작점, 도착점을 받아야 한다. 그런데 페이지를 변경할 때마다 시작점과 도착점들이 변경된다.

  그렇다면 예를 들어, 페이지가 3개인 상태에서 첫번째 페이지에서 여행 완료를 수행하게 될 경우 첫번째 페이지에 해당하는 시작점과 도착점들로만 거리가 구해진다. 반대로 두번째 페이지에서 여행 완료를 수행하게 될 경우 두번 째 페이지에 해당하는 시작점과 도착점들로만 거리가 구해진다.

  이러한 이슈는 Pins.tsx 컴포넌트가 현재 페이지 상태만을 나타내기 때문에 이전 페이지 혹은 다음 페이지의 시작점들과 도착점들을 알 수가 없기 때문이다.

  해결 방법은 1가지가 있습니다.

  1. 맨 마지막 날짜에서만 여행 완료 버튼을 누를 수 있게 하여 모든 날짜를 순회하도록 하는 것입니다. 이때 calPath에서 zustand를 사용하여 페이지와 거리 데이터를 저장하여 마지막 페이지의 여행 완료 버튼에서 supabase로 zustand에 저장된 거리 데이터들을 보내주면 됩니다.

*/
