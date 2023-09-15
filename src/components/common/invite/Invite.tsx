/* eslint-disable  @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import uuid from 'react-uuid';

import { getMates } from '@api/planMates';
import IconFriends from '@assets/icons/IconFriends';
import { defaultImageGray } from '@assets/index';
import SearchPeople from '@components/common/invite/SearchPeople';
import useBooleanState from '@hooks/useBooleanState';
import { inviteUserStore } from '@store/inviteUserStore';
import { modifyStateStore } from '@store/modifyStateStore';
import { useQuery } from '@tanstack/react-query';

const Invite = () => {
  // const [isOpen, setIsOpen] = useState(false);

  const { value: isOpen, setNeedValue: setIsOpen } = useBooleanState(false);
  const { value: isAnimation, setNeedValue: setIsAnimation } =
    useBooleanState(false);
  const openModal = () => {
    setIsOpen(true);
    setIsAnimation(true);
  };
  const closeModal = () => {
    setIsAnimation(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 400);
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
  const maxDisplayCount = 3;

  useEffect(() => {
    return () => {
      resetInvitedUser();
    };
  }, []);

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
      <div
        className="flex 
      sm:w-[286px] sm:mx-auto sm:justify-normal sm:flex-col
      md:w-[700px] md:h-[30px] md:mx-[6px] md:my-[10px]  md:flex-row md:justify-normal md:items-center "
      >
        <div className="flex justify-start">
          <div
            className="flex items-center 
            sm:gap-[8px] 
            md:gap-2"
          >
            <IconFriends w="20" h="15" fill="#4E4F54" />
            <label
              className="font-semibold  text-gray_dark_1 
          sm:w-[24px] sm:text-sm sm:mr-[15px]
          md:w-[30px] md:text-normal md:mr-[80px]"
            >
              동행
            </label>
          </div>
          {isOldInvitedUser ? (
            oldInvitedUser.length > 0 && (
              <div className="flex mr-3">
                {oldInvitedUser.slice(0, maxDisplayCount).map((user) => {
                  return (
                    <img
                      alt="profile-img"
                      key={uuid()}
                      src={
                        user.avatar_url != null
                          ? user.avatar_url
                          : defaultImageGray
                      }
                      className="object-cover rounded-full
                      sm:w-[16px] sm:h-[16px]
                      md:w-6 md:h-6"
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
              <div className="flex items-center text-gray_dark_1 sm:text-xs sm:font-semibold md:text-sm md:font-semibold">
                {oldInvitedUser.slice(0, maxDisplayCount).map((user) => (
                  <div key={uuid()} className="mr-[2px]">
                    {user.nickname}
                  </div>
                ))}
                외 {oldInvitedUser.length - maxDisplayCount}명
              </div>
            ) : (
              oldInvitedUser.map((user) => (
                <div
                  key={uuid()}
                  className="mr-[2px] md:text-sm
              sm:text-xs sm:font-semibold sm:text-gray_dark_1"
                >
                  {user.nickname}&nbsp;
                </div>
              ))
            )
          ) : (
            <div className="sm:w-[50px] sm:h-[21px] sm:text-sm sm:font-semibold sm:text-gray_dark_1">
              로딩중...
            </div>
          )}
        </div>
        <div className="md:mt-0 sm:flex sm:justify-end sm:h-[30px] sm:mt-[5px]">
          {modifyState === 'modify' && (
            <button
              name="invite-invite-btn"
              className="border border-gray rounded-md text-xs p-1 ml-[8px] font-bold text-gray_dark_1 w-[45px] h-[30px] hover:bg-navy_dark hover:text-white duration-200
            sm:w-[40px] sm:h-[28px]
            md:w-[45px] md:h-[30px]"
              onClick={openModal}
            >
              추가
            </button>
          )}
        </div>
      </div>
      {isOpen && (
        <SearchPeople closeModal={closeModal} isAnimation={isAnimation} />
      )}
    </>
  );
};

export default React.memo(Invite);
