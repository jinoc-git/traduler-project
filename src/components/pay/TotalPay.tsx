import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getMates } from '@api/planMates';
import { getTotalCost } from '@api/plans';
import IconPin from '@assets/icons/IconPin';
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
    <div className="flex flex-col justify-center gap-5">
      <div className="flex items-center my-[10px] text-normal font-semibold text-gray_dark_1 gap-[8px]">
        <IconPin w="20" h="25" />
        <label>최종 정산 내역</label>
      </div>
      <div className="flex items-center justify-center w-[325px] h-[435px] flex-shrink: 0 rounded-lg border-2 border-yellow">
        <div className="ml-[20px] mr-[20px]">
          <p className="w-[175px] h-[24px] text-normal font-semibold text-gray_dark_1 leading-6 tracking-tighter">
            <span>예산은 </span> &nbsp; &nbsp;{' '}
            <span className="text-yellow font-Pretendard font-semibold text-base leading-6 tracking-tight">
              {totalCost}원{' '}
            </span>
            <span>입니다.</span>
          </p>
          {endingInfo != null ? (
            <>
              <div className="flex-col items-start ml-[8px] mb-[20px] text-grey-dark-1 font-Pretendard font-sm text-base leading-6 tracking-tighter">
                {endingInfo?.datesAndPaySum.map((item) => {
                  const day = removeYearOfDate(Object.keys(item)[0]);
                  const pay = Object.values(item)[0];
                  return (
                    <div className="mt-[5px] mb-[5px]" key={uuid()}>
                      <span className="font-semibold mr-[65px] text-gray_dark_1">
                        {day}
                      </span>
                      <span className="text-gray font-Inter text-base font-normal leading-6 tracking-tighter">
                        {pay}원
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mb-[100px]">
                <span className="text-normal font-semibold text-gray_dark_1 leading-6 tracking-tighter">
                  총 사용 경비는 &nbsp; &nbsp; &nbsp;
                </span>
                <span className="text-normal font-semibold text-blue leading-6 tracking-tighter">
                  {endingInfo.totalPay}원{' '}
                </span>
                <span className="text-normal font-semibold text-gray_dark_1 leading-6 tracking-tighter">
                  {' '}
                  입니다.
                </span>
              </div>
              <div className="border-t border-gray pt-3 mb-[40px] text-normal text-right font-semibold text-gray_dark_1 leading-6 tracking-tighter">
                {endingInfo.remainingBudget >= 0 ? (
                  <p>
                    +
                    <span className="text-blue">
                      {endingInfo.remainingBudget}
                    </span>
                    원 남았네요
                  </p>
                ) : (
                  <p>
                    <span className="text-orange">
                      {Math.abs(endingInfo.remainingBudget)}원
                    </span>
                    예산 초과 되셨네요!
                  </p>
                )}
              </div>

              <div className="text-normal text-right font-semibold text-gray_dark_1 leading-6 tracking-tighter">
                {endingInfo.perPersonCost >= 0 ? (
                  <p>
                    인당{' '}
                    <span className="text-navy">
                      {endingInfo.perPersonCost}원
                    </span>{' '}
                    정산해주세요!
                  </p>
                ) : (
                  <p>
                    초과 예산 인당{' '}
                    <span className="text-navy">
                      {Math.abs(endingInfo.perPersonCost)}원
                    </span>{' '}
                    추가 정산해주세요!
                  </p>
                )}
              </div>
            </>
          ) : (
            <p>Ending Info is undefined</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TotalPay;
