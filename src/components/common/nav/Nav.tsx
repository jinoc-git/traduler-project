import React, { useEffect } from 'react';

import IconEditDefault from '@assets/icons/IconEditDefault';
import { modifyStateStore } from '@store/modifyStateStore';

interface PropsType {
  onClick: () => void;
  buttonDisabled?: boolean;
  page?: string;
  setIsModified?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Nav = ({ onClick, buttonDisabled, page }: PropsType) => {
  const { modifyState, setModify, setReadOnly } = modifyStateStore();
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
      <div className="flex items-center gap-2">
        <IconEditDefault w="16" h="16" fill="#162F70" />
        <button
          className="mr-[80px] text-navy_dark"
          onClick={onClick}
          type="submit"
          disabled={buttonDisabled}
        >
          {modifyState === 'modify' ? `저장하기` : `수정하기`}
        </button>
      </div>
    </nav>
  );
};

export default Nav;
