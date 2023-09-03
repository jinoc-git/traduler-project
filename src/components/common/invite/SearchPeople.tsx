/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { findUsers, updateMates } from '@api/planMates';
import IconVector from '@assets/icons/IconVector';
import { inviteUserStore } from '@store/inviteUserStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { type UserType } from 'types/supabase';

import UserList from './UserList';

interface InputType {
  userInfo: string;
}

interface PropsType {
  closeModal: () => void;
}

const SearchPeople = ({ closeModal }: PropsType) => {
  const {
    register,
    formState: { errors },
  } = useForm<InputType>();
  const [people, setPeople] = useState<UserType[]>([]);
  const { id: planId } = useParams();

  // 유저 검색
  const searchUser: SubmitHandler<InputType> = async (data) => {
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
  const handleInvite = async (user: UserType) => {
    const conf = window.confirm('해당 여행에 초대하시겠습니까?');
    if (conf) {
      inviteUser(user);
    }
  };

  // 유저 초대 react-query
  const queryClient = useQueryClient();
  const inviteMutation = useMutation({
    mutationFn: async ([usersId, planId]: [string[], string]) => {
      await updateMates(usersId, planId);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['planMates'] });
    },
  });

  // 저장 버튼 눌렀을 때 실행
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

  // 초대한 유저 삭제
  const deleteUser = (idx: number) => {
    const deletedUser = invitedUser.filter((_, index) => index !== idx);
    setUser(deletedUser);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
      <div className="mx-auto   w-modal h-modal_2 bg-gray_light_2 rounded-lg shadow-card p-6">
        <div className="flex flex-col justify-end items-start gap-2">
          <p className="text-[gray_dark_1] text-xl  ">동행 초대하기</p>
          <p className="text-[gray] text-xl  ">
            이 여행에 함께할 친구를 초대해 보세요!
          </p>
        </div>
        <label className="text-sm">초대된 사람</label>
        <div className="overflow-scroll w-auth h-[120px] bg-white rounded-lg ">
          {invitedUser.length !== 0 &&
            invitedUser.map((person, idx) => {
              return (
                <div key={person.email}>
                  <UserList person={person} idx={idx} deleteUser={deleteUser} />
                </div>
              );
            })}
        </div>
        <div className="flex flex-col">
          <label className="text-sm">동행 찾기</label>
          <div className="relative flex items-center ">
            <span className="absolute ml-3 text-gray-400 focus-within:text-gray">
              <IconVector fill="#ACACAC" />
            </span>
            <input
              placeholder="닉네임 또는 이메일 주소로 초대할 사람을 검색하세요."
              {...register('userInfo', {
                required: '필수 입력값입니다.',
                minLength: {
                  value: 2,
                  message: '2글자 이상 입력하세요.',
                },
                pattern: {
                  value: /^[가-힣|a-z|A-Z|0-9|\s-]*$/,
                  message: '모음, 자음 안됨',
                },
              })}
              onChange={(e) =>
                debouncedSearchUser({ userInfo: e.target.value })
              }
              className="pr-3 pl-10 w-auth h-10 border rounded-lg border-none "
            />
          </div>
          <p>{errors?.userInfo?.message}</p>
        </div>
        <div className="overflow-scroll w-[450px] h-[240px] bg-white rounded-lg mt-3">
          {people?.length === 0 && (
            <div className="text-center">검색 결과가 없습니다.</div>
          )}
          {people
            .filter(
              (person) =>
                invitedUser.filter((user) => user.id === person.id).length ===
                0,
            )
            .map((person: UserType, idx) => {
              return (
                <div key={person.id}>
                  <UserList
                    person={person}
                    idx={idx}
                    handleInvite={handleInvite}
                  />
                </div>
              );
            })}
        </div>
        <div className="flex justify-center items-center space-x-4 mt-10">
          <button
            onClick={closeModal}
            className="w-[12.5rem] h-[2.75rem] border-navy rounded-lg bg-white text-navy hover:bg-navy_light_1 hover:text-black hover:border-navy_light_3"
          >
            취소
          </button>
          <button
            onClick={inviteData}
            className="bottom-0 mx-auto w-[12.5rem] h-[2.75rem] rounded-lg border-navy  bg-navy text-white hover:bg-navy_light_3 hover:gray_light_1"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchPeople;
