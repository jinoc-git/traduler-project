import React from 'react';

import { type UserType } from 'types/supabase';

interface PropsType {
  person: UserType;
  idx: number;
  handleInvite?: (user: UserType) => Promise<void>;
  deleteUser?: (idx: number) => void;
}

const UserList = ({ person, idx, handleInvite, deleteUser }: PropsType) => {
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
