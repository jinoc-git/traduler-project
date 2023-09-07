import React, { useEffect } from 'react';

import IconEditDefault from '@assets/icons/IconEditDefault';
import useConfirm from '@hooks/useConfirm';
import { modifyStateStore } from '@store/modifyStateStore';

interface PropsType {
  onClick: () => void;
  buttonDisabled?: boolean;
  page?: string;
  setIsModified?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Nav = ({ onClick, page }: PropsType) => {
  const { modifyState, setModify, setReadOnly } = modifyStateStore();
  const { confirm } = useConfirm();

  const handleButtonClick = () => {
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
      <div className="ml-[20px] text-navy_dark">여행 계획 시작 </div>
      <div className="flex items-center gap-2">
        <IconEditDefault w="16" h="16" fill="#162F70" />
        <button
          className="mr-[80px] text-navy_dark"
          onClick={handleButtonClick}
          type="submit"
        >
          {modifyState === 'modify' ? `저장하기` : `수정하기`}
        </button>
      </div>
    </nav>
  );
};

export default Nav;
