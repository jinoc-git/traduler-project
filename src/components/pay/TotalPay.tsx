import React, { useEffect, useState } from 'react';

import { getTotalCost } from '@api/plans';
import { userStore } from '@store/userStore';

const TotalPay = () => {
  const [totalCost, setTotalCost] = useState<number | null>(null);
  const user = userStore((state) => state.user);
  const userId = user?.id;

  useEffect(() => {
    if (userId !== undefined) {
      const fetchTotalCost = () => {
        getTotalCost(userId)
          .then((cost) => {
            setTotalCost(cost);
          })
          .catch((error) => {
            console.error('Error fetching total cost:', error);
          });
      };

      fetchTotalCost();
    }
  }, [userId]);

  return (
    <div>
      <p>전체 사용 경비</p>
      <p>2023.08.21 300000원</p>
      <p>2023.08.22 120000원</p>
      <p>총 420000원</p>
      <p>예산 {totalCost}</p>
    </div>
  );
};

export default TotalPay;
