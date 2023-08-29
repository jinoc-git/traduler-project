/* eslint-disable  @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getMates } from '@api/planMates';
import { inviteUserStore } from '@store/inviteUserStore';
import { useQuery } from '@tanstack/react-query';

import SearchPeople from './SearchPeople';

const Invite = () => {
  const [isOpen, setIsOpen] = useState(false);
  const switchModal = () => {
    setIsOpen((state) => !state);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const { invitedUser, inviteUser, resetInvitedUser } = inviteUserStore();

  const { id: planId } = useParams();
  const { data } = useQuery(['planMates'], async () => {
    if (planId !== undefined) {
      const res = await getMates(planId);
      return res;
    } else return null;
  });
  // if (data != null && data.length !== 0) {
  //   console.log('planMates data :', data);
  // }

  const isInvitedUser = invitedUser.length !== 0;
  const maxDisplayCount = 4;

  // plan_mates에서 불러온 데이터가 있을 때 store에 invtedUser 업데이트
  useEffect(() => {
    resetInvitedUser();
    if (data != null) {
      data.forEach((user) => {
        inviteUser(user);
      });
    }
  }, [data]);

  return (
    <>
      <div className="flex items-center justify-between h-16 py-3">
        <label className="text-[16px] font-semibold">동행</label>
        <div className="text-[13px] font-semibold flex">
          {isInvitedUser ? (
            invitedUser.length > 0 && (
              <div className="flex mr-3">
                {invitedUser.slice(0, maxDisplayCount).map((user, idx) => {
                  if (user.avatar_url != null) {
                    return (
                      <img
                        key={idx}
                        src={user.avatar_url}
                        className="w-6 h-6 rounded-full ml-[-10px] object-cover"
                      />
                    );
                  } else {
                    return (
                      <div
                        key={idx}
                        className="w-6 h-6 rounded-full bg-slate-500 ml-[-10px]"
                      />
                    );
                  }
                })}
              </div>
            )
          ) : (
            <>로딩중...</>
          )}
          {isInvitedUser ? (
            invitedUser.length > maxDisplayCount ? (
              <>
                {invitedUser.slice(0, maxDisplayCount).map((user, idx) => (
                  <div key={idx} className="mr-[2px]">
                    {user.nickname}
                  </div>
                ))}
                외 {invitedUser.length - maxDisplayCount}명
              </>
            ) : (
              invitedUser.map((user, idx) => (
                <div key={idx} className="mr-[2px]">
                  {user.nickname}
                </div>
              ))
            )
          ) : (
            <>로딩중...</>
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
