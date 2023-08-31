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
    <div className="flex items-center justify-center gap-3 my-2">
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
      <p>{person.nickname}</p>
      <p>{person.email}</p>
      <button
        onClick={
          handleInvite != null
            ? async () => {
                await handleInvite(person);
              }
            : () => deleteUser?.(idx)
        }
      >
        {handleInvite != null ? '추가' : '삭제'}
      </button>
    </div>
  );
};

export default UserList;
