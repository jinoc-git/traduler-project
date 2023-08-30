/* eslint-disable  @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getMates } from '@api/planMates';
import { defaultImageGray } from '@assets/index';
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

  const { oldInvitedUser, inviteUser, resetInvitedUser, syncInviteduser } =
    inviteUserStore();

  const { id: planId } = useParams();
  const { data } = useQuery(['planMates'], async () => {
    if (planId !== undefined) {
      const res = await getMates(planId);
      return res;
    } else return null;
  });

  const isOldInvitedUser =
    oldInvitedUser.length !== 0 && oldInvitedUser !== null;
  const maxDisplayCount = 4;

  // plan_mates에서 불러온 데이터가 있을 때 store에 invtedUser 업데이트
  useEffect(() => {
    if (data != null) {
      resetInvitedUser();
      data.forEach((user) => {
        inviteUser(user);
      });
    }
    syncInviteduser();
  }, [data]);

  return (
    <>
      <div className="flex items-center justify-between h-16 py-3">
        <label className="text-[16px] font-semibold">동행</label>
        <div className="text-[13px] font-semibold flex">
          {isOldInvitedUser ? (
            oldInvitedUser.length > 0 && (
              <div className="flex mr-3">
                {oldInvitedUser.slice(0, maxDisplayCount).map((user, idx) => {
                  return (
                    <img
                      key={idx}
                      src={
                        user.avatar_url != null
                          ? user.avatar_url
                          : defaultImageGray
                      }
                      className="object-cover w-6 h-6 rounded-full"
                    />
                  );
                })}
              </div>
            )
          ) : (
            <div className="w-6 h-6 mr-5 rounded-full bg-gray_light_3" />
          )}
          {isOldInvitedUser ? (
            oldInvitedUser.length > maxDisplayCount ? (
              <>
                {oldInvitedUser.slice(0, maxDisplayCount).map((user, idx) => (
                  <div key={idx} className="mr-[2px]">
                    {user.nickname}
                  </div>
                ))}
                외 {oldInvitedUser.length - maxDisplayCount}명
              </>
            ) : (
              oldInvitedUser.map((user, idx) => (
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
          <SearchPeople closeModal={closeModal} />
        </>
      )}
    </>
  );
};

export default Invite;
