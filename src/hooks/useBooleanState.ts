import { useState } from 'react';

const useBooleanState = (init: boolean) => {
  const [value, setValue] = useState<boolean>(init);

  const toggleValue = () => {
    setValue((prev) => !prev);
  };

  const setNeedValue = (v: boolean) => {
    setValue(v);
  };

  return { value, toggleValue, setNeedValue };
};

export default useBooleanState;
