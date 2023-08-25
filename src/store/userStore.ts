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
  setUser: (user: UserInfo) => void;
  resetUser: () => void;
}

export const userStore = create<UserStore>((set, get) => {
  const authObserver = () => {
    supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = get().user;
      console.log(session)
      if (session !== null && currentUser === null) {
        const {
          id,
          email,
          user_metadata: { nickname, profileImg },
        } = session.user;

        const user: UserInfo = {
          id,
          email: email as string,
          nickname,
          profileImg: profileImg ?? null,
        };

        set({ user });
      }
    });
  };

  const setUser = (user: UserInfo) => {
    set({ user });
  };

  const resetUser = () => {
    set({ user: null });
  };

  return {
    user: null,
    // isLogin: false,
    authObserver,
    setUser,
    resetUser,
  };
});
