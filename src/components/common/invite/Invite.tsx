import React, { useState } from 'react';

import SearchPeople from './SearchPeople';

const Invite = () => {
  const [isOpen, setIsOpen] = useState(false);
  const switchModal = () => {
    setIsOpen((state) => !state);
  };
  return (
    <div className="flex items-center justify-between py-3">
      <label className="text-[16px] font-semibold">동행</label>
      <div className="text-[13px] font-semibold">
        홍길동, 홍길동, 홍길동, 홍길동 외 3명
      </div>
      <button
        className="border border-[#484848] rounded-lg text-[12px] p-2"
        onClick={switchModal}
      >
        추가
      </button>
      {isOpen && <SearchPeople />}
    </div>
  );
};

export default Invite;
