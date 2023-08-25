import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { type PinContentsType } from '@api/pins';
import { addPlan } from '@api/plans';
import PostPlan from '@components/plan/PostPlan';
import { datesStore } from '@store/datesStore';
import { userStore } from '@store/userStore';

import AddPlanContents from './AddPlanContents';

interface InputType {
  title?: string;
}

const AddPlan = () => {
  const user = userStore((state) => state.user);
  const userId = user?.id;
  const { dates, resetDates } = datesStore();
  const [pins, setPins] = useState<PinContentsType[][]>([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InputType>();

  const submitPlan = async () => {
    if (userId !== null) {
      await addPlan(userId as string, watch('title') as string, 0, pins, dates);
      navigate('/');
      resetDates();
    }
  };

  const [currentPage, setCurrentPage] = useState(0);
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <input
        id="title"
        type="text"
        placeholder="제목을 입력하세요"
        {...register('title', {
          required: '제목은 필수입니다.',
          minLength: {
            value: 2,
            message: '제목은 2글자 이상이어야 합니다.',
          },
        })}
      />
      <p>{errors?.title?.message}</p>
      <p>링크 공유하기</p>
      <p>친구 초대하기</p>
      <PostPlan />
      <div className="flex justify-center gap-5 mb-10 text-2xl font-bold">
        {dates.length !== 0 ? (
          <>
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
              className="cursor-pointer disabled:text-transparent disabled:cursor-none"
            >
              ⬅️
            </button>
            <h1>{dates[currentPage]}</h1>
            <button
              onClick={handleNextPage}
              disabled={currentPage === dates.length - 1}
              className="cursor-pointer disabled:text-transparent disabled:cursor-none"
            >
              ➡️
            </button>
          </>
        ) : (
          <div>날짜를 선택하세요</div>
        )}
      </div>
      <AddPlanContents
        currentPage={currentPage}
        pins={pins}
        setPins={setPins}
        setCurrentPage={setCurrentPage}
      />
      <form onSubmit={handleSubmit(submitPlan)}>
        <button
          type="submit"
          disabled={isSubmitting}
          className="p-5 mt-10 bg-slate-500"
        >
          저장하기
        </button>
      </form>
    </>
  );
};

export default AddPlan;
