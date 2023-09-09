/* eslint-disable  @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import uuid from 'react-uuid';

import { getMates } from '@api/planMates';
import IconFriends from '@assets/icons/IconFriends';
import { defaultImageGray } from '@assets/index';
import SearchPeople from '@components/common/invite/SearchPeople';
import { inviteUserStore } from '@store/inviteUserStore';
import { modifyStateStore } from '@store/modifyStateStore';
import { useQuery } from '@tanstack/react-query';

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
  const modifyState = modifyStateStore((state) => state.modifyState);

  const { id: planId } = useParams();

  const { data } = useQuery(['planMates', planId], async () => {
    if (planId !== undefined) {
      const res = await getMates(planId);
      return res;
    } else return null;
  });

  const isOldInvitedUser =
    oldInvitedUser.length !== 0 && oldInvitedUser !== null;
  const maxDisplayCount = 4;

  useEffect(() => {
    return () => {
      resetInvitedUser();
    };
  }, []);

  // plan_mates에서 불러온 데이터가 있을 때 store에 invtedUser 업데이트
  useEffect(() => {
    if (data !== undefined && data !== null) {
      resetInvitedUser();
      data.forEach((user) => {
        inviteUser(user);
      });
      syncInviteduser();
    }
  }, [data]);

  return (
    <>
      <div className="flex items-center space-x-2 h-[30px] my-[10px]">
        <IconFriends w="w-[20px]" h="h-[15px]" fill="#4E4F54" />
        <label className="font-semibold text-normal text-gray-dark-1">
          동행
        </label>
        <div className="flex font-semibold text-normal text-gray-dark-1 space-x-3">
          {isOldInvitedUser ? (
            oldInvitedUser.length > 0 && (
              <div className="flex space-x-1">
                {oldInvitedUser.slice(0, maxDisplayCount).map((user) => {
                  return (
                    <img
                      key={uuid()}
                      src={
                        user.avatar_url != null
                          ? user.avatar_url
                          : defaultImageGray
                      }
                      alt="userAvatar"
                      className="object-cover w-6 h-6 rounded-full"
                    />
                  );
                })}
              </div>
            )
          ) : (
            <div className="w-6 h-6 rounded-full bg-gray-light-3" />
          )}
          {isOldInvitedUser ? (
            oldInvitedUser.length > maxDisplayCount ? (
              <>
                {oldInvitedUser.slice(0, maxDisplayCount).map((user, index) => (
                  <div
                    key={uuid()}
                    className={`mr-${index === 0 ? '0' : '2'}px`}
                  >
                    {user.nickname}
                  </div>
                ))}
                외 {oldInvitedUser.length - maxDisplayCount}명
              </>
            ) : (
              oldInvitedUser.map((user, index) => (
                <div
                  key={user.id}
                  className={`mr-${index === 0 ? '0' : '2'}px`}
                >
                  {user.nickname}&nbsp;
                </div>
              ))
            )
          ) : (
            <>로딩중...</>
          )}
        </div>
        {modifyState === 'modify' && (
          <button
            className="border border-gray rounded-md text-xs p-1 ml-2 font-bold text-gray-dark-1 w-20 h-10 hover:bg-navy-dark hover:text-white duration-200"
            onClick={switchModal}
          >
            추가
          </button>
        )}
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-40 h-screen bg-black/20">
          <SearchPeople closeModal={closeModal} />
        </div>
      )}
    </>
  );
};

export default Invite;
