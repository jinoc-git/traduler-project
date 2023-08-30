import React from 'react';

interface PropsType {
  onClick?: () => void;
  buttonDisabled?: boolean;
}

const Nav = ({ onClick, buttonDisabled }: PropsType) => {
  return (
    <nav className="flex justify-between border-b-[1px] border-navy py-[11.5px]">
      <div className="ml-[20px] text-blue_dark">여행 계획 시작</div>
      <button
        className="mr-[80px] text-blue_dark"
        onClick={onClick}
        type="submit"
        disabled={buttonDisabled}
      >
        저장하기
      </button>
    </nav>
  );
};

export default Nav;
