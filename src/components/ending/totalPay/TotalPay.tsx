import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getMates } from '@api/planMates';
import { getTotalCost } from '@api/plans';
import IconReceipt from '@assets/icons/IconReceipt';
import { screenStore } from '@store/screenStore';
import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import { useQuery } from '@tanstack/react-query';
import { calcDutchPay, formatNumberWithCommas } from '@utils/calcDutchPay';
import { removeYearOfDate } from '@utils/changeFormatDay';

type DatesAndPaySum = Record<string, string>;

const TotalPay = () => {
  const [totalCost, setTotalCost] = useState<string | null>(null);
  const [endingInfo, setEndingInfo] = useState<
    | {
        remainingBudget: number;
        dailyPaySum: string[];
        totalPay: number;
        perPersonCost: number;
        datesAndPaySum: DatesAndPaySum[];
      }
    | undefined
  >();
  const { id: planId } = useParams();
  const screenSize = screenStore((state) => state.screenSize);

  const { data: invitePeople } = useQuery(
    ['planMates', planId],
    async () => {
      if (planId !== undefined) {
        const res = await getMates(planId);
        return res;
      } else return null;
    },
    { refetchOnWindowFocus: false },
  );

  const countPeople = invitePeople?.length;

  useEffect(() => {
    const getRemainingBudget = async () => {
      if (planId !== undefined && countPeople !== undefined) {
        const remainingBudget = await calcDutchPay(planId, countPeople);
        setEndingInfo(remainingBudget);
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
    <section
      className="
      sm:w-[310px] sm:h-[382px] sm:mt-[30px] sm:mb-[32px]
    md:w-[720px] md:h-[420px] md:mx-auto md:mt-[35px] md:mb-[46px]
    "
    >
      <div
        className="flex items-center md:w-full md:mx-[6px] sm:w-[286px] sm:mx-auto
      "
      >
        {screenSize === 'sm' ? (
          <IconReceipt w="w-[18px]" h="h-[25px]" fill="#4E4F54" />
        ) : (
          <IconReceipt w="w-[20px]" h="h-[25px]" fill="#4E4F54" />
        )}
        <div
          className="ml-[8px] font-bold text-gray_dark_1
        md:text-lg
        sm:text-sm
        "
        >
          최종 정산 내역
        </div>
      </div>

      <div
        className="flex items-center flex-col justify-center 
      md:mx-auto md:mt-[25px]
      sm:mx-[24px] sm:mt-[20px]
      "
      >
        <div
          className="flex items-center justify-center  flex-shrink: 0 rounded-lg border-2 border-yellow
          md:w-[325px] 
          sm:w-[266px] 
        "
        >
          <div
            className="leading-6 tracking-tighter text-base
          md:mx-[32px] md:my-[45px]
          sm:mx-[24px] sm:my-[28px]
          "
          >
            <p
              className=" font-semibold text-gray_dark_1 
            md:h-[24px] md:text-normal
              sm:text-[13px]
            "
            >
              예산은 &nbsp;
              <span className="text-yellow font-Pretendard font-semibold  ">
                {totalCost !== null ? totalCost : ''} 원 &nbsp;
              </span>
              입니다.
            </p>
            {endingInfo != null ? (
              <>
                <div
                  className="flex-col items-start ml-[8px] mb-[20px] text-grey-dark-1 font-Pretendard 
                  md:text-sm
                  sm:text-[13px]
                "
                >
                  {endingInfo?.datesAndPaySum.map((item) => {
                    const day = removeYearOfDate(Object.keys(item)[0]);
                    const pay = Object.values(item)[0];
                    return (
                      <div className="mt-[5px] mb-[5px]" key={uuid()}>
                        <span className="font-semibold mr-[65px] text-gray_dark_1">
                          {day}
                        </span>
                        <span className="text-gray text-right font-Inter font-normal ">
                          {pay}원
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="mb-[100px] ">
                  <span
                    className="mr-[20px] font-semibold text-gray_dark_1 
                              md:text-normal
                              sm:text-[13px]
                  "
                  >
                    총 사용 경비는
                  </span>
                  <span
                    className=" font-semibold text-blue 
                              md:text-normal
                              sm:text-[13px]
                  "
                  >
                    {formatNumberWithCommas(endingInfo.totalPay)}원
                  </span>
                  &nbsp;
                  <span
                    className=" font-semibold text-gray_dark_1
                              md:text-normal
                              sm:text-[13px]
                  "
                  >
                    입니다.
                  </span>
                </div>
                <div className="border-t border-gray pt-3 mb-[40px] text-normal text-right font-semibold text-gray_dark_1">
                  {endingInfo.remainingBudget >= 0 ? (
                    <p
                      className="
                    md:text-normal
                    sm:text-[13px]
                    "
                    >
                      +
                      <span className="text-orange">
                        {formatNumberWithCommas(endingInfo.remainingBudget)}
                      </span>
                      원 남았네요
                    </p>
                  ) : (
                    <p
                      className="
                    md:text-normal
                    sm:text-[13px]
                    "
                    >
                      <span className="text-orange">
                        {formatNumberWithCommas(
                          Math.abs(endingInfo.remainingBudget),
                        )}
                        원
                      </span>
                      예산 초과 되셨네요!
                    </p>
                  )}
                </div>

                <div
                  className=" text-right font-semibold text-gray_dark_1
                      md:text-normal
                      sm:text-[13px]
                "
                >
                  {endingInfo.perPersonCost >= 0 ? (
                    <p>
                      <span className="text-navy">
                        인당 {formatNumberWithCommas(endingInfo.perPersonCost)}
                        원
                      </span>{' '}
                      정산해 주세요!
                    </p>
                  ) : (
                    <p>
                      초과 예산 인당{' '}
                      <span className="text-navy">
                        {formatNumberWithCommas(
                          Math.abs(endingInfo.perPersonCost),
                        )}
                        원
                      </span>{' '}
                      추가 정산해 주세요!
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
    </section>
  );
};

export default React.memo(TotalPay);
