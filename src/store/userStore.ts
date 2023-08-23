import { supabase } from '@api/supabaseAuth';
import { create } from 'zustand';

interface UserInfo {
  id: string;
  email: string;
  nickname: string;
  profileImg: string | null;
}

interface UserStore {
  user: UserInfo | null;
  // isLogin: boolean;
  authObserver: () => void;
  resetUser: () => void;
}

export const userStore = create<UserStore>((set, get) => {
  const authObserver = () => {
    supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = get().user;
      if (session !== null && currentUser === null) {
        const {
          id,
          email,
          user_metadata: { nickname },
        } = session.user;

        const user: UserInfo = {
          id,
          email: email as string,
          nickname,
          profileImg: null,
        };

        set({ user });
      }
    });
  };

  const resetUser = () => {
    set({ user: null });
  };

  return {
    user: null,
    // isLogin: false,
    authObserver,
    resetUser,
  };
});
