import React, { useEffect, useState } from 'react';

import { inviteUserStore } from '@store/inviteUserStore';

import SearchPeople from './SearchPeople';

const Invite = () => {
  const [isOpen, setIsOpen] = useState(false);
  const switchModal = () => {
    setIsOpen((state) => !state);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const { invitedUser } = inviteUserStore();
  useEffect(() => {
    console.log(invitedUser);
  }, [invitedUser]);

  const maxDisplayCount = 4;

  return (
    <div className="flex items-center justify-between h-16 py-3">
      <label className="text-[16px] font-semibold">동행</label>
      <div className="text-[13px] font-semibold flex">
        {invitedUser.length > maxDisplayCount ? (
          <>
            {invitedUser.slice(0, maxDisplayCount).map((user, idx) => (
              <div key={idx}>{user.nickname}</div>
            ))}
            외 {invitedUser.length - maxDisplayCount}명
          </>
        ) : (
          invitedUser.map((user, idx) => <div key={idx}>{user.nickname}</div>)
        )}
      </div>
      <button
        className="border border-[#484848] rounded-lg text-[12px] p-2"
        onClick={switchModal}
      >
        추가
      </button>
      {isOpen && (
        <>
          <div
            className="absolute inset-0 z-10 flex justify-center bg-black/20"
            onClick={closeModal}
          />
          <SearchPeople />
        </>
      )}
    </div>
  );
};

export default Invite;
