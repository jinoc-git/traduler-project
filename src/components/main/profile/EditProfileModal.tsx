import React, { useEffect, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { getPlanListAndMateList } from '@api/plans';
import { checkUserNickname, updateUserNickname } from '@api/supabaseAuth';
import IconClose from '@assets/icons/IconClose';
import IconName from '@assets/icons/IconName';
import IconProfileCamera from '@assets/icons/IconProfileCamera';
import { profileDefaultBlack, defaultImageGray } from '@assets/index';
import MapModalLayout from '@components/plan/common/ModalLayout';
import useFormValidator from '@hooks/useFormValidator';
import { userStore } from '@store/userStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeUserAvartar, updateUserAvatar } from '@utils/updateUserProfile';
import { disableScrollLock, enableScrollLock } from '@utils/withScrollLock';

interface EditProfileModalProps {
  onClickCloseModalHandler: () => void;
  animate: boolean;
}

interface EditProfileForm {
  avatar: FileList;
  nickname: string;
}

interface ShouldBlockSubmitBtn {
  isChanged: boolean;
  isDuplicate: boolean;
  isRemoveAvatar: boolean;
  result: boolean;
}

const EditProfileModal = ({
  onClickCloseModalHandler,
  animate,
}: EditProfileModalProps) => {
  const [previewImg, setPreviewImg] = useState<string>('');
  const [shouldBlockSubmitBtn, setShouldBlockSubmitBtn] =
    useState<ShouldBlockSubmitBtn>({
      isChanged: false,
      isDuplicate: true,
      isRemoveAvatar: false,
      result: true,
    });

  const user = userStore((state) => state.user);
  const setUser = userStore((state) => state.setUser);
  const queryClient = useQueryClient();

  const { nicknameValidator } = useFormValidator();

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
    if (res === true) {
      setShouldBlockSubmitBtn((prev) => ({
        ...prev,
        isDuplicate: false,
        result: false,
      }));
      toast.success('사용가능한 닉네임 입니다.');
    } else {
      setShouldBlockSubmitBtn((prev) => ({
        ...prev,
        isDuplicate: true,
        result: true,
      }));
      toast.error('닉네임 중복');
    }
  };

  const userMutation = useMutation(getPlanListAndMateList, {
    onSuccess: async () => {
      if (user !== null) {
        await queryClient.invalidateQueries(['plan_mates', user.id]);
      }
    },
  });

  const onSubmitEditProfileBtn: SubmitHandler<EditProfileForm> = async (
    data,
  ) => {
    if (user == null) return;

    const isNicknameChange = data.nickname !== '';
    if (isNicknameChange) {
      const res = await updateUserNickname(data.nickname, user.id);
      if (res != null) {
        const { id, email, nickname, profileImg } = res;
        setUser({
          id,
          email,
          nickname,
          profileImg,
        });
      }
    }

    const isAvaratChange = data.avatar !== undefined && preview.length !== 0;
    if (isAvaratChange) {
      const res = await updateUserAvatar(data.avatar[0], user.email, user.id);
      if (res != null) {
        const { id, email, nickname, profileImg } = res;
        setUser({
          id,
          email,
          nickname,
          profileImg,
        });
      }
    }

    if (shouldBlockSubmitBtn.isRemoveAvatar) {
      const res = await removeUserAvartar(user.id);
      if (res != null) {
        const { id, email, nickname, profileImg } = res;
        setUser({
          id,
          email,
          nickname,
          profileImg,
        });
      }
    }

    userMutation.mutate(user.id);
    onClickCloseModalHandler();
  };

  const removeAvatarBtnHandler = () => {
    setPreviewImg('');
    setShouldBlockSubmitBtn((prev) => {
      if (prev.isDuplicate && nickname !== '') {
        prev.result = true;
      } else {
        prev.isChanged = true;
        prev.result = false;
      }

      return { ...prev, isRemoveAvatar: true };
    });
    resetField('avatar');
  };

  useEffect(() => {
    setShouldBlockSubmitBtn((prev) => {
      if (nickname === '' && prev.isChanged) {
        prev.isDuplicate = false;
        prev.result = false;
      } else {
        prev.isDuplicate = true;
        prev.result = true;
      }

      return { ...prev };
    });
  }, [nickname]);

  useEffect(() => {
    if (preview != null && preview.length > 0) {
      const file = preview[0];
      setPreviewImg(URL.createObjectURL(file));
      setShouldBlockSubmitBtn((prev) => ({
        ...prev,
        isChanged: true,
        result: false,
      }));
    }
  }, [preview]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    enableScrollLock();
    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    if (user !== null && user.profileImg !== null) {
      setPreviewImg(user.profileImg);
    }

    return () => {
      document.body.style.overflow = 'auto';
      setPreviewImg('');
      disableScrollLock();
    };
  }, []);

  return (
    <MapModalLayout value={animate}>
      <form
        name="profile-edit-form"
        className="relative  flex flex-col  items-center  align-middle  rounded-xl
        md:h-[575px] md:w-[396px] md:justify-between md:gap-0
        sm:h-[404px] sm:w-[310px] sm:gap-[15px]
        "
        onSubmit={handleSubmit(onSubmitEditProfileBtn)}
      >
        <button
          name="profile-close-btn"
          className="absolute w-6 h-6 md:top-2 md:right-2 sm:top-0 sm:right-0"
          type="button"
          onClick={onClickCloseModalHandler}
        >
          <IconClose w="w-[17px]" h="h-[17px]" />
        </button>

        <div className="md:flex items-center gap-3 md:w-[408px] sm:w-[310px]">
          <img
            src={profileDefaultBlack}
            alt="프로필 아이콘"
            className="w-[30px] h-[30px] md:block sm:hidden"
          />
          <p className="font-semibold md:text-xlg sm:text-[18px]">
            프로필 편집
          </p>
          <p className="md:hidden text-[16px]">
            프로필 사진과 닉네임을 변경하세요{' '}
          </p>
        </div>

        <div className="relative hover:brightness-75">
          <label htmlFor="avatar">
            <img
              src={previewImg === '' ? defaultImageGray : previewImg}
              alt="프로필이미지"
              className="rounded-full border-[2.5px] border-gray object-cover cursor-pointer
              md:w-[200px] md:h-[200px]
              sm:w-[150px] sm:h-[150px]
              "
            />

            <div
              className="absolute flex items-center justify-center w-[42px] h-[42px] rounded-full bg-white border-[2px] border-gray cursor-pointer
              md:top-3/4 md:left-[140px]
              sm:top-3/4 sm:left-[110px]
              "
            >
              <IconProfileCamera w="w-[21px]" h="h-[16px]" fill="#6E6F76" />
            </div>
          </label>
        </div>

        <input
          id="avatar"
          type="file"
          {...register('avatar')}
          accept=".jpg, .jpeg, .png"
          className="hidden border"
        />

        <p className="text-center md:text-[16px] sm:text-[12px]">
          프로필 사진은 정사각형 비율로 된 사진을 업로드해 주세요. <br />
          (100 X 100픽셀 권장)
        </p>

        <div>
          <div className="flex justify-between md:w-[370px] sm:w-[310px]">
            <div className="relative">
              <label htmlFor="edit-nickname">
                <div className="absolute top-1/2 -translate-y-1/2 left-[10px] cursor-pointer">
                  <IconName w="w-[12px]" h="h-[12px]" fill="#000" />
                </div>
              </label>
              <input
                type="text"
                id="edit-nickname"
                {...register('nickname', {
                  ...nicknameValidator,
                  required: false,
                })}
                className="md:w-[275px] h-[40px] px-8 rounded-md border sm:w-[310px]"
                placeholder={user?.nickname}
              />
              <button
                name="profile-nickname-dup-btn"
                type="button"
                disabled={!isValid || nickname === ''}
                onClick={checkNicknameDuplication}
                className="md:hidden absolute top-[3px] right-[3px] w-[68px] h-[33px] rounded border text-sm text-[#6E6F76] bg-white  hover:font-semibold disabled:bg-gray_light_3 disabled:text-white"
              >
                중복확인
              </button>
            </div>
            <button
              name="profile-nickname-dup-btn"
              type="button"
              disabled={!isValid || nickname === ''}
              onClick={checkNicknameDuplication}
              className="md:block sm:hidden  w-[87px] h-[40px] rounded-md border text-[#6E6F76] bg-white  hover:font-semibold disabled:bg-gray_light_3 disabled:text-white"
            >
              중복확인
            </button>
          </div>
          {errors.nickname !== null && (
            <p className=" h-[18px] text-center text-red-400 md:text-[16px] md:mt-3 sm:text-[14px] sm:mt-2">
              {errors.nickname?.message}
            </p>
          )}
        </div>

        <div className="flex justify-between md:w-[408px] sm:w-[310px]">
          <button
            name="profile-remove-avatar-btn"
            type="button"
            onClick={removeAvatarBtnHandler}
            className="border border-navy rounded-lg text-navy hover:bg-navy_light_1  disabled:bg-gray_light_3 
              md:w-[200px] md:h-[45px]
              sm:w-[150px] sm:h-[41px]
              "
            disabled={previewImg === ''}
          >
            사진 제거
          </button>
          <button
            name="profile-change-profile-btn"
            disabled={shouldBlockSubmitBtn.result}
            type="submit"
            className="border rounded-lg bg-navy text-white hover:bg-navy_light_3 disabled:bg-gray_light_3
              md:w-[200px] md:h-[45px]
              sm:w-[150px] sm:h-[41px]
              "
          >
            프로필 변경 {isSubmitting && '제출중'}
          </button>
        </div>
      </form>
    </MapModalLayout>
  );
};

export default EditProfileModal;
