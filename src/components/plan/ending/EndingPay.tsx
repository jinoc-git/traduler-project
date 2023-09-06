import React from 'react';

import IconWallet from '@assets/icons/IconWallet';
import { formatNumberWithCommas } from '@utils/calcDutchPay';

import PayLayout from '../PayLayout';

interface PropsType {
  pay: number;
}

const EndingPay = ({ pay }: PropsType) => {
  return (
    <PayLayout>
      <div className="flex items-center">
        <IconWallet w="20" h="18" fill="#4E4F54" />
        <p className=" mr-[51px] ml-[8px]">전체 예산</p>
        <p>{formatNumberWithCommas(pay)} 원</p>
      </div>
    </PayLayout>
  );
};

export default EndingPay;
