/* eslint-disable  @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
      <div className="flex items-center h-[30px] my-[10px]">
        <div className="flex items-center gap-2">
          <IconFriends w="20" h="15" fill="#4E4F54" />
          <label className="font-semibold text-normal text-gray_dark_1 mr-[80px]">
            동행
          </label>
        </div>
        <div className="flex font-semibold text-normal text-gray_dark_1">
          {isOldInvitedUser ? (
            oldInvitedUser.length > 0 && (
              <div className="flex mr-3">
                {oldInvitedUser.slice(0, maxDisplayCount).map((user) => {
                  return (
                    <img
                      key={user.id}
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
                {oldInvitedUser.slice(0, maxDisplayCount).map((user) => (
                  <div key={user.id} className="mr-[2px]">
                    {user.nickname}
                  </div>
                ))}
                외 {oldInvitedUser.length - maxDisplayCount}명
              </>
            ) : (
              oldInvitedUser.map((user) => (
                <div key={user.id} className="mr-[2px]">
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
            className="border border-gray rounded-md text-xs p-1 ml-[8px] font-bold text-gray_dark_1 w-[45px] h-[30px] hover:bg-navy_dark hover:text-white duration-200"
            onClick={switchModal}
          >
            추가
          </button>
        )}
      </div>
      {isOpen && (
        <div className="absolute inset-0 z-40 w-full h-full bg-black/20">
          <SearchPeople closeModal={closeModal} />
        </div>
      )}
    </>
  );
};

export default Invite;
