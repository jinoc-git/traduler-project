import { type PinContentsType } from '@api/pins';

import { type PlanType, type UserType } from './supabase';

export type UsersDataList = Record<string, UserType[]>;

export interface AddPlanObj {
  newPlan: PlanType;
  pins: PinContentsType[][];
  invitedUser: UserType[];
}

export interface QuitPlanParam {
  userId: string;
  planId: string;
}

export interface PlanCountList {
  bookMark: number;
  planning: number;
  traveling: number;
  end: number;
}

export interface UserAndPlanList {
  planDataList: PlanType[];
  usersDataList: UsersDataList[];
}
