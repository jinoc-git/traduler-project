import React from 'react';

import { defaultImageGray } from '@assets/index';
import { type UserType } from 'types/supabase';

interface PropsType {
  person: UserType;
  idx: number;
  handleInvite?: (user: UserType) => Promise<void>;
  deleteUser?: (idx: number) => void;
}

const UserList = ({ person, idx, handleInvite, deleteUser }: PropsType) => {
  return (
    <div className="flex justify-between items-center mr-5 ">
      <div className="flex items-center justify-start ml-5 gap-3 my-2">
        {typeof person.avatar_url === 'string' ? (
          <img
            className="object-cover rounded-full w-9 h-9"
            src={person.avatar_url}
            alt={`Avatar for ${person.nickname}`}
          />
        ) : (
          <img
            src={defaultImageGray}
            className="object-cover rounded-full w-9 h-9"
          />
        )}
        <div>
          <p className="text-normal text-blue">{person.nickname}</p>
          <p className="text-xs text-gray">{person.email}</p>
        </div>
      </div>
      <button
        className="border w-12 h-7 rounded-lg cursor-pointer text-gray_dark_2 border-gray_dark_1 hover:bg-blue_dark hover:text-white"
        onClick={
          handleInvite != null
            ? async () => {
                await handleInvite(person);
              }
            : () => deleteUser?.(idx)
        }
      >
        {handleInvite != null ? '초대' : '삭제'}
      </button>
    </div>
  );
};

export default UserList;
