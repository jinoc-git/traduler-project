/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { checkUserNickname, updateUserNickname } from '@api/supabaseAuth';
import { defaultImage } from '@assets/index';
import useFormValidator from '@hooks/useFormValidator';
import { userStore } from '@store/userStore';
import { removeUserAvartar, updateUserAvatar } from '@utils/updateUserProfile';

interface EditProfileModalProps {
  handler: React.Dispatch<React.SetStateAction<boolean>>;
}

interface EditProfileForm {
  avatar: FileList;
  nickname: string;
}

const EditProfileModal = ({ handler }: EditProfileModalProps) => {
  const [previewImg, setPreviewImg] = useState<string>('');
  const [isDuplicate, setIsDuplicate] = useState<boolean>(true);
  const [isRemoveAvatar, setIsRemoveAvatar] = useState<boolean>(false);

  const user = userStore((state) => state.user);
  const setUser = userStore((state) => state.setUser);

  const { nicknameValidator } = useFormValidator();

  const onClickCloseModalHandler = () => {
    handler(false);
  };

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileForm>({ mode: 'onChange' });

  const preview = watch('avatar');
  const nickname = watch('nickname');
  const blockSubmitBtn = isRemoveAvatar
    ? false
    : (preview?.length === 0 && nickname === '') ||
      (nickname !== '' && isDuplicate);

  const checkNicknameDuplication = async () => {
    const res = await checkUserNickname(nickname);
    if (res) {
      setIsDuplicate(!res);
    } else {
      console.log('닉네임 중복');
    }
  };

  const onSubmitEditProfileBtn: SubmitHandler<EditProfileForm> = async (
    data,
  ) => {
    if (data.nickname !== '' && isDuplicate) return;
    if (user == null) return;

    // 닉네임 변경
    if (data.nickname !== '') {
      const res = await updateUserNickname(data.nickname, user.id);

      if (res) {
        const { id, email, nickname, profileImg } = res;
        setUser({
          id,
          email,
          nickname,
          profileImg,
        });
      }
    }

    // 프로필 사진 변경
    if (data.avatar[0]) {
      const res = await updateUserAvatar(data.avatar[0], user.email, user.id);

      if (res) {
        const { id, email, nickname, profileImg } = res;
        setUser({
          id,
          email,
          nickname,
          profileImg,
        });
      }
    }

    // 프로필 이미지 삭제
    if (isRemoveAvatar) {
      const res = await removeUserAvartar(user.id);

      if (res) {
        const { id, email, nickname, profileImg } = res;
        setUser({
          id,
          email,
          nickname,
          profileImg,
        });
      }
    }

    onClickCloseModalHandler();
  };

  const removeAvartarBtnHandler = () => {
    setPreviewImg('');
    setIsRemoveAvatar(true);
  };

  useEffect(() => {
    setIsDuplicate(true);
  }, [nickname]);

  useEffect(() => {
    if (preview && preview.length > 0) {
      const file = preview[0];
      setPreviewImg(URL.createObjectURL(file));
    } else if (user !== null && typeof user.profileImg === 'string') {
      setPreviewImg(user.profileImg);
    }
    return () => {
      setPreviewImg('');
      setIsDuplicate(true);
    };
  }, [preview]);

  return (
    <div className="absolute top-0 z-10 flex items-center justify-center w-screen h-screen bg-black/70">
      <form
        className="relative flex flex-col p-10 items-center justify-between align-middle bg-white h-[400px]"
        onSubmit={handleSubmit(onSubmitEditProfileBtn)}
      >
        <button
          className="w-6 h-6 absolute top-2 right-2"
          type="button"
          onClick={onClickCloseModalHandler}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 1L1 16"
              stroke="#606060"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 1L16 16"
              stroke="#606060"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <label htmlFor="avatar">
          <img
            src={previewImg !== '' ? previewImg : defaultImage}
            alt="프로필이미지"
            className="w-[85px] h-[85px] rounded-full ring ring-black object-cover cursor-pointer"
          />
        </label>
        <input
          id="avatar"
          type="file"
          {...register('avatar')}
          accept=".jpg, .jpeg, .png"
          className="border hidden"
        />
        <p className="text-center">
          프로필 사진은 이미지 파일 (jpg, jpeg, png)만 가능하며, <br />
          정사각형 비율로 된 사진을 업로드해 주세요. (100 X 100 픽셀 권장)
        </p>
        <div>
          <input
            type="text"
            {...register('nickname', { ...nicknameValidator, required: false })}
            className="border"
            placeholder={user?.nickname}
          />
          <button
            type="button"
            onClick={checkNicknameDuplication}
            className="border"
          >
            중복확인
          </button>
          {errors.nickname !== null && <p>{errors.nickname?.message}</p>}
        </div>
        <div>
          <button
            type="button"
            onClick={removeAvartarBtnHandler}
            className="bg-slate-400 mr-2"
          >
            사진 제거
          </button>
          <button
            disabled={blockSubmitBtn}
            type="submit"
            className="bg-slate-400"
          >
            프로필 변경 {isSubmitting && '제출중'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileModal;
