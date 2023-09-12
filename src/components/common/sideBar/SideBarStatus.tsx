/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SideBarProgressBar from '@components/common/sideBar/SideBarProgressBar';
import calcDateProgress from '@utils/calcDateProgress';
import {
  changeDotFormatOfDate,
  formatMonthDay,
  removeYearOfDate,
} from '@utils/changeFormatDay';
import { type PlanType } from 'types/supabase';

interface SideBarStatusProps {
  isOpen: boolean;
  activePlan: PlanType | undefined;
  hasNextPlan: boolean;
  nextPlan: PlanType | undefined;
}

const SideBarStatus: React.FC<SideBarStatusProps> = (props) => {
  const [progress, setProgress] = useState('');
  const navigate = useNavigate();
  const { isOpen, activePlan, hasNextPlan, nextPlan } = props;
  const hasActivePlan = activePlan !== undefined;

  const status = hasActivePlan
    ? '여행 중'
    : hasNextPlan
    ? '여행 예정'
    : '여행 없음';

  const chipBackgroudColor = {
    '여행 중': 'bg-blue',
    '여행 예정': 'bg-yellow',
    '여행 없음': 'bg-orange',
  };
  const infoBackgroudColor = {
    '여행 중': 'bg-blue_light_1',
    '여행 예정': 'bg-yellow_light_1',
    '여행 없음': 'bg-orange_light_2',
  };

  const onClickPlan = () => {
    if (activePlan != null) navigate(`/plan/${activePlan.id}`);
    else if (nextPlan != null) navigate(`/plan/${nextPlan.id}`);
  };

  useEffect(() => {
    if (hasActivePlan) {
      const startDay = activePlan.dates[0];
      const endDay = activePlan.dates[activePlan.dates.length - 1];
      const percent = calcDateProgress(startDay, endDay);
      setProgress(percent);
    }
  }, [activePlan]);

  return (
    <div
      className="flex flex-col items-center border-slate-200
    sm:h-[234] sm:border-t-2 sm:py-[30px]
    md:h-[202px] md:border-y-2 md:py-[12px] "
    >
      <div
        className={`flex items-center justify-between mb-[15px] transition-all duration-300 ease-in-out ${
          isOpen ? 'sm:w-[309px] md:w-[197px] ' : ' md:w-[40px] md:flex-col '
        }`}
      >
        <span className="font-semibold text-xs text-gray_dark_1">STATUS</span>
        <div
          className={`flex-center rounded-[30px] text-xs text-white ${
            isOpen
              ? 'sm:w-[72.5px] sm:h-[22px] md:w-[72.5px] h-[22px]'
              : 'md:w-[38px] md:h-[10px]'
          } ${chipBackgroudColor[status]}`}
        >
          {isOpen && status}
        </div>
      </div>
      <div
        onClick={onClickPlan}
        className={`flex flex-col items-center cursor-pointer ${
          isOpen ? 'gap-2' : ''
        } rounded-xl overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? 'flex-center flex-col sm:w-[308px] sm:h-[125px] md:w-[197px] h-[125px]'
            : 'md:w-[40px] h-[125px]'
        } ${infoBackgroudColor[status]}`}
      >
        {/* 닫혔을 때 여행 중, 예정일 때 날짜 표시 */}
        {!isOpen && status === '여행 중' && (
          <p className="text-sm pt-2">
            {removeYearOfDate(activePlan?.dates[0])}
          </p>
        )}
        {!isOpen && status === '여행 예정' && (
          <p className="text-xs pt-3">{removeYearOfDate(nextPlan?.dates[0])}</p>
        )}

        {/* 여행 중일 때만 진행률 표시 */}
        {status === '여행 중' && (
          <div
            className={`flex ${
              isOpen
                ? 'flex-col sm:gap- md:gap-1'
                : ' md:flex-col-reverse gap-1'
            } items-center`}
          >
            <p
              className={` bg-gradient-to-r from-blue_dark to-blue text-transparent bg-clip-text font-bold ${
                isOpen ? 'text-sm ' : 'text-xs'
              }`}
            >
              {progress + '%'}
            </p>
            <SideBarProgressBar percent={progress} isOpen={isOpen} />
            {isOpen && (
              <div className="flex justify-between w-[160px]">
                <span className=" text-sm">
                  {removeYearOfDate(activePlan?.dates[0])}
                </span>
                <span className=" text-sm">
                  {removeYearOfDate(
                    activePlan?.dates[activePlan.dates.length - 1],
                  )}
                </span>
              </div>
            )}
          </div>
        )}

        {/* 닫혔을 때만 보여지는 내용 */}
        {!isOpen && status === '여행 예정' && (
          <p className="text-sm leading-4 mt-3">
            여<br />행<br />예<br />정
          </p>
        )}
        {!isOpen && status === '여행 없음' && (
          <p className="text-sm leading-4 mt-8">
            여<br />행<br />없<br />음
          </p>
        )}

        {/* 열렸을 때만 보여지는 내용 */}
        {isOpen && status === '여행 중' && (
          <div className="text-center">
            <p className="w-[170px] font-semibold text-gray_dark_1 text-sm truncate">
              {activePlan?.title}
            </p>
            <p className="text-sm font-semibold text-gray_dark_1">
              ({changeDotFormatOfDate(activePlan?.dates[0])})
            </p>
          </div>
        )}
        {isOpen && status === '여행 예정' && (
          <div className="text-center">
            <p className="w-[170px] text-sm truncate">{nextPlan?.title}</p>
            <p className="text-sm">{formatMonthDay(nextPlan!.dates[0])}</p>
          </div>
        )}
        {isOpen && status === '여행 없음' && (
          <div className="text-center">
            <p className="w-[170px] text-sm truncate">
              예정된 여행이 없습니다.
            </p>
            <p className="text-sm">새로운 여행을 등록하세요!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBarStatus;
