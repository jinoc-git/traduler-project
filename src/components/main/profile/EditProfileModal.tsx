/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { checkUserNickname, updateUserNickname } from '@api/supabaseAuth';
import { ic_name_1x } from '@assets/icons/1x';
import { ic_profile_3x } from '@assets/icons/3x';
import IconClose from '@assets/icons/IconClose';
import { defaultImageGray } from '@assets/index';
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

interface ShouldBlockSubmitBtn {
  isDuplicate: boolean;
  isRemoveAvatar: boolean;
  result: boolean;
}

const EditProfileModal = ({ handler }: EditProfileModalProps) => {
  const [previewImg, setPreviewImg] = useState<string>('');
  const [shouldBlockSubmitBtn, setShouldBlockSubmitBtn] =
    useState<ShouldBlockSubmitBtn>({
      isDuplicate: true,
      isRemoveAvatar: false,
      result: true,
    });

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
    resetField,
    formState: { errors, isSubmitting, isValid },
  } = useForm<EditProfileForm>({ mode: 'onChange' });

  const preview = watch('avatar');
  const nickname = watch('nickname');

  const checkNicknameDuplication = async () => {
    const res = await checkUserNickname(nickname);
    if (res) {
      setShouldBlockSubmitBtn((prev) => ({
        ...prev,
        isDuplicate: false,
        result: false,
      }));
    } else {
      console.log('닉네임 중복');
    }
  };

  const onSubmitEditProfileBtn: SubmitHandler<EditProfileForm> = async (
    data,
  ) => {
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
    if (data.avatar.length !== 0) {
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
    if (shouldBlockSubmitBtn.isRemoveAvatar) {
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
    setShouldBlockSubmitBtn((prev) => {
      if (prev.isDuplicate) {
        prev.result = true;
      } else {
        prev.result = false;
      }

      return { ...prev, isRemoveAvatar: true };
    });
    resetField('avatar');
  };

  useEffect(() => {
    setShouldBlockSubmitBtn((prev) => ({
      ...prev,
      isDuplicate: true,
      result: true,
    }));
  }, [nickname]);

  useEffect(() => {
    if (preview && preview.length > 0) {
      const file = preview[0];
      setPreviewImg(URL.createObjectURL(file));
      setShouldBlockSubmitBtn((prev) => ({ ...prev, result: false }));
    }
  }, [preview]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    if (user !== null && user.profileImg !== null) {
      setPreviewImg(user.profileImg);
    }

    return () => {
      document.body.style.overflow = 'auto';
      setPreviewImg('');
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 z-[40] flex-center w-screen h-screen bg-black/70">
      <form
        className="relative flex flex-col p-10 items-center justify-between align-middle bg-white h-[575px] rounded-xl"
        onSubmit={handleSubmit(onSubmitEditProfileBtn)}
      >
        <button
          className="absolute w-6 h-6 top-2 right-2"
          type="button"
          onClick={onClickCloseModalHandler}
        >
          <IconClose />
        </button>
        <div className="flex items-center gap-3 w-[408px]">
          <img
            src={ic_profile_3x}
            alt="프로필 아이콘"
            className="w-[30px] h-[30px]"
          />
          <p className="font-semibold text-xlg">프로필 편집</p>
        </div>
        <label htmlFor="avatar">
          <img
            src={previewImg === '' ? defaultImageGray : previewImg}
            alt="프로필이미지"
            className="w-[200px] h-[200px] rounded-full border-[2.5px] border-blue_light_1 object-cover cursor-pointer"
          />
        </label>
        <input
          id="avatar"
          type="file"
          {...register('avatar')}
          accept=".jpg, .jpeg, .png"
          className="hidden border"
        />
        <p className="text-center">
          프로필 사진은 이미지 파일 (jpg, jpeg, png)만 가능하며, <br />
          정사각형 비율로 된 사진을 업로드해 주세요. (100 X 100 픽셀 권장)
        </p>
        <div>
          <div className="flex justify-between w-[370px]">
            <div className="relative">
              <label htmlFor="edit-nickname">
                <img
                  src={ic_name_1x}
                  alt="이메일 아이콘"
                  className="absolute top-1/2 -translate-y-1/2 left-[10px] w-[12px] h-[12px] cursor-pointer"
                />
              </label>
              <input
                type="text"
                id="edit-nickname"
                {...register('nickname', {
                  ...nicknameValidator,
                  required: false,
                })}
                className=" w-[275px] h-[40px] px-8 rounded-md border"
                placeholder={user?.nickname}
              />
            </div>
            <button
              type="button"
              disabled={!isValid || nickname === ''}
              onClick={checkNicknameDuplication}
              className="w-[87px] h-[40px] rounded-md bg-blue border text-white  disabled:bg-gray_light_3"
            >
              중복확인
            </button>
          </div>
          {errors.nickname !== null && (
            <p className="mt-3 h-[18px] text-center">
              {errors.nickname?.message}
            </p>
          )}
        </div>
        <div className="flex justify-between w-[408px]">
          <button
            type="button"
            disabled={previewImg === ''}
            onClick={removeAvartarBtnHandler}
            className="w-[200px] h-[45px] border border-navy rounded-lg text-navy hover:bg-navy_light_1 disabled:bg-gray_light_3"
          >
            사진 제거
          </button>
          <button
            disabled={shouldBlockSubmitBtn.result}
            type="submit"
            className="w-[200px] h-[45px] border rounded-lg bg-navy text-white hover:bg-navy_light_3 disabled:bg-gray_light_3"
          >
            프로필 변경 {isSubmitting && '제출중'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileModal;
