import React from 'react';

import { defaultImageGray } from '@assets/index';
import { userStore } from '@store/userStore';
import { type UserType } from 'types/supabase';

interface PropsType {
  person: UserType;
  idx: number;
  handleInvite?: (user: UserType) => Promise<void>;
  deleteUser?: (idx: number) => void;
}

const UserList = ({ person, idx, handleInvite, deleteUser }: PropsType) => {
  const { user } = userStore();
  return (
    <div className="flex items-center justify-between mr-5 ">
      <div className="flex items-center justify-start gap-3 my-2 ml-5">
        {typeof person.avatar_url === 'string' ? (
          <img
            className="object-cover rounded-full md:w-[45px] md:h-[45px] sm:w-[55px] sm:h-[55px]"
            src={person.avatar_url}
            alt={`Avatar for ${person.nickname}`}
          />
        ) : (
          <img
            src={defaultImageGray}
            className="object-cover rounded-full w-[45px] h-[45px]"
            alt="Avatar img"
          />
        )}
        <div>
          <p className="text-normal text-blue">{person.nickname}</p>
          <p className="sm:text-xs md:text-sm text-gray">{person.email}</p>
        </div>
      </div>
      {user?.id !== person.id && (
        <button
          name="userlist-multifunctional-btn"
          className="md:w-[45px] md:h-[30px] sm:w-[35px] sm:h-[20px] border rounded-lg cursor-pointer text-gray_dark_2 border-gray_dark_1 hover:bg-blue_dark hover:text-white text-xs hover:border-blue font-semibold"
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
      )}
    </div>
  );
};

export default UserList;
