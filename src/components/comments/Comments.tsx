/* eslint-disable @typescript-eslint/no-floating-promises */
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router';

import { addComment, deleteComment, getComments } from '@api/commets';
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

  return (
    <div>
      <label>한 줄 코멘트</label>
      {data === null || data === undefined ? (
        <div>첫 코멘트를 입력해보세요!</div>
      ) : (
        data.map((comment) => {
          const isUserImg = inviteduser.find(
            (user) => user.id === comment.user_id,
          )?.avatar_url;
          return (
            <div key={comment.id} className="flex gap-5">
              <img
                src={isUserImg != null ? isUserImg : defaultImageGray}
                className="object-cover w-6 h-6 rounded-full"
              />
              <p>{comment.content}</p>
              {comment.user_id === user?.id && (
                <button
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
      <div className="flex items-center gap-5">
        <label>소감</label>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-5">
            <input
              id="comments"
              type="text"
              placeholder="한 줄 코멘트를 남겨보세요!"
              {...register('comments', {
                required: true,
              })}
              className="outline-none input-border"
            />
            <p className="h-[20px] pt-1.5 text-sm">
              {errors?.comments?.message}
            </p>
            <button type="submit" disabled={isSubmitting}>
              제출
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Comments;
