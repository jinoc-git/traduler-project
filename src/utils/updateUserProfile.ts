import {
  deleteUserProfileImage,
  updateUserProfileImage,
  uploadProfileImg,
} from '@api/supabaseAuth';

export const updateUserAvatar = async (
  file: File,
  email: string,
  userId: string,
) => {
  const filePath = await uploadProfileImg(file, email);

  if (typeof filePath !== 'string') {
    console.log('업로드 에러');
    return;
  }

  const res = await updateUserProfileImage(filePath, userId);
  if (res !== null && res !== undefined) {
    const {
      id,
      email,
      user_metadata: { nickname, profileImg },
    } = res;

    return {
      id,
      email: email as string,
      nickname,
      profileImg,
    };
  }
};

export const removeUserAvartar = async (userId: string) => {
  const res = await deleteUserProfileImage(userId);
  if (res !== null && res !== undefined) {
    const {
      id,
      email,
      user_metadata: { nickname },
    } = res;

    return {
      id,
      email: email as string,
      nickname,
      profileImg: null,
    };
  }
};
