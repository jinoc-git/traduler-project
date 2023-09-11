/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect } from 'react';
import { type UseFormWatch, type UseFormSetFocus } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import IconEditDefault from '@assets/icons/IconEditDefault';
import useConfirm from '@hooks/useConfirm';
import usePlanValidate from '@hooks/usePlanValidate';
import { type InputType } from '@pages/AddPlan';
import { type ModifyInputType } from '@pages/Plan';
import { modifyStateStore } from '@store/modifyStateStore';

interface PropsType {
  onClick: () => void;
  buttonDisabled?: boolean;
  page?: string;
  setIsModified?: React.Dispatch<React.SetStateAction<boolean>>;
  isValid: boolean;
  addInputSetFocus?: UseFormSetFocus<InputType>;
  addInputWatch?: UseFormWatch<InputType>;
  modifyInputSetFocus?: UseFormSetFocus<ModifyInputType>;
  modifyInputWatch?: UseFormWatch<ModifyInputType>;
}

const Nav: React.FC<PropsType> = (props) => {
  const {
    onClick,
    page,
    addInputSetFocus,
    addInputWatch,
    modifyInputSetFocus,
    modifyInputWatch,
  } = props;

  const { modifyState, setModify, setReadOnly, requiredDates } =
    modifyStateStore();

  const { checkTitleAndCost } = usePlanValidate({
    addInputSetFocus,
    addInputWatch,
    modifyInputSetFocus,
    modifyInputWatch,
  });

  const { confirm } = useConfirm();
  const { pathname } = useLocation();

  const handleButtonClick = () => {
    if (modifyState === 'modify') {
      const isTitleAndCostValid = checkTitleAndCost();

      if (!isTitleAndCostValid) return;

      if (
        (!requiredDates.start || !requiredDates.end) &&
        pathname === '/addPlan'
      ) {
        toast.error('시작 날짜와 종료 날짜를 입력해 주세요.');
        return;
      }
      const confTitle = '여행 저장하기';
      const confDesc = '이대로 저장하시겠습니까?';
      const confFunc = () => {
        onClick();
      };
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
    <nav
      className="flex justify-between border-b-[1px] border-navy py-[11.5px] items-center
    sm:mt-[35px]
    md:mt-0"
    >
      <div
        className="ml-[20px] text-navy_dark font-semibold
      sm:text-sm
      md:text-normal"
      >
        여행 계획 시작
      </div>
      <div
        className="flex items-center font-semibold
      sm:text-sm
      md:text-normal"
      >
        <button
          className="mr-[80px] text-navy_dark flex items-center gap-2"
          type="submit"
          onClick={handleButtonClick}
        >
          <IconEditDefault w="w-[16px]" h="h-[16px]" fill="#162F70" />
          {modifyState === 'modify' ? `저장하기` : `수정하기`}
        </button>
      </div>
    </nav>
  );
};

export default Nav;
