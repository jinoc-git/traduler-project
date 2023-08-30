import React, { useEffect } from 'react';

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
  }, []);

  return (
    <nav className="flex justify-between border-b-[1px] border-navy py-[11.5px]">
      <div className="ml-[20px] text-blue_dark">여행 계획 시작</div>
      <button
        className="mr-[80px] text-blue_dark"
        onClick={onClick}
        type="submit"
        disabled={buttonDisabled}
      >
        {modifyState === 'modify' ? `저장하기` : `수정하기`}
      </button>
    </nav>
  );
};

export default Nav;
