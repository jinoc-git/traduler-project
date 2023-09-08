import React from 'react';

import IconWallet from '@assets/icons/IconWallet';
import PayLayout from '@components/common/layout/PayLayout';
import { formatNumberWithCommas } from '@utils/calcDutchPay';

interface PropsType {
  pay: number;
}

const EndingPay = ({ pay }: PropsType) => {
  return (
    <PayLayout>
      <div className="flex items-center">
        <IconWallet w="w-[20px]" h="h-[18px]" fill="#4E4F54" />
        <p className=" mr-[51px] ml-[8px]">전체 예산</p>
        <p>{formatNumberWithCommas(pay)} 원</p>
      </div>
    </PayLayout>
  );
};

export default EndingPay;
