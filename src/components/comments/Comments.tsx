/* eslint-disable @typescript-eslint/no-floating-promises */
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

import { addComment, deleteComment, getComments } from '@api/commets';
import IconCommentory from '@assets/icons/IconComentory';
import { defaultImageGray } from '@assets/index';
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const handleDelete = (commentId: string) => {
    const conf = window.confirm('정말 삭제하시겠습니까?');
    if (conf) {
      deleteMutation.mutate(commentId);
    }
  };

  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', planId] });
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', planId] });
    },
  });

  if (isError) {
    return <div>댓글 불러오기 오류 발생...</div>;
  }
  const navigate = useNavigate();
  const handleChangePlanState = () => {
    navigate(`/main`);
  };

  return (
    <section className="w-[720px]">
      <div className="flex items-center my-[30px]">
        <IconCommentory w="20" h="25" fill="#4E4F54" />
        <div className="ml-[8px] text-lg font-bold text-gray_dark_1">
          한줄 코멘트
        </div>
      </div>
      {data === null || data === undefined || data.length === 0 ? (
        <div className="my-[30px] ml-[20px] text-normal text-gray_dark_1 leading-6 tracking-tighter">
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
              className="flex gap-5 my-[10px] ml-[20px] text-sm text-gray_dark_1 leading-6 tracking-tighter"
            >
              <img
                src={isUserImg != null ? isUserImg : defaultImageGray}
                className="object-cover w-6 h-6 rounded-full"
              />
              <p>{userNickname}</p>
              <p className="w-[365px]">{comment.content}</p>
              {comment.user_id === user?.id && (
                <button
                  className="flex justify-center items-center w-[45px] h-[30px] border border-gray rounded-lg text-xs text-gray_dark_1 leading-6 tracking-tighter"
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
      <div className="flex items-center gap-5 mt-[20px] ">
        <div className="ml-[20px] text-sm text-gray_dark_1 leading-6 tracking-tighter">
          소감
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-3">
            <input
              id="comments"
              type="text"
              placeholder="한 줄 코멘트를 남겨보세요!"
              {...register('comments', {
                required: true,
              })}
              className="outline-none input-border w-[410px] h-[30px]"
            />
            <p className="h-[20px] pt-1.5 text-sm">
              {errors?.comments?.message}
            </p>
            <button
              className="flex justify-center items-center w-[45px] h-[30px] border border-gray rounded-lg text-xs text-gray_dark_1 leading-6 tracking-tighter"
              type="submit"
              disabled={isSubmitting}
            >
              제출
            </button>
          </div>
        </form>
      </div>
      <div className="flex my-[100px] items-center justify-end gap-5">
        <p>다른 여행 일정도 둘러보세요!</p>
        <button
          onClick={handleChangePlanState}
          className="p-3 border rounded-lg font-bold border-blue w-[130px] text-blue hover:bg-blue_light_1 duration-200"
        >
          목록으로
        </button>
      </div>
    </section>
  );
};

export default Comments;
