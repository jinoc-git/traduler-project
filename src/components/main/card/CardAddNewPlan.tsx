import React from 'react';
import { useNavigate } from 'react-router-dom';

import IconAdd from '@assets/icons/IconAdd';
import { defaultMainPlan } from '@assets/index';
import { usePlanStore } from '@store/usePlanStore';

const CardAddNewPlan = () => {
  const navigate = useNavigate();
  const selectedPlan = usePlanStore((state) => state.selectedPlan);

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
      {selectedPlan === 'planning' ? (
        <div
          className="font-SemiBold text-center text-[#969696]
        sm:mt-[8px] sm:text-sm
        md:mt-[12px] md:text-normal"
        >
          <p>아직 예정된 여행 일정이 없으시군요!</p>
          <p className="sm:text-lg md:text-xlg">
            새로운 Tra-duler을 만들어보세요 :)
          </p>
        </div>
      ) : selectedPlan === 'traveling' ? (
        <div
          className="font-SemiBold text-center text-[#969696]      
          sm:mt-[8px] sm:text-sm
          md:mt-[12px] md:text-normal"
        >
          <p>여행 중인 일정이 없으시군요!</p>
          <p className="sm:text-lg md:text-xlg">
            새로운 Tra-duler을 만들어보세요 :)
          </p>
        </div>
      ) : selectedPlan === 'end' ? (
        <div
          className="font-SemiBold text-center text-[#969696]
          sm:mt-[8px] sm:text-sm
          md:mt-[12px] md:text-normal"
        >
          <p>다녀온 여행 일정이 없으시군요!</p>
          <p className="sm:text-lg md:text-xlg">
            새로운 Tra-duler을 만들어보세요 :)
          </p>
        </div>
      ) : (
        <div
          className="font-SemiBold text-center text-[#969696]
          sm:mt-[8px] sm:text-sm
          md:mt-[12px] md:text-normal"
        >
          <p>즐겨찾기한 여행이 없으시군요!</p>
          <p className="sm:text-lg md:text-xlg">
            중요한 여행을 즐겨찾기에 추가해 보세요 :)
          </p>
        </div>
      )}
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
