import { type UserType } from 'types/supabase';
import { create } from 'zustand';

interface InviteUserStoreType {
  invitedUser: UserType[];
  inviteUser: (data: UserType) => void;
  resetInvitedUser: () => void;
  setUser: (data: UserType[]) => void;
}

export const inviteUserStore = create<InviteUserStoreType>((set) => ({
  invitedUser: [],
  inviteUser: (data: UserType) => {
    set((state) => ({
      invitedUser: [...state.invitedUser, data],
    }));
  },
  resetInvitedUser: () => {
    set(() => ({
      invitedUser: [],
    }));
  },
  setUser: (data: UserType[]) => {
    set(() => ({
      invitedUser: [...data],
    }));
  },
}));

export const sub = inviteUserStore.subscribe((state) => {
  return state.invitedUser;
});
