/* eslint-disable @typescript-eslint/no-floating-promises */
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

import { addComment, deleteComment, getComments } from '@api/commets';
import IconCommentory from '@assets/icons/IconComentory';
import { defaultImageGray } from '@assets/index';
import useConfirm from '@hooks/useConfirm';
import { inviteUserStore } from '@store/inviteUserStore';
import { userStore } from '@store/userStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { type CommentsType } from 'types/supabase';

interface InputType {
  comments: string;
}

const Comments = () => {
  const user = userStore((state) => state.user);
  const inviteduser = inviteUserStore((state) => state.invitedUser);
  const { id: planId } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({ mode: 'onChange' });
  const { data, isError } = useQuery({
    queryKey: ['comments', planId],
    queryFn: async () => {
      if (planId !== undefined) {
        const res = await getComments(planId);
        return res;
      } else return null;
    },
  });

  const onSubmit: SubmitHandler<InputType> = (data) => {
    const newComment: CommentsType = {
      content: data.comments,
      user_id: user?.id as string,
      plan_id: planId as string,
    };
    setValue('comments', '');
    addMutation.mutate(newComment);
  };

  const { confirm } = useConfirm();
  const handleDelete = (commentId: string) => {
    const deleteFunc = () => {
      deleteMutation.mutate(commentId);
    };
    const confTitle = '댓글 삭제 확인';
    const confDesc =
      '삭제한 댓글은 다시 복구할 수 없습니다. 정말로 삭제하시겠습니까?';
    confirm.delete(confTitle, confDesc, deleteFunc);
  };

  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', planId] });
    },
    onError: () => {
      toast.error('댓글 작성에 실패했습니다.');
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', planId] });
    },
    onError: () => {
      toast.error('댓글 삭제에 실패했습니다.');
    },
  });

  if (isError) {
    return <div>댓글 불러오기 오류 발생...</div>;
  }
  const navigate = useNavigate();

  return (
    <section
      className="items-center m-auto justify-center
    sm:w-[310px] sm:h-[320px]
    md:w-[720px]
    "
    >
      <div
        className="flex items-center 
      sm:w-[116px] sm:mb-[20px] mt-[30px]
      md:w-[116px] md:my-[30px]"
      >
        <IconCommentory
          w="sm:w-[18px] md:w-[25px]"
          h="sm:h-[18px] md:h-[25px]"
          fill="#4E4F54"
        />
        <div
          className="ml-[8px] font-bold text-gray_dark_1
        sm:w-[66px] sm:text-sm
        md:w-[84px] md:text-lg
        "
        >
          한줄 코멘트
        </div>
      </div>
      {data === null || data === undefined || data.length === 0 ? (
        <div
          className="my-[30px] ml-[20px] text-gray_dark_1 leading-6 tracking-tighter
        sm:text-sm
        md:text-normal
        "
        >
          첫 코멘트를 입력해보세요!
        </div>
      ) : (
        data.map((comment) => {
          const isUserImg = inviteduser.find(
            (user) => user.id === comment.user_id,
          )?.avatar_url;
          const userNickname = inviteduser.find(
            (user) => user.id === comment.user_id,
          )?.nickname;
          return (
            <div
              key={comment.id}
              className="flex items-center my-[10px] text-sm text-gray_dark_1 leading-6 tracking-tighter
              sm:gap-2
              md:gap-5"
            >
              <img
                src={isUserImg != null ? isUserImg : defaultImageGray}
                className="object-cover rounded-full
                sm:hidden
                md:w-6 md:h-6 md:block
                "
              />
              <p
                className="
                sm:text-[11px] w-[60px] sm:font-semibold
                md:text-sm md:font-semibold
              "
              >
                {userNickname}
              </p>
              <p className="w-[365px]">{comment.content}</p>
              {comment.user_id === user?.id && (
                <button
                  className="flex justify-center items-center border border-gray rounded-lg text-xs text-gray_dark_1 leading-6 tracking-tighter
                  sm:w-[50px] sm:h-[25px]
                  md:w-[45px] md:h-[30px]
                  "
                  onClick={() => {
                    handleDelete(comment.id);
                  }}
                >
                  삭제
                </button>
              )}
            </div>
          );
        })
      )}
      <div
        className="text-gray_dark_1 leading-6 tracking-tighter 
        sm:text-sm sm:font-semibold sm:ml-[0px]
        md:hidden"
      >
        소감 작성
      </div>
      <div
        className="flex items-center gap-5 
      sm:sm:w-[263px] sm:mt-[5px] 
      md:w-[720px] md:mt-[20px]"
      >
        <div
          className="ml-[45px] text-gray_dark_1 leading-6 tracking-tighter 
        sm:hidden 
        md:w-[60px] md:h-auto md:text-sm md:font-semibold md:block"
        >
          소 감
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            className="flex items-center 
          sm:w-[310px] sm:h-[28px] sm:gap-3
          md:w-[478px] md:h-[30px] md:gap-3
          "
          >
            <input
              id="comments"
              type="text"
              placeholder="한 줄 코멘트를 남겨보세요!"
              {...register('comments', {
                required: true,
              })}
              className="outline-none input-border 
              sm:w-[255px] sm:h-[28px] sm:ml-[0px]
              md:w-[360px] md:h-[30px] md:ml-[0px]"
            />
            <p className="h-[20px] pt-1.5 text-sm">
              {errors?.comments?.message}
            </p>
            <button
              className="flex justify-center items-center border border-gray rounded-lg text-gray_dark_1 leading-6 tracking-tighter
              sm:w-[32px] sm:h-[25px] sm:text-[11px]
              md:w-[45px] md:h-[30px] md:text-xs
              "
              type="submit"
              disabled={isSubmitting}
            >
              제출
            </button>
          </div>
        </form>
      </div>
      <div
        className="flex items-center justify-end gap-5 
       sm:my-[60px]
       md:my-[100px]
      "
      >
        <p
          className="
        sm:text-sm
        md:text-normal
        "
        >
          다른 여행 일정도 둘러보세요!
        </p>
        <button
          onClick={() => {
            navigate('/main');
          }}
          className="p-3 border rounded-lg font-bold border-blue text-blue hover:bg-blue_light_1 duration-200
          sm:w-[114px] sm:h-[41px] sm:text-sm
          md:w-[130px] md:h-[43px] md:text-normal
          "
        >
          목록으로
        </button>
      </div>
    </section>
  );
};

export default Comments;
