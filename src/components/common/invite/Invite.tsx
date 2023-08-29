/* eslint-disable  @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// import { getMates } from '@api/planMates';
import { inviteUserStore } from '@store/inviteUserStore';
// import { useQuery } from '@tanstack/react-query';

import SearchPeople from './SearchPeople';

const Invite = () => {
  const [isOpen, setIsOpen] = useState(false);
  const switchModal = () => {
    setIsOpen((state) => !state);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const { invitedUser, inviteUser } = inviteUserStore();
  useEffect(() => {
    console.log(invitedUser);
  }, [invitedUser]);

  // const { id: planId } = useParams();
  // const { data } = useQuery(['planMates', planId], async () => {
  //   if(planId !== undefined)
  //   try {
  //     const res = await getMates(planId)
  //     return res.data
  //   }
  // });
  // console.log(data);

  const maxDisplayCount = 4;

  return (
    <>
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
      </div>
      {isOpen && (
        <>
          <div className="relative bg-black/20" onClick={closeModal} />
          <SearchPeople />
        </>
      )}
    </>
  );
};

export default Invite;
