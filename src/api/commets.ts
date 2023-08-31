import { type CommentsType } from 'types/supabase';

import { supabase } from './supabaseAuth';

export const addComment = async (newComment: CommentsType) => {
  const { error } = await supabase.from('comments').insert(newComment);
  if (error !== null) {
    console.log(error);
    throw new Error('댓글 작성 오류 발생');
  }
};

export const getComments = async (planId: string) => {
  const { data, error } = await supabase
    .from('comments')
    .select()
    .eq('plan_id', planId)
    .order('created_at');
  if (error !== null) {
    console.log(error);
    throw new Error('댓글 가져오기 오류 발생');
  }
  if (data !== null) {
    return data;
  }
};

export const deleteComment = async (commentId: string) => {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId);
  if (error !== null) {
    console.log(error);
    throw new Error('댓글 가져오기 오류 발생');
  }
};
