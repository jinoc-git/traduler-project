import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { userStore } from '@store/userStore';

const ProtectRoute = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = userStore((state) => state.user);
  console.log(user);

  useEffect(() => {
    if (user === null) {
      if (
        pathname !== '/' &&
        pathname !== '/signin' &&
        pathname !== '/signup'
      ) {
        navigate('/signin');
      }
    }
  }, [pathname]);

  return null;
};

export default ProtectRoute;
