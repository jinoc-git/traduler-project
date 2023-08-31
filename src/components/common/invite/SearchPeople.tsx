/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { findUsers, updateMates } from '@api/planMates';
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
    alert('저장되었습니다');
    closeModal();
    syncInviteduser();
  };

  // 초대한 유저 삭제
  const deleteUser = (idx: number) => {
    console.log(invitedUser[idx]);
    const deletedUser = invitedUser.filter((_, index) => index !== idx);
    setUser(deletedUser);
  };

  return (
    <div className="absolute w-[500px] h-[500px] bg-white border rounded-lg flex flex-col z-20 right-[335px] items-center">
      <div className="overflow-scroll w-[450px] bg-gray_light_3 rounded-lg mt-3">
        <div>초대한 목록</div>
        {invitedUser.length !== 0 &&
          invitedUser.map((person, idx) => {
            return (
              <div key={idx}>
                <UserList person={person} idx={idx} deleteUser={deleteUser} />
              </div>
            );
          })}
      </div>
      <div className="flex flex-col">
        <div>검색 하기</div>
        <input
          placeholder="이메일이나 닉네임을 입력하세요."
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
          onChange={(e) => debouncedSearchUser({ userInfo: e.target.value })}
          className="w-[250px] border rounded-lg outline-none"
        />
        <p>{errors?.userInfo?.message}</p>
      </div>
      <div className="overflow-scroll w-[450px] h-[250px] bg-gray_light_3 rounded-lg mt-3">
        {people?.length === 0 && (
          <div className="text-center">검색 결과가 없습니다.</div>
        )}
        {people
          .filter(
            (person) =>
              invitedUser.filter((user) => user.id === person.id).length === 0,
          )
          .map((person: UserType, idx) => {
            return (
              <div key={idx}>
                <UserList
                  person={person}
                  idx={idx}
                  handleInvite={handleInvite}
                />
              </div>
            );
          })}
      </div>
      <button onClick={inviteData} className="bottom-0 mx-auto">
        저장
      </button>
    </div>
  );
};

export default SearchPeople;
