/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react';

import IconUserDefault from '@assets/icons/IconUserDefault';
import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';

interface CardUserListProps {
  participantsAvatarList: Array<string | null | undefined>;
  participantsNicknameList: string[];
}

const CardUserList: React.FC<CardUserListProps> = (props) => {
  const { participantsAvatarList, participantsNicknameList } = props;

  return (
    <div className="flex gap-3 sm:mt-[6px] md:mt-[8px]">
      <div className="flex">
        {participantsAvatarList.map((avatar, i) => {
          let gap = '';
          if (i > 0) {
            gap = '-ml-[8px]';
          }

          return avatar ? (
            <img
              key={uuid()}
              src={avatar}
              alt="유저아바타"
              className={`w-[20px] h-[20px] rounded-full ${gap} border border-[#979797] object-cover `}
            />
          ) : (
            <div
              className={`rounded-full ${gap} border border-[#979797] `}
              key={uuid()}
            >
              <IconUserDefault w={'20'} h={'20'} />
            </div>
          );
        })}
      </div>
      <div className='"text-gray_dark_1 md:text-sm sm:text-[8px]'>
        {participantsNicknameList.length <= 3 ? (
          participantsNicknameList.map((name) => `${name}`).join(', ')
        ) : (
          <>
            {participantsNicknameList.slice(0, 3).join(', ')} 외{' '}
            {participantsNicknameList.length - 3}명
          </>
        )}
      </div>
    </div>
  );
};

export default CardUserList;
