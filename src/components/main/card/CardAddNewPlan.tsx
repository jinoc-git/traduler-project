import React from 'react';
import { useNavigate } from 'react-router-dom';

import IconAdd from '@assets/icons/IconAdd';
import { defaultMainPlan } from '@assets/index';
import { planStore } from '@store/planStore';

import CardAddNewPlanGuideText from './CardAddNewPlanGuideText';

const CardAddNewPlan = () => {
  const navigate = useNavigate();
  const selectedPlan = planStore((state) => state.selectedPlan);

  return (
    <div
      className="flex flex-col items-center 
    sm:mt-[100px]
    md:mt-[125px]"
    >
      <div>
        <img
          src={defaultMainPlan}
          alt="여행 사진"
          className="sm:w-[100px] sm:h-[80px] sm:my-[15px]
          md:w-[125px] md:h-[100px]"
        />
      </div>
      <CardAddNewPlanGuideText select={selectedPlan} />
      {selectedPlan !== 'bookMark' && (
        <div>
          <button
            name="card-add-btn"
            className="group flex-center border border-#969696 rounded-[7px] text-[#969696] bg-white hover:bg-blue_dark hover:text-white hover:border-none
            sm:font-bold sm:gap-[10px] sm:mt-[32px] sm:w-[160px] sm:h-[47px]
            md:gap-[10px] md:mt-[35px] md:w-[160px] md:h-[45px]"
            onClick={() => {
              navigate('/addPlan');
            }}
          >
            <IconAdd w="w-[16px]" h="h-[16px]" />
            여행 생성하기
          </button>
        </div>
      )}
    </div>
  );
};

export default CardAddNewPlan;
