import React, { useEffect, useState } from 'react';

import { updateUserProfileImage, uploadProfileImg } from '@api/supabaseAuth';
import { defaultImage } from '@assets/index';
import { userStore } from '@store/userStore';
import fileValidator from '@utils/fileValidator';

interface EditProfileModalProps {
  handler: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProfileModal = ({ handler }: EditProfileModalProps) => {
  const [profileImg, setProfileImg] = useState<File | null>();
  const [previewImg, setPreviewImg] = useState<string>('');
  const user = userStore((state) => state.user);
  const setUser = userStore((state) => state.setUser);

  const onClickCloseModalHandler = () => {
    handler(false);
  };

  const onChangeImgFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;
    if (files === null) return;

    const isValid = fileValidator(files[0]);
    if (!isValid) {
      alert('잘못된 형식입니다');
      return;
    }

    const previewUrl = URL.createObjectURL(files[0]);
    setPreviewImg(previewUrl);
    setProfileImg(files[0]);
  };

  const onClickEditProfileBtn = async () => {
    if (profileImg !== null && profileImg !== undefined && user !== null) {
      const filePath = await uploadProfileImg(profileImg, user.email);

      if (typeof filePath !== 'string') {
        console.log('업로드 에러');
        return false;
      }

      const res = await updateUserProfileImage(filePath, user.id);

      if (res !== null && res !== undefined) {
        const {
          id,
          email,
          user_metadata: { nickname, profileImg },
        } = res;

        setUser({
          id,
          email: email as string,
          nickname,
          profileImg,
        });
      }
    }
  };

  useEffect(() => {
    if (user !== null && typeof user.profileImg === 'string') {
      setPreviewImg(user.profileImg);
    }
  }, []);

  return (
    <div className="absolute top-0 z-10 flex items-center justify-center w-screen h-screen bg-black/70">
      <div className="flex flex-col p-10 items-center justify-between align-middle bg-white h-[400px]">
        <img
          src={previewImg !== '' ? previewImg : defaultImage}
          alt="프로필이미지"
          className="w-[85px] h-[85px] rounded-full ring ring-white object-cover"
        />
        <input type="file" onChange={onChangeImgFileHandler} />
        <div>
          <button className="bg-slate-400 mr-2" onClick={onClickEditProfileBtn}>
            수정
          </button>
          <button className="bg-slate-400" onClick={onClickCloseModalHandler}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
