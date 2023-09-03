import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getMates } from '@api/planMates';
import { getTotalCost } from '@api/plans';
import { useQuery } from '@tanstack/react-query';
import { calcDutchPay } from '@utils/calcDutchPay';

const TotalPay = () => {
  const [totalCost, setTotalCost] = useState<number | null>(null);
  // state를 설정하라
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
        // setstate해서 안에다가 뿌려줘라
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
      <p>2023.08.21 </p>
      <p>2023.08.22 120000원</p>
      {/* <p>총 사용 경비는 {}원 입니다.</p> */}
      <br />
      <br />
      <p>남았네요</p>
      {/* <p>인당 {remainingBudget}정산해주세요!</p> */}
    </div>
  );
};

export default TotalPay;
