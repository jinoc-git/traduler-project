const useSignUpFormValidator = () => {
  const nicknameValidator = {
    required: true,
    pattern: {
      value: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,10}$/,
      message: '닉네임은 2~10자. 특문 제외',
    },
  };

  const emailValidator = {
    required: true,
    pattern: {
      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
      message: '이메일 형식에 맞지 않습니다.',
    },
  };

  const passwordValidator = {
    required: true,
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/,
      message: '비밀번호는 6~12자 숫자, 영문 조합',
    },
  };

  return { nicknameValidator, emailValidator, passwordValidator };
};

export default useSignUpFormValidator;
