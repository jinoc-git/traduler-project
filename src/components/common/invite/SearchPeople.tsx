/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import uuid from 'react-uuid';

import { findUsers, updateMates } from '@api/planMates';
import IconVector from '@assets/icons/IconVector';
import UserList from '@components/common/invite/UserList';
import useConfirm from '@hooks/useConfirm';
import { inviteUserStore } from '@store/inviteUserStore';
import { screenStore } from '@store/screenStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { type UserType } from 'types/supabase';

interface InputType {
  userInfo: string;
}

interface PropsType {
  closeModal: () => void;
}

const SearchPeople = ({ closeModal }: PropsType) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({ mode: 'onChange' });
  const [people, setPeople] = useState<UserType[]>([]);
  const { id: planId } = useParams();

  const screenSize = screenStore((state) => state.screenSize);

  const searchUser: SubmitHandler<InputType> = async (data) => {
    if (data.userInfo === '') {
      setPeople([]);
      return;
    }
    const res = await findUsers(data.userInfo);
    if (res.nickname != null && res.email != null) {
      const searchedPeople: UserType[] = [];
      searchedPeople.push(...res.nickname);
      searchedPeople.push(
        ...res.email.filter(
          (user, idx) => searchedPeople[idx]?.id !== user?.id,
        ),
      );
      setPeople(searchedPeople);
    }
  };
  const debouncedSearchUser = _.debounce(searchUser, 300);

  const { invitedUser, inviteUser, setUser, syncInviteduser } =
    inviteUserStore();
  const usersId = invitedUser.map((item) => item.id);
  const { confirm } = useConfirm();
  const handleInvite = async (user: UserType) => {
    const confTitle = '동행 초대';
    const confDesc = '해당 여행에 초대하시겠습니까?';
    const confFunc = () => {
      inviteUser(user);
    };
    confirm.default(confTitle, confDesc, confFunc);
  };

  const queryClient = useQueryClient();
  const inviteMutation = useMutation({
    mutationFn: async ([usersId, planId]: [string[], string]) => {
      await updateMates(usersId, planId);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['planMates'] });
    },
  });

  const inviteData = () => {
    const Ids = invitedUser.map((item) => item.id);
    if (Ids !== undefined && planId !== undefined) {
      inviteMutation.mutate([usersId, planId]);
    }
    setUser(invitedUser);
    toast.success('저장되었습니다.');
    closeModal();
    syncInviteduser();
  };

  const deleteUser = (idx: number) => {
    const confTitle = '동행 초대 삭제';
    const confDesc = '해당 여행에서 삭제하시겠습니까?';
    const confFunc = () => {
      const deletedUser = invitedUser.filter((_, index) => index !== idx);
      setUser(deletedUser);
    };
    confirm.delete(confTitle, confDesc, confFunc);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  });

  return (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen md:flex-center md:items-center sm:flex sm:items-end ">
      <div
        className="p-6 mx-auto  h-modal_2
        md:rounded-lg md:w-modal md:bg-gray_light_2 md:shadow-card
        sm:bottom-0 sm:rounded-t-lg  sm:w-[360px]  sm:bg-bg_white  
        "
      >
        <div className="flex flex-col items-start justify-end gap-2">
          <p className="text-lg font-bold text-navy">동행 초대하기</p>
          <p className="text-[gray] text-normal  ">
            이 여행에 함께할 친구를 초대해 보세요!
          </p>
        </div>
        <div className="flex flex-col md:gap-[10px] sm:gap-[28px]">
          {/* 초대한 사람 */}
          <div>
            <label className="text-gray-dark-1 font-inter font-bold md:text-xs sm:sm leading-[24px]">
              초대한 사람 보기
            </label>
            <div className="flex flex-col items-center overflow-scroll md:w-[450px] sm:w-full h-[126px] bg-white rounded-lg ">
              {invitedUser.length !== 0 &&
                invitedUser.map((person, idx) => {
                  return (
                    <div key={uuid()} className="w-full ">
                      <UserList
                        person={person}
                        idx={idx}
                        deleteUser={deleteUser}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
          {/* 동행찾기 */}
          <div className="flex flex-col">
            <label className="text-gray-dark-1 font-inter font-bold md:text-xs sm:sm leading-[24px]">
              동행 찾기
            </label>
            <form
              name="search-people-form"
              onSubmit={handleSubmit(debouncedSearchUser)}
            >
              <div className="relative flex items-center ">
                <span className="absolute ml-3 text-gray-400 focus-within:text-gray ">
                  {screenSize === 'md' ? (
                    <IconVector w="w-[20px]" h="h-[20px]" fill="#ACACAC" />
                  ) : (
                    <IconVector w="w-[20px]" h="h-[20px]" fill="#ACACAC" />
                  )}
                </span>
                <input
                  placeholder="닉네임 또는 이메일 주소로 초대할 사람을 검색하세요."
                  {...register('userInfo', {
                    pattern: {
                      value: /^[가-힣|a-z|A-Z|0-9|\s-]*$/,
                      message: '모음, 자음 안됨',
                    },
                  })}
                  onChange={(e) => {
                    const inputValue = e.target.value.trim();
                    debouncedSearchUser({ userInfo: inputValue });
                  }}
                  className="h-10 pl-10 pr-3 border border-none rounded-3xl w-auth md:text-sm sm:text-xs "
                />
              </div>
              <p>{errors?.userInfo?.message}</p>
            </form>
          </div>
          {/* 검색결과 */}
          <div className="flex flex-col items-center overflow-scroll w-full md:h-[240px] sm:h-[240px] bg-white rounded-lg md:mt-3 sm:mt-0">
            {people?.length === 0 && (
              <div className="flex items-center justify-center text-center mt-[110px] md:text-normal sm:text-sm">
                검색 결과가 없습니다.
              </div>
            )}
            {people
              .filter(
                (person) =>
                  invitedUser.filter((user) => user.id === person.id).length ===
                  0,
              )
              .map((person: UserType, idx) => {
                return (
                  <div key={uuid()} className="w-full">
                    <UserList
                      person={person}
                      idx={idx}
                      handleInvite={handleInvite}
                    />
                  </div>
                );
              })}
          </div>
          {/* 버튼 */}
          <div className="flex items-center justify-center mt-auto space-x-4">
            <button
              name="invite-cancel-btn"
              onClick={closeModal}
              className="md:w-[12.5rem] md:h-[2.75rem] sm:w-[150px] sm:h-[40px] rounded-lg border border-navy bg-white text-navy  hover:bg-navy_light_1 hover:text-navy_dark hover:border-navy_light_3"
            >
              취소
            </button>
            <button
              name="invite-add-person-btn"
              onClick={inviteData}
              className="md:w-[12.5rem] md:h-[2.75rem] sm:w-[150px] sm:h-[40px] bottom-0 mx-auto  rounded-lg border border-navy bg-navy text-white  hover:bg-navy_light_3 hover:border-bg-navy_light_3"
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPeople;
