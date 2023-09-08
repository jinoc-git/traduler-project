import { type UseFormSetFocus, type UseFormWatch } from 'react-hook-form';
import { toast } from 'react-toastify';

import { type InputType } from '@pages/AddPlan';
import { type ModifyInputType } from '@pages/Plan';

interface UsePlanValidateArgs {
  addInputSetFocus?: UseFormSetFocus<InputType>;
  addInputWatch?: UseFormWatch<InputType>;
  modifyInputSetFocus?: UseFormSetFocus<ModifyInputType>;
  modifyInputWatch?: UseFormWatch<ModifyInputType>;
}

const usePlanValidate = (args: UsePlanValidateArgs) => {
  const {
    addInputSetFocus,
    addInputWatch,
    modifyInputSetFocus,
    modifyInputWatch,
  } = args;

  const checkTitleAndCost = () => {
    if (addInputSetFocus !== undefined && addInputWatch !== undefined) {
      if (
        addInputWatch('title').length > 10 ||
        addInputWatch('title').length < 3
      ) {
        toast.error('제목은 2~10글자로 입력해 주세요.');
        addInputSetFocus('title');
        return false;
      }
      if (
        addInputWatch('totalCost') > 10000000 ||
        addInputWatch('totalCost') <= 0
      ) {
        toast.error('예산은 0원 초과 1천만원 이하로 입력해 주세요');
        addInputSetFocus('totalCost');
        return false;
      }
    }

    if (modifyInputSetFocus !== undefined && modifyInputWatch !== undefined) {
      if (
        modifyInputWatch('title').length > 10 ||
        modifyInputWatch('title').length < 3
      ) {
        toast.error('제목은 2~10글자로 입력해 주세요.');
        modifyInputSetFocus('title');
        return false;
      }
      if (
        modifyInputWatch('totalCost') > 100000000 ||
        modifyInputWatch('totalCost') <= 0
      ) {
        toast.error('예산은 0원 초과 1천만원 이하로 입력해 주세요');
        modifyInputSetFocus('totalCost');
        return false;
      }
    }

    return true;
  };

  return { checkTitleAndCost };
};

export default usePlanValidate;
