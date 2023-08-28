import React, { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { findusers } from '@api/users';
import _ from 'lodash';
import { type UserType } from 'types/supabase';

interface InputType {
  userInfo: string;
}

const SearchPeople = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>();
  const [people, setPeople] = useState<UserType[]>([]);

  // users 테이블에서 닉네임이나 이메일이 includes되는 것들을 가져와서 검색결과로 보여주기
  const searchUser: SubmitHandler<InputType> = async (data) => {
    const res = await findusers(data.userInfo);
    if (res.nickname != null && res.email != null) {
      setPeople([...res.nickname, ...res.email]);
    }
  };
  const debouncedSearchUser = _.debounce(searchUser, 300);

  return (
    <div className="absolute w-[300px] h-[200px] bg-white border rounded-lg flex flex-col z-10 ">
      <form onSubmit={handleSubmit(debouncedSearchUser)}>
        <label>친구찾기</label>
        <div className="flex flex-col">
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
      </form>
      {people?.length === 0 && <div>검색 결과가 없습니다.</div>}
      <div className="overflow-scroll">
        {people.map((person: UserType, idx) => {
          return (
            <div key={idx} className="flex items-center gap-3 mb-3">
              <div>
                {typeof person.avatar_url === 'string' ? (
                  <img
                    className="object-cover border-2 rounded-full w-9 h-9"
                    src={person.avatar_url}
                    alt={`Avatar for ${person.nickname}`}
                  />
                ) : (
                  <div className="border-2 rounded-full w-9 h-9 bg-slate-500" />
                )}
              </div>
              <p>{person.nickname}</p>
              <p>{person.email}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchPeople;
