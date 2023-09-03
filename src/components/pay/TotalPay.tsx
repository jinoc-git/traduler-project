import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getMates } from '@api/planMates';
import { getTotalCost } from '@api/plans';
import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import { useQuery } from '@tanstack/react-query';
import { calcDutchPay } from '@utils/calcDutchPay';
import { removeYearOfDate } from '@utils/changeFormatDay';

type DatesAndPaySum = Record<string, number>;

const TotalPay = () => {
  const [totalCost, setTotalCost] = useState<number | null>(null);
  const [endingInfo, setEndingInfo] = useState<
    | {
        remainingBudget: number;
        totalPay: number;
        perPersonCost: number;
        datesAndPaySum: DatesAndPaySum[];
      }
    | undefined
  >();
  const { id: planId } = useParams();

  const { data: invitePeople } = useQuery(['planMates', planId], async () => {
    if (planId !== undefined) {
      const res = await getMates(planId);
      return res;
    } else return null;
  });
  const countPeople = invitePeople?.length;

  useEffect(() => {
    const getRemainingBudget = async () => {
      if (planId !== undefined && countPeople !== undefined) {
        const remainingBudget = await calcDutchPay(planId, countPeople);
        setEndingInfo(remainingBudget);
        console.log('remainingBudget: ', remainingBudget);
      }
    };
    void getRemainingBudget();
  }, [invitePeople]);

  useEffect(() => {
    if (planId !== undefined) {
      const fetchTotalCost = () => {
        getTotalCost(planId)
          .then((cost) => {
            setTotalCost(cost);
          })
          .catch((error) => {
            console.error('Error fetching total cost:', error);
          });
      };

      fetchTotalCost();
    }
  }, [planId]);

  return (
    <div>
      <p>예산은 {totalCost}원 입니다.</p>
      {endingInfo != null ? (
        <>
          <div>
            {endingInfo?.datesAndPaySum.map((item) => {
              const day = removeYearOfDate(Object.keys(item)[0]);
              const pay = Object.values(item)[0];
              return (
                <div key={uuid()}>
                  <span>{day}</span> &nbsp;
                  <span>{pay}원</span>
                </div>
              );
            })}
          </div>
          <p>총 사용 경비는 {endingInfo.totalPay}원 입니다.</p>
          <br />
          <br />
          <p>{endingInfo.remainingBudget}남았네요</p>
          <p>인당 {endingInfo.perPersonCost}정산해주세요!</p>)
        </>
      ) : (
        <p>Ending Info is undefined</p>
      )}
    </div>
  );
};

export default TotalPay;
