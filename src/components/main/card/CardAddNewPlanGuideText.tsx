import React from 'react';

interface CardAddNewPlanGuideTextProps {
  select: 'bookMark' | 'traveling' | 'planning' | 'end';
}

const CardAddNewPlanGuideText = ({ select }: CardAddNewPlanGuideTextProps) => {
  const guideText = {
    bookMark: '즐겨찾기한 여행이 없으시군요!',
    traveling: '여행 중인 일정이 없으시군요!',
    planning: '아직 예정된 여행 일정이 없으시군요!',
    end: '다녀온 여행 일정이 없으시군요!',
  } as const;

  return (
    <div
      className="font-SemiBold text-center text-[#969696]
        sm:mt-[8px] sm:text-sm
        md:mt-[12px] md:text-normal"
    >
      <p>{guideText[select]}</p>
      <p className="sm:text-lg md:text-xlg">
        {select === 'bookMark'
          ? '중요한 여행을 즐겨찾기에 추가해 보세요 :)'
          : '새로운 Tra-duler을 만들어보세요 :)'}
      </p>
    </div>
  );
};

export default CardAddNewPlanGuideText;
