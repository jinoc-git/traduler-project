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
      <div className="flex items-center  sm:h-[27px] w-full md:justify-normal sm:justify-between ">
        <div className='flex items-center '>
          <IconWallet w="w-[20px]" h="h-[18px]" fill="#4E4F54" />
          <p
            className="sm:mr-[30px] sm:ml-[8px]
          md:mr-[51px] md:ml-[8px]"
          >
            전체 예산
          </p>
        </div>
        <p className="sm:read-only:text-xs md:read-only:text-normal">
          {formatNumberWithCommas(pay) + '원'}
        </p>
      </div>
    </PayLayout>
  );
};

export default EndingPay;
