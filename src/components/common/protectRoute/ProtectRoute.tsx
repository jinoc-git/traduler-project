import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

const ProtectRoute = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isLogin = localStorage.getItem('isLogin');

  useEffect(() => {
    if (isLogin === 'false') {
      if (
        pathname !== '/' &&
        pathname !== '/signin' &&
        pathname !== '/signup'
      ) {
        navigate('/signin');
      }
    } 
  }, [pathname, isLogin]);

  return null;
};

export default ProtectRoute;
