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
      const removeComma = addInputWatch('totalCost').replaceAll(',', '');
      const addCost = Number(removeComma);
      if (
        addInputWatch('title').length > 12 ||
        addInputWatch('title').length < 1
      ) {
        toast.error('제목은 1~12글자로 입력해 주세요.');
        addInputSetFocus('title');
        return false;
      }
      if (isNaN(addCost)) {
        toast.error('예산은 숫자만 입력해 주세요');
        addInputSetFocus('totalCost');
        return false;
      }
      if (addCost > 10000000 || addCost <= 0) {
        toast.error('예산은 0원 초과 1천만원 이하로 입력해 주세요');
        addInputSetFocus('totalCost');
        return false;
      }
    }

    if (modifyInputSetFocus !== undefined && modifyInputWatch !== undefined) {
      const removeComma = modifyInputWatch('totalCost').replaceAll(',', '');
      const modifyCost = Number(removeComma);

      if (
        modifyInputWatch('title').length > 12 ||
        modifyInputWatch('title').length < 1
      ) {
        toast.error('제목은 1~12글자로 입력해 주세요.');
        modifyInputSetFocus('title');
        return false;
      }
      if (modifyCost > 10000000 || modifyCost <= 0) {
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
