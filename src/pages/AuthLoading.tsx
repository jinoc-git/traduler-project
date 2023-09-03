import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { insertUser, supabase } from '@api/supabaseAuth';

const AuthLoading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data !== null) {
        if (data.session !== null) {
          const {
            id,
            email,
            user_metadata: { name: nickname },
          } = data.session.user;

          const { data: check } = await supabase
            .from('users')
            .select('id')
            .eq('id', id);
          if (check !== null && check.length === 0) {
            const user = {
              id,
              email: email as string,
              nickname,
            };
            await insertUser(user);
          }
        }
      }
      navigate('/main');
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    checkUser();
  }, []);
  return <div>AuthLoading</div>;
};

export default AuthLoading;
