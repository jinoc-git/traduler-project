import React from 'react';
import { useNavigate } from 'react-router-dom';

import IconAdd from '@assets/icons/IconAdd';
import { defaultMainPlan } from '@assets/index';
import { usePlanStore } from '@store/usePlanStore';

const CardAddNewPlan = () => {
  const navigate = useNavigate();
  const selectedPlan = usePlanStore((state) => state.selectedPlan);

  return (
    <div className="flex flex-col items-center mt-[125px]">
      <div>
        <img
          src={defaultMainPlan}
          alt="여행 사진"
          className="w-[125px] h-[100px]"
        />
      </div>
      {selectedPlan === 'planning' ? (
        <div className="mt-[12px] font-SemiBold text-center text-[#969696] ">
          <p>아직 예정된 여행 일정이 없으시군요!</p>
          <p className="text-xlg">새로운 Tra-duler을 만들어보세요 :)</p>
        </div>
      ) : selectedPlan === 'traveling' ? (
        <div className="mt-[12px] font-SemiBold text-center text-[#969696] ">
          <p>여행 중인 일정이 없으시군요!</p>
          <p className="text-xlg">새로운 Tra-duler을 만들어보세요 :)</p>
        </div>
      ) : selectedPlan === 'end' ? (
        <div className="mt-[12px] font-SemiBold text-center text-[#969696] ">
          <p>다녀온 여행 일정이 없으시군요!</p>
          <p className="text-xlg">새로운 Tra-duler을 만들어보세요 :)</p>
        </div>
      ) : (
        <div className="mt-[12px] font-SemiBold text-center text-[#969696] ">
          <p>즐겨찾기한 여행이 없으시군요!</p>
          <p className="text-xlg">중요한 여행을 즐겨찾기에 추가해 보세요 :)</p>
        </div>
      )}
      {selectedPlan !== 'bookMark' && (
        <div>
          <button
            className="group flex-center md:gap-[10px] md:mt-[35px] md:w-[160px] md:h-[45px] border border-black rounded-[7px] bg-white hover:bg-blue_dark hover:text-white hover:border-none"
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
