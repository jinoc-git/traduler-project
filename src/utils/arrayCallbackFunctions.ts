/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type UsersDataList } from 'types/aboutPlan';
import {
  type UserType,
  type BookMarkType,
  type PlanType,
} from 'types/supabase';

export const withPlanId = {
  user: (planId: string) => (item: UsersDataList) => {
    return !Object.keys(item).includes(planId);
  },
  plan: (planId: string) => (plan: PlanType) => plan.id !== planId,
};

export const tabMenu = {
  filtering:
    (selectedPlan: string, bookMarkPlanIdList: string[]) =>
    (plan: PlanType) => {
      if (selectedPlan === 'bookMark') {
        return bookMarkPlanIdList.find((id) => id === plan.id);
      }
      if (selectedPlan === 'end') {
        return (
          (plan.plan_state === selectedPlan && !plan.isDeleted) ||
          (plan.plan_state === 'recording' && !plan.isDeleted)
        );
      }
      return plan.plan_state === selectedPlan && !plan.isDeleted;
    },
  sorting:
    (selectedPlan: string, bookMarkData: BookMarkType[]) =>
    (a: PlanType, b: PlanType) => {
      if (selectedPlan === 'bookMark') {
        const bookMarkA = bookMarkData.find(
          (bookMark) => bookMark.plan_id === a.id,
        )!;
        const bookMarkB = bookMarkData.find(
          (bookMark) => bookMark.plan_id === b.id,
        )!;
        return (
          new Date(bookMarkA.created_at).getTime() -
          new Date(bookMarkB.created_at).getTime()
        );
      }
      return new Date(a.dates[0]).getTime() - new Date(b.dates[0]).getTime();
    },
  counting: (menu: string) => (plan: PlanType) => {
    if (menu === 'end') {
      return plan.plan_state === menu || plan.plan_state === 'recording';
    }

    return plan.plan_state === menu;
  },
};

export const cardListing = {
  withPlanId: (planId: string) => (users: UsersDataList) => users[planId],
  isBookMark: (planId: string) => (bookMark: BookMarkType) =>
    bookMark.plan_id === planId,
  avatar: (user: UserType) => user.avatar_url,
  nickname: (user: UserType) => user.nickname,
};

export const sideBar = {
  sorting: (a: PlanType, b: PlanType) =>
    new Date(a.dates[0]).getTime() - new Date(b.dates[0]).getTime(),
  filtering: (status: string) => (plan: PlanType) => {
    if (status === 'planning') {
      return plan.plan_state === status;
    }
    if (status === 'traveling') {
      return plan.plan_state === status;
    }
    if (status === 'end') {
      return plan.plan_state === status || plan.plan_state === 'recording';
    }
  },
};

export const search = {
  notInvite: (searchedPeople: UserType[]) => (user: UserType, idx: number) => {
    return searchedPeople[idx]?.id !== user?.id;
  },
  noInvite: (idx: number) => (_: UserType, index: number) => index !== idx,
  removeExist: (invitedUser: UserType[]) => (person: UserType) => {
    return invitedUser.filter((user) => user.id === person.id).length === 0;
  },
};
