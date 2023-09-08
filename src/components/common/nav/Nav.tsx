/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

import IconEditDefault from '@assets/icons/IconEditDefault';
import useConfirm from '@hooks/useConfirm';
import { modifyStateStore } from '@store/modifyStateStore';

interface PropsType {
  onClick: () => void;
  buttonDisabled?: boolean;
  page?: string;
  setIsModified?: React.Dispatch<React.SetStateAction<boolean>>;
  isValid: boolean;
}

const Nav = ({ onClick, isValid, page }: PropsType) => {
  const { modifyState, setModify, setReadOnly, requiredDates } =
    modifyStateStore();

  const { confirm } = useConfirm();

  const handleButtonClick = () => {
    if (!isValid) {
      toast.error('제목과 예산을 입력해 주세요');
      return;
    }
    if (!requiredDates.start && !requiredDates.end) {
      toast.error('시작 날짜와 종료 날짜를 입력해 주세요.');
      return;
    }
    const confTitle = '여행 저장하기';
    const confDesc = '이대로 저장하시겠습니까?';
    const confFunc = () => {
      onClick();
    };
    if (modifyState === 'modify') {
      confirm.default(confTitle, confDesc, confFunc);
    } else onClick();
  };

  useEffect(() => {
    if (page === ' plan') {
      setReadOnly();
    } else if (page === 'addPlan') {
      setModify();
    }
    return () => {
      setReadOnly();
    };
  }, []);

  return (
    <nav className="flex justify-between border-b-[1px] border-navy py-[11.5px] items-center">
      <div className="ml-[20px] text-navy_dark">여행 계획 시작</div>
      <div className="flex items-center">
        <button
          className="mr-[80px] text-navy_dark flex items-center gap-2"
          type="submit"
          onClick={handleButtonClick}
        >
          <IconEditDefault w="16" h="16" fill="#162F70" />
          {modifyState === 'modify' ? `저장하기` : `수정하기`}
        </button>
      </div>
    </nav>
  );
};

export default Nav;
